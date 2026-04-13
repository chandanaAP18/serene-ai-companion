import { Smile, Frown, AlertTriangle, Flame, Minus } from "lucide-react";
import type { Mood } from "@/hooks/useChat";

const moods: { value: Mood; label: string; icon: React.ReactNode }[] = [
  { value: "happy", label: "Happy", icon: <Smile className="w-4 h-4" /> },
  { value: "sad", label: "Sad", icon: <Frown className="w-4 h-4" /> },
  { value: "anxious", label: "Anxious", icon: <AlertTriangle className="w-4 h-4" /> },
  { value: "stressed", label: "Stressed", icon: <Flame className="w-4 h-4" /> },
  { value: "neutral", label: "Neutral", icon: <Minus className="w-4 h-4" /> },
];

const moodColorMap: Record<string, string> = {
  happy: "bg-mood-happy/15 text-mood-happy border-mood-happy/30 hover:bg-mood-happy/25",
  sad: "bg-mood-sad/15 text-mood-sad border-mood-sad/30 hover:bg-mood-sad/25",
  anxious: "bg-mood-anxious/15 text-mood-anxious border-mood-anxious/30 hover:bg-mood-anxious/25",
  stressed: "bg-mood-stressed/15 text-mood-stressed border-mood-stressed/30 hover:bg-mood-stressed/25",
  neutral: "bg-mood-neutral/15 text-mood-neutral border-mood-neutral/30 hover:bg-mood-neutral/25",
};

const moodActiveMap: Record<string, string> = {
  happy: "bg-mood-happy text-primary-foreground border-mood-happy",
  sad: "bg-mood-sad text-primary-foreground border-mood-sad",
  anxious: "bg-mood-anxious text-primary-foreground border-mood-anxious",
  stressed: "bg-mood-stressed text-primary-foreground border-mood-stressed",
  neutral: "bg-mood-neutral text-primary-foreground border-mood-neutral",
};

interface MoodSelectorProps {
  selectedMood: Mood;
  onMoodChange: (mood: Mood) => void;
}

const MoodSelector = ({ selectedMood, onMoodChange }: MoodSelectorProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className="text-xs text-muted-foreground font-body mr-1">How are you feeling?</span>
      {moods.map(({ value, label, icon }) => {
        const isActive = selectedMood === value;
        return (
          <button
            key={value}
            onClick={() => onMoodChange(isActive ? null : value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
              isActive ? moodActiveMap[value!] : moodColorMap[value!]
            }`}
          >
            {icon}
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
