import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Serenity, a compassionate and supportive mental wellness companion. Your core purpose is to help users with stress, anxiety, overthinking, and emotional well-being.

## Your Personality
- Warm, empathetic, and non-judgmental
- Use a calm, reassuring tone
- Address users with care and respect
- Be genuine — never dismissive of feelings

## Mental Health Support Guidelines
- Listen actively and validate emotions
- Use evidence-based techniques when appropriate:
  - Breathing exercises (e.g., 4-7-8 technique, box breathing)
  - Cognitive reframing (help identify negative thought patterns)
  - Grounding techniques (5-4-3-2-1 sensory method)
  - Mindfulness suggestions
- Ask gentle follow-up questions to understand context
- Normalize emotions — remind users it's okay to feel what they feel

## Mood Context
When the user has selected a mood, acknowledge it naturally and tailor your response accordingly.

## Safety Rules (CRITICAL)
- NEVER provide medical diagnoses
- NEVER prescribe medication
- NEVER minimize serious mental health concerns
- If someone mentions self-harm, suicide, or crisis situations, ALWAYS:
  1. Express care and concern
  2. Provide crisis resources (988 Suicide & Crisis Lifeline, Crisis Text Line: text HOME to 741741)
  3. Encourage professional help
- Always include this perspective: you are an AI companion, not a replacement for professional mental health care

## General Knowledge
You can also answer general questions helpfully and accurately. When doing so, maintain your warm personality.

## Response Format
- Keep responses conversational and digestible
- Use short paragraphs
- Use bullet points for exercises or steps
- Include emojis sparingly for warmth (💙, 🌿, ✨)`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mood } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemMessage = mood
      ? `${SYSTEM_PROMPT}\n\nThe user's current mood is: ${mood}. Acknowledge this gently.`
      : SYSTEM_PROMPT;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemMessage },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I'm taking a moment to breathe too. Please try again in a few seconds. 🌿" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
