const HorizonLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Orange top half - sun/horizon */}
      <path 
        d="M50 5 A45 45 0 0 1 95 50 L5 50 A45 45 0 0 1 50 5" 
        fill="hsl(var(--primary))"
      />
      {/* Dark bottom half - road */}
      <path 
        d="M5 50 A45 45 0 0 0 95 50 L5 50" 
        fill="hsl(var(--foreground))"
      />
      <path 
        d="M5 50 A45 45 0 0 0 50 95 A45 45 0 0 0 95 50" 
        fill="hsl(var(--foreground))"
      />
      {/* Road curves */}
      <path 
        d="M20 55 Q35 60 50 70 Q65 80 80 85" 
        stroke="hsl(var(--background))" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M30 52 Q45 55 55 60 Q70 68 85 72" 
        stroke="hsl(var(--background))" 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HorizonLogo;
