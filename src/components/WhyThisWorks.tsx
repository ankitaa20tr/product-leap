import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const reasons = [
  {
    number: "01",
    title: "Story-driven products convert",
    description: "People buy transformation, not information. Your story is the proof.",
  },
  {
    number: "02",
    title: "Audiences prefer creator-led learning",
    description: "They already trust you. That's the hardest part done.",
  },
  {
    number: "03",
    title: "Mini-teams outperform solo creators",
    description: "You can't do it all. Neither should you.",
  },
  {
    number: "04",
    title: "No-risk model for creators",
    description: "We invest first. You invest only after seeing results.",
  },
];

const WhyThisWorks = () => {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span 
              className={cn(
                "inline-block text-sm font-semibold text-primary mb-4 opacity-0",
                isRevealed && "animate-fade-up"
              )}
            >
              WHY THIS WORKS
            </span>
            <h2 
              className={cn(
                "text-3xl sm:text-4xl font-bold text-foreground opacity-0",
                isRevealed && "animate-fade-up stagger-1"
              )}
            >
              The Creator Economy Truth
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-6 opacity-0",
                  isRevealed && "animate-fade-up",
                  `stagger-${index + 2}`
                )}
              >
                <span className="text-4xl font-bold text-primary/20 flex-shrink-0">
                  {reason.number}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyThisWorks;
