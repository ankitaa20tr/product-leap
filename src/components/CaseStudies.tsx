import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const CaseStudies = () => {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>();

  const scrollToForm = () => {
    const formSection = document.getElementById("apply");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="case-studies" ref={ref} className="py-24 bg-muted/30">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span
              className={cn(
                "inline-block text-sm font-semibold text-primary mb-4 opacity-0",
                isRevealed && "animate-fade-up"
              )}
            >
              CASE STUDIES
            </span>
            <h2
              className={cn(
                "text-3xl sm:text-4xl font-bold text-foreground mb-4 opacity-0",
                isRevealed && "animate-fade-up stagger-1"
              )}
            >
              Creators We’ve Launched
            </h2>
            <p
              className={cn(
                "text-lg text-muted-foreground max-w-2xl mx-auto opacity-0",
                isRevealed && "animate-fade-up stagger-2"
              )}
            >
              Real creators. Real execution. Real outcomes.
            </p>
          </div>

          <div className="space-y-10">
            {/* Fitness Coach */}
            <article
              className={cn(
                "p-8 rounded-2xl bg-card border border-border shadow-card opacity-0",
                isRevealed && "animate-fade-up stagger-3"
              )}
            >
              <h3 className="text-2xl font-semibold text-foreground">
                Fitness Coach
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                From Free Content to First Sale in 12 Days
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Creator Profile
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        Niche:
                      </span>{" "}
                      Home fitness for busy professionals
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        Audience size:
                      </span>{" "}
                      18k followers
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        Monetization before Horizon:
                      </span>{" "}
                      None
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    The Problem
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Strong engagement but zero revenue. Didn’t know what
                    product to sell or how to sell it without burning time on
                    tech and funnels.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    What We Did
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>
                      Identified a high-conversion angle: “30-Minute Fat Loss
                      for 9–5 Workers”
                    </li>
                    <li>Built a short-form challenge + PDF workout plan</li>
                    <li>
                      Set up landing page, checkout, email automation, and
                      support
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    The Result
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>First sale in 12 days</li>
                    <li>Product launched without upfront cost</li>
                    <li>Creator focused only on posting content</li>
                  </ul>
                </div>
              </div>

              <p className="mt-6 text-sm font-medium text-foreground">
                Takeaway:{" "}
                <span className="font-normal text-muted-foreground">
                  You don’t need a massive audience. You need a focused
                  transformation.
                </span>
              </p>
            </article>

            {/* Finance Creator */}
            <article
              className={cn(
                "p-8 rounded-2xl bg-card border border-border shadow-card opacity-0",
                isRevealed && "animate-fade-up stagger-4"
              )}
            >
              <h3 className="text-2xl font-semibold text-foreground">
                Finance Creator
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                Reached $10k MRR in 45 Days
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Creator Profile
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        Niche:
                      </span>{" "}
                      Personal finance for beginners
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        Audience size:
                      </span>{" "}
                      42k followers
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        Monetization before Horizon:
                      </span>{" "}
                      Ad-hoc brand deals
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    The Problem
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Inconsistent income and no scalable product. Didn’t want to
                    manage payments, refunds, or customer questions.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    What We Did
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>
                      Designed a step-by-step “Zero to Investing” starter
                      system
                    </li>
                    <li>Built a course + templates bundle</li>
                    <li>
                      Implemented sales funnel, pricing strategy, and backend
                      ops
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    The Result
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>$10,000 monthly recurring revenue in 45 days</li>
                    <li>
                      Predictable income replacing brand-deal dependency
                    </li>
                    <li>Creator stayed focused on education and content</li>
                  </ul>
                </div>
              </div>

              <p className="mt-6 text-sm font-medium text-foreground">
                Takeaway:{" "}
                <span className="font-normal text-muted-foreground">
                  Trust converts faster when paired with a clear product path.
                </span>
              </p>
            </article>

            {/* Lifestyle Vlogger */}
            <article
              className={cn(
                "p-8 rounded-2xl bg-card border border-border shadow-card opacity-0",
                isRevealed && "animate-fade-up stagger-5"
              )}
            >
              <h3 className="text-2xl font-semibold text-foreground">
                Lifestyle Vlogger
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                Launched First Product in 30 Days
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Creator Profile
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        Niche:
                      </span>{" "}
                      Lifestyle + productivity
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        Audience size:
                      </span>{" "}
                      9k followers
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        Monetization before Horizon:
                      </span>{" "}
                      None
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    The Problem
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Believed audience was “too small” to monetize. No clarity
                    on what product made sense.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    What We Did
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Extracted monetizable themes from past content</li>
                    <li>Built a digital planner + habit system</li>
                    <li>
                      Handled design, delivery, payments, and customer support
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    The Result
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Product live in 30 days</li>
                    <li>First-time creator revenue without upfront risk</li>
                    <li>Simple promotion through existing content</li>
                  </ul>
                </div>
              </div>

              <p className="mt-6 text-sm font-medium text-foreground">
                Takeaway:{" "}
                <span className="font-normal text-muted-foreground">
                  Audience size doesn’t matter. Direction does.
                </span>
              </p>
            </article>
          </div>

          {/* Mini CTA */}
          <div
            className={cn(
              "mt-16 text-center opacity-0",
              isRevealed && "animate-fade-up stagger-6"
            )}
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Your Story Could Be Next
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              If you have an audience and a message, we’ll handle the business.
            </p>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Get Your Free Product Blueprint
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;


