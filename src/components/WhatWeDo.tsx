import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Target, Package, Building, Cog, Video, Percent } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Identify Monetizable Angles",
    description: "We find the hidden goldmine in your niche.",
  },
  {
    icon: Package,
    title: "Build Digital Products",
    description: "Courses, templates, guides—aligned with your story.",
  },
  {
    icon: Building,
    title: "Business Setup",
    description: "Legal, payments, funnels—all handled.",
  },
  {
    icon: Cog,
    title: "Backend Operations",
    description: "Customer support, tech, scaling—on us.",
  },
  {
    icon: Video,
    title: "You Just Create",
    description: "Record content. That's your only job.",
  },
  {
    icon: Percent,
    title: "60/40 Split",
    description: "You keep 60%. Zero upfront investment.",
  },
];

const WhatWeDo = () => {
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
              WHAT WE DO
            </span>
            <h2 
              className={cn(
                "text-3xl sm:text-4xl font-bold text-foreground mb-4 opacity-0",
                isRevealed && "animate-fade-up stagger-1"
              )}
            >
              Your Shadow Business Team
            </h2>
            <p 
              className={cn(
                "text-lg text-muted-foreground max-w-2xl mx-auto opacity-0",
                isRevealed && "animate-fade-up stagger-2"
              )}
            >
              We become the invisible engine behind your creator business.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={cn(
                  "group relative p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft opacity-0",
                  isRevealed && "animate-fade-up",
                  `stagger-${Math.min(index + 3, 6)}`
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <service.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
