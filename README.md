# Serene AI Companion

An AI-powered companion for mental health and wellness support. This application provides users with personalized recommendations, breathing exercises, and 24/7 access to mental health guidance.

## Features

- 🤖 **AI-Powered Chat** - Intelligent conversations tailored to your wellness needs
- 🧘 **Breathing Exercises** - Guided exercises for stress relief and mindfulness
- 😊 **Mood Tracking** - Monitor and understand your emotional patterns
- 📊 **Personalized Recommendations** - Get suggestions based on your mood and history
- 🆘 **Emergency Support** - Quick access to crisis resources when needed
- 🔐 **Secure & Private** - Built with privacy in mind using Supabase

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **AI**: OpenAI API (via Supabase Edge Functions)
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project
- An OpenAI API key

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

In your Supabase project, set the Edge Function secret:

```
OPENAI_API_KEY=your_openai_api_key
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## License

MIT
