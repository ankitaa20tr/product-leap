import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, FileText, Lightbulb, Wrench, Megaphone, Wallet } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Apply",
    shortDescription: "Quick 2-minute application",
    fullDescription: "Fill out a simple form with your name, niche, Instagram link, and why you want to monetize. No essays, no BS.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Get a Product Blueprint",
    shortDescription: "Custom strategy for your niche",
    fullDescription: "We analyze your content, audience, and story. Then we create a custom product blueprint showing exactly what we'll build and how.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "We Build Your Product",
    shortDescription: "Done-for-you creation",
    fullDescription: "Our team builds your digital product from scratch—course structure, sales page, payment system, email sequences. Everything.",
  },
  {
    number: "04",
    icon: Megaphone,
    title: "You Promote Through Content",
    shortDescription: "Just create content",
    fullDescription: "Keep doing what you do best—create content. We give you scripts, hooks, and launch strategy. You just record and post.",
  },
  {
    number: "05",
    icon: Wallet,
    title: "You Get Paid",
    shortDescription: "60% directly to you",
    fullDescription: "Sales come in, we handle fulfillment and support. You get 60% of every sale deposited directly to your account.",
  },
];

const HowItWorks = () => {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>();
  const [openStep, setOpenStep] = useState<number | null>(null);

  const scrollToForm = () => {
    const formSection = document.getElementById('apply');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span 
              className={cn(
                "inline-block text-sm font-semibold text-primary mb-4 opacity-0",
                isRevealed && "animate-fade-up"
              )}
            >
              HOW IT WORKS
            </span>
            <h2 
              className={cn(
                "text-3xl sm:text-4xl font-bold text-foreground mb-4 opacity-0",
                isRevealed && "animate-fade-up stagger-1"
              )}
            >
              From Zero to Monetized in 5 Steps
            </h2>
            <p 
              className={cn(
                "text-lg text-muted-foreground opacity-0",
                isRevealed && "animate-fade-up stagger-2"
              )}
            >
              Click each step to see the details.
            </p>
          </div>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 opacity-0",
                  openStep === index && "border-primary/30 shadow-soft",
                  isRevealed && "animate-fade-up",
                  `stagger-${Math.min(index + 3, 6)}`
                )}
              >
                <button
                  onClick={() => setOpenStep(openStep === index ? null : index)}
                  className="w-full p-6 flex items-center gap-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-semibold text-primary">
                        STEP {step.number}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.shortDescription}
                    </p>
                  </div>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0",
                      openStep === index && "rotate-180"
                    )} 
                  />
                </button>
                
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    openStep === index ? "max-h-40" : "max-h-0"
                  )}
                >
                  <div className="px-6 pb-6 pt-2 pl-[5.5rem]">
                    <p className="text-muted-foreground">
                      {step.fullDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className={cn(
              "text-center mt-12 opacity-0",
              isRevealed && "animate-fade-up stagger-6"
            )}
          >
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToForm}
              className="group"
            >
              Book Your Blueprint Call
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
