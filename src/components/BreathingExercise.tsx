import { useState, useEffect, useCallback, useRef } from "react";
import { X, Play, Pause, RotateCcw, Wind, Sparkles, Heart, Zap } from "lucide-react";

type BreathPhase = "inhale" | "hold" | "exhale" | "holdOut" | "idle";

interface Technique {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  phases: { phase: BreathPhase; duration: number; label: string }[];
  cycles: number;
  benefits: string[];
  reference: string;
}

const techniques: Technique[] = [
  {
    id: "box",
    name: "Box Breathing",
    description: "Used by Navy SEALs to stay calm under pressure",
    icon: <Zap className="w-5 h-5" />,
    color: "from-primary to-accent",
    phases: [
      { phase: "inhale", duration: 4, label: "Breathe In" },
      { phase: "hold", duration: 4, label: "Hold" },
      { phase: "exhale", duration: 4, label: "Breathe Out" },
      { phase: "holdOut", duration: 4, label: "Hold" },
    ],
    cycles: 4,
    benefits: ["Reduces stress", "Improves focus", "Lowers blood pressure"],
    reference: "Ma, X. et al. (2017). Frontiers in Psychology, 8, 874.",
  },
  {
    id: "478",
    name: "4-7-8 Relaxing Breath",
    description: "Dr. Andrew Weil's natural tranquilizer for the nervous system",
    icon: <Wind className="w-5 h-5" />,
    color: "from-mood-sad to-primary",
    phases: [
      { phase: "inhale", duration: 4, label: "Breathe In" },
      { phase: "hold", duration: 7, label: "Hold" },
      { phase: "exhale", duration: 8, label: "Breathe Out" },
    ],
    cycles: 4,
    benefits: ["Helps with sleep", "Reduces anxiety", "Calms the mind"],
    reference: "Weil, A. (2015). DrWeil.com — 4-7-8 Breathing Technique.",
  },
  {
    id: "energize",
    name: "Energizing Breath",
    description: "Quick pick-me-up when you feel low energy",
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-mood-happy to-mood-anxious",
    phases: [
      { phase: "inhale", duration: 2, label: "Quick In" },
      { phase: "exhale", duration: 2, label: "Quick Out" },
    ],
    cycles: 8,
    benefits: ["Boosts energy", "Increases alertness", "Uplifts mood"],
    reference: "Brown, R. P. & Gerbarg, P. L. (2005). J Altern Complement Med, 11(4), 711-717.",
  },
  {
    id: "calm",
    name: "Calming Wave",
    description: "Extended exhale to activate your parasympathetic system",
    icon: <Heart className="w-5 h-5" />,
    color: "from-mood-stressed to-primary",
    phases: [
      { phase: "inhale", duration: 4, label: "Breathe In" },
      { phase: "exhale", duration: 8, label: "Slow Out" },
    ],
    cycles: 5,
    benefits: ["Deep relaxation", "Slows heart rate", "Eases tension"],
    reference: "Jerath, R. et al. (2006). Medical Hypotheses, 67(3), 566-571.",
  },
];

const phaseColors: Record<BreathPhase, string> = {
  inhale: "text-primary",
  hold: "text-accent",
  exhale: "text-mood-sad",
  holdOut: "text-mood-neutral",
  idle: "text-muted-foreground",
};

interface BreathingExerciseProps {
  onClose: () => void;
}

