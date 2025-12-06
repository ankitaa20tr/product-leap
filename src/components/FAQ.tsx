import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Why no upfront payment?",
    answer: "Because we believe in our ability to deliver. We invest our time, team, and resources upfront because we know we can create results. If we can't make you money, we don't deserve to get paid. Simple.",
  },
  {
    question: "What type of products do you build?",
    answer: "Digital products that align with your story and audience: online courses, templates, guides, coaching programs, community memberships. We analyze your content and audience to determine the best product-market fit.",
  },
  {
    question: "How does the 60/40 split work?",
    answer: "You keep 60% of every sale. We take 40% to cover our team's work—product creation, tech, marketing systems, customer support, and ongoing optimization. Payments are automatic and transparent.",
  },
  {
    question: "What if it doesn't sell?",
    answer: "We wouldn't take you on if we didn't believe in the potential. But if after launch, sales don't meet expectations, we iterate together. We're invested in your success—literally. There's no financial risk to you.",
  },
  {
    question: "How long until launch?",
    answer: "Typically 4-6 weeks from blueprint approval. We move fast because momentum matters. You'll have a live product, sales system, and revenue potential within 2 months.",
  },
];

const FAQ = () => {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span 
              className={cn(
                "inline-block text-sm font-semibold text-primary mb-4 opacity-0",
                isRevealed && "animate-fade-up"
              )}
            >
              FAQ
            </span>
            <h2 
              className={cn(
                "text-3xl sm:text-4xl font-bold text-foreground opacity-0",
                isRevealed && "animate-fade-up stagger-1"
              )}
            >
              Questions We Get
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 opacity-0",
                  openIndex === index && "border-primary/30",
                  isRevealed && "animate-fade-up",
                  `stagger-${Math.min(index + 2, 6)}`
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0",
                      openIndex === index && "rotate-180"
                    )} 
                  />
                </button>
                
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    openIndex === index ? "max-h-60" : "max-h-0"
                  )}
                >
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-muted-foreground">
                      {faq.answer}
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

export default FAQ;
