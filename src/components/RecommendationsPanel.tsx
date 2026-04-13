import { X, BookOpen, ExternalLink, Brain, Heart, Moon, Dumbbell, Users } from "lucide-react";

interface Recommendation {
  title: string;
  description: string;
  icon: React.ReactNode;
  tips: string[];
  resources: { name: string; url: string }[];
  reference: string;
}

const recommendations: Recommendation[] = [
  {
    title: "Cognitive Reframing",
    description: "Challenge negative thoughts by examining evidence and finding balanced perspectives.",
    icon: <Brain className="w-5 h-5" />,
    tips: [
      "Write down the negative thought",
      "Ask: 'Is this thought based on facts or feelings?'",
      "Consider what you'd tell a friend in this situation",
      "Rewrite the thought in a more balanced way",
    ],
    resources: [
      { name: "Beck Institute — CBT Basics", url: "https://beckinstitute.org/about/understanding-cbt/" },
      { name: "NIMH — Psychotherapies", url: "https://www.nimh.nih.gov/health/topics/psychotherapies" },
    ],
    reference: "Beck, J. S. (2011). Cognitive Behavior Therapy: Basics and Beyond. Guilford Press.",
  },
  {
    title: "Mindfulness & Grounding",
    description: "Stay present using the 5-4-3-2-1 technique to calm your senses.",
    icon: <Heart className="w-5 h-5" />,
    tips: [
      "Name 5 things you can see",
      "Name 4 things you can touch",
      "Name 3 things you can hear",
      "Name 2 things you can smell, 1 you can taste",
    ],
    resources: [
      { name: "Headspace — Free Basics", url: "https://www.headspace.com" },
      { name: "Insight Timer — Free Meditations", url: "https://insighttimer.com" },
    ],
    reference: "Kabat-Zinn, J. (2003). Mindfulness-Based Interventions in Context. Clinical Psychology, 10(2).",
  },
  {
    title: "Sleep Hygiene",
    description: "Better sleep improves mood, focus, and emotional resilience.",
    icon: <Moon className="w-5 h-5" />,
    tips: [
      "Keep a consistent sleep schedule",
      "Avoid screens 30 min before bed",
      "Keep your room cool and dark",
      "Try a body scan meditation before sleep",
    ],
    resources: [
      { name: "Sleep Foundation", url: "https://www.sleepfoundation.org" },
      { name: "CDC — Sleep Hygiene Tips", url: "https://www.cdc.gov/sleep/about_sleep/sleep_hygiene.html" },
    ],
    reference: "Walker, M. (2017). Why We Sleep. Scribner.",
  },
  {
    title: "Movement & Exercise",
    description: "Even a 10-minute walk can significantly boost your mood.",
    icon: <Dumbbell className="w-5 h-5" />,
    tips: [
      "Start with just 10 minutes of walking",
      "Try gentle yoga or stretching",
      "Dance to your favorite song",
      "Exercise outdoors when possible",
    ],
    resources: [
      { name: "NHS — Exercise for Depression", url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/exercise-for-depression/" },
      { name: "Yoga with Adriene (YouTube)", url: "https://www.youtube.com/c/yogawithadriene" },
    ],
    reference: "Schuch, F. B. et al. (2018). J Psychiatric Research, 98, 141-152.",
  },
  {
    title: "Social Connection",
    description: "Reaching out — even briefly — can reduce feelings of isolation.",
    icon: <Users className="w-5 h-5" />,
    tips: [
      "Text or call one person today",
      "Join an online community around a hobby",
      "Volunteer or help someone",
      "It's okay to say 'I'm struggling'",
    ],
    resources: [
      { name: "7 Cups — Free Emotional Support", url: "https://www.7cups.com" },
      { name: "NAMI — Find Support", url: "https://www.nami.org/Support-Education" },
    ],
    reference: "Holt-Lunstad, J. (2010). PLoS Medicine, 7(7), e1000316.",
  },
];

interface RecommendationsPanelProps {
  onClose: () => void;
}

const RecommendationsPanel = ({ onClose }: RecommendationsPanelProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card rounded-t-3xl z-10">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-lg font-display font-bold text-foreground">Wellness Toolkit</h2>
              <p className="text-xs text-muted-foreground">Evidence-based techniques & resources</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="p-4 rounded-2xl border border-border bg-background">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  {rec.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-foreground">{rec.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
                </div>
              </div>

              <div className="ml-12 space-y-3">
                {/* Tips */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Try This</p>
                  <ul className="space-y-1">
                    {rec.tips.map((tip, j) => (
                      <li key={j} className="text-xs text-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Resources</p>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.resources.map((r, j) => (
                      <a
                        key={j}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        {r.name}
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Reference */}
                <p className="text-[9px] text-muted-foreground italic">📖 {rec.reference}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <p className="text-[10px] text-muted-foreground text-center">
            ⚕️ These are educational resources, not medical advice. Always consult a professional for clinical concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPanel;
