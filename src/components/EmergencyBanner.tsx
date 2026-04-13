import { Phone, Heart } from "lucide-react";

const CRISIS_KEYWORDS = [
  "suicide", "kill myself", "end my life", "want to die", "self-harm",
  "hurt myself", "cut myself", "don't want to live", "no reason to live",
  "better off dead", "ending it all", "take my life",
];

export function detectCrisis(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some(kw => lower.includes(kw));
}

const EmergencyBanner = () => {
  return (
    <div className="mx-4 mb-3 p-4 rounded-xl bg-emergency/10 border border-emergency/30 animate-fade-in">
      <div className="flex items-start gap-3">
        <Heart className="w-5 h-5 text-emergency mt-0.5 flex-shrink-0" />
        <div className="space-y-2">
          <p className="text-sm font-semibold text-emergency">
            You matter. Help is available right now.
          </p>
          <div className="space-y-1.5">
            <a
              href="tel:988"
              className="flex items-center gap-2 text-sm text-emergency hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span><strong>988 Suicide & Crisis Lifeline</strong> — Call or text 988</span>
            </a>
            <p className="text-xs text-emergency/80">
              <strong>Crisis Text Line</strong> — Text HOME to 741741
            </p>
            <p className="text-xs text-emergency/80">
              <strong>International:</strong> findahelpline.com
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            If you are in immediate danger, please call emergency services (911).
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;
