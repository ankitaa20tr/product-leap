import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Sparkles, Settings, Handshake } from "lucide-react";

const credibilityPoints = [
  {
    icon: Sparkles,
    title: "We build digital products for creators under 50k.",
    description: "Your audience size doesn't matter. Your story does.",
  },
  {
    icon: Settings,
    title: "We handle every business + ops detail.",
    description: "Funnels, sales systems, customer support—all on us.",
  },
  {
    icon: Handshake,
    title: "Zero upfront. We earn only when you earn.",
    description: "60% to you, 40% to us. Simple.",
  },
];

const Credibility = () => {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className={cn(
                "text-3xl sm:text-4xl font-bold text-foreground mb-4 opacity-0",
                isRevealed && "animate-fade-up"
              )}
            >
              The No-Risk Model
            </h2>
            <p 
              className={cn(
                "text-lg text-muted-foreground opacity-0",
                isRevealed && "animate-fade-up stagger-1"
              )}
            >
              We only win when you win. That's our promise.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {credibilityPoints.map((point, index) => (
              <div
                key={index}
                className={cn(
                  "group p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 opacity-0",
                  isRevealed && "animate-fade-up",
                  `stagger-${index + 2}`
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {point.title}
                </h3>
                <p className="text-muted-foreground">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credibility;