const BreathingExercise = ({ onClose }: BreathingExerciseProps) => {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [scale, setScale] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPhase = selectedTechnique?.phases[currentPhaseIndex];

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    stop();
    setCurrentPhaseIndex(0);
    setCurrentCycle(1);
    setCountdown(0);
    setCompleted(false);
    setScale(1);
  }, [stop]);

  useEffect(() => {
    if (!isRunning || !selectedTechnique) return;

    const phase = selectedTechnique.phases[currentPhaseIndex];
    setCountdown(phase.duration);

    if (phase.phase === "inhale") setScale(1.6);
    else if (phase.phase === "exhale") setScale(1);

    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          const nextPhaseIdx = currentPhaseIndex + 1;
          if (nextPhaseIdx >= selectedTechnique.phases.length) {
            if (currentCycle >= selectedTechnique.cycles) {
              stop();
              setCompleted(true);
              return 0;
            }
            setCurrentCycle(c => c + 1);
            setCurrentPhaseIndex(0);
          } else {
            setCurrentPhaseIndex(nextPhaseIdx);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, currentPhaseIndex, currentCycle, selectedTechnique, stop]);

  const start = () => {
    if (!selectedTechnique) return;
    reset();
    setIsRunning(true);
  };

  if (!selectedTechnique) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <h2 className="text-lg font-display font-bold text-foreground">🫁 Breathing Exercises</h2>
              <p className="text-xs text-muted-foreground mt-1">Pick a technique that suits your mood</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {techniques.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTechnique(t)}
                className="w-full text-left p-4 rounded-2xl border border-border bg-background hover:bg-secondary/50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-primary-foreground flex-shrink-0`}>
                    {t.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground text-sm">{t.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {t.benefits.map(b => (
                        <span key={b} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {b}
                        </span>
                      ))}
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-2 italic">📖 {t.reference}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="flex flex-col items-center max-w-sm w-full">
        <div className="flex items-center justify-between w-full mb-8">
          <button
            onClick={() => { reset(); setSelectedTechnique(null); }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <h2 className="text-lg font-display font-bold text-foreground mb-1">{selectedTechnique.name}</h2>
        <p className="text-xs text-muted-foreground mb-8">
          Cycle {currentCycle} of {selectedTechnique.cycles}
        </p>

        <div className="relative flex items-center justify-center w-64 h-64 mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-border opacity-30" />
          <div
            className={`rounded-full bg-gradient-to-br ${selectedTechnique.color} opacity-20 transition-transform`}
            style={{
              width: "160px",
              height: "160px",
              transform: `scale(${scale})`,
              transitionDuration: currentPhase ? `${currentPhase.duration}s` : "0.5s",
              transitionTimingFunction: "ease-in-out",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {completed ? (
              <div className="text-center animate-fade-in">
                <span className="text-3xl">✨</span>
                <p className="text-sm font-display font-semibold text-foreground mt-2">Great job!</p>
                <p className="text-xs text-muted-foreground mt-1">You completed the exercise</p>
              </div>
            ) : isRunning && currentPhase ? (
              <>
                <p className={`text-4xl font-display font-bold ${phaseColors[currentPhase.phase]}`}>
                  {countdown}
                </p>
                <p className={`text-sm font-medium mt-2 ${phaseColors[currentPhase.phase]}`}>
                  {currentPhase.label}
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedTechnique.color} flex items-center justify-center text-primary-foreground mx-auto mb-2`}>
                  {selectedTechnique.icon}
                </div>
                <p className="text-xs text-muted-foreground">Ready when you are</p>
              </div>
            )}
          </div>
        </div>

        {isRunning && !completed && (
          <div className="flex gap-2 mb-6">
            {selectedTechnique.phases.map((p, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentPhaseIndex ? "bg-primary scale-125" : "bg-border"
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {completed ? (
            <>
              <button
                onClick={start}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Again
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors"
              >
                Done
              </button>
            </>
          ) : isRunning ? (
            <button
              onClick={stop}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors"
            >
              <Pause className="w-4 h-4" />
              Pause
            </button>
          ) : (
            <button
              onClick={start}
              className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-lg"
            >
              <Play className="w-4 h-4" />
              Start
            </button>
          )}
        </div>

        <p className="text-[10px] text-muted-foreground mt-6 text-center max-w-xs">
          💡 Find a comfortable position. Breathe through your nose if you can. It's okay to adjust the rhythm to what feels right.
        </p>

        <p className="text-[9px] text-muted-foreground mt-3 text-center italic max-w-xs">
          📖 {selectedTechnique.reference}
        </p>
      </div>
    </div>
  );
};

export default BreathingExercise;
