import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

const proofs = [
  {
    niche: "Fitness Coach",
    metric: "12 Days",
    label: "To First Sale",
  },
  {
    niche: "Finance Creator",
    metric: "45 Days",
    label: "To $10k MRR",
  },
  {
    niche: "Lifestyle Vlogger",
    metric: "30 Days",
    label: "To Product Launch",
  },
];

const ProofSection = () => {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span 
              className={cn(
                "inline-block text-sm font-semibold text-primary mb-4 opacity-0",
                isRevealed && "animate-fade-up"
              )}
            >
              RESULTS
            </span>
            <h2 
              className={cn(
                "text-3xl sm:text-4xl font-bold text-foreground mb-4 opacity-0",
                isRevealed && "animate-fade-up stagger-1"
              )}
            >
              Creators We've Launched
            </h2>
            <p 
              className={cn(
                "text-lg text-muted-foreground opacity-0",
                isRevealed && "animate-fade-up stagger-2"
              )}
            >
              Real results. Real creators. Your story could be next.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {proofs.map((proof, index) => (
              <div
                key={index}
                className={cn(
                  "group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-card opacity-0 overflow-hidden",
                  isRevealed && "animate-fade-up",
                  `stagger-${index + 3}`
                )}
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                
                <div className="relative">
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-semibold">{proof.niche}</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-foreground">
                      {proof.metric}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground">
                    {proof.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <p 
            className={cn(
              "text-center text-sm text-muted-foreground mt-8 opacity-0",
              isRevealed && "animate-fade-up stagger-6"
            )}
          >
            * Placeholder for future case studies
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
