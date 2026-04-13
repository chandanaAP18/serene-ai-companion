const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="chat-bubble-assistant px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 typing-dot" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
