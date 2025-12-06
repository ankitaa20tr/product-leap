import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ApplicationForm = () => {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    instagram: "",
    niche: "",
    reason: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use environment variable if set, otherwise use proxy in dev or default URL
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'http://localhost:3001');
      const response = await fetch(`${apiUrl}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Application received!",
        description: "We'll review your application and get back to you within 48 hours.",
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setIsSubmitting(false);
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <section id="apply" ref={ref} className="py-24 bg-muted/30">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Application Received!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're excited to learn more about your story. Our team will review your application and reach out within 48 hours with next steps.
            </p>
            <p className="text-sm text-muted-foreground">
              In the meantime, check your email for a confirmation message.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" ref={ref} className="py-24 bg-muted/30">
      <div className="container px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span 
              className={cn(
                "inline-block text-sm font-semibold text-primary mb-4 opacity-0",
                isRevealed && "animate-fade-up"
              )}
            >
              APPLY NOW
            </span>
            <h2 
              className={cn(
                "text-3xl sm:text-4xl font-bold text-foreground mb-4 opacity-0",
                isRevealed && "animate-fade-up stagger-1"
              )}
            >
              Ready to Monetize Your Story?
            </h2>
            <p 
              className={cn(
                "text-lg text-muted-foreground opacity-0",
                isRevealed && "animate-fade-up stagger-2"
              )}
            >
              Takes 2 minutes. No commitment required.
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className={cn(
              "p-8 rounded-2xl bg-card border border-border shadow-card opacity-0",
              isRevealed && "animate-fade-up stagger-3"
            )}
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground">
                  Your Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="instagram" className="text-foreground">
                  Instagram Link
                </Label>
                <Input
                  id="instagram"
                  name="instagram"
                  placeholder="instagram.com/yourhandle"
                  value={formData.instagram}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="niche" className="text-foreground">
                  Your Niche
                </Label>
                <Input
                  id="niche"
                  name="niche"
                  placeholder="Fitness, Finance, Lifestyle, etc."
                  value={formData.niche}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="reason" className="text-foreground">
                  Why do you want to monetize?
                </Label>
                <Textarea
                  id="reason"
                  name="reason"
                  placeholder="Tell us about your goals and what drives you..."
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="mt-2 min-h-[100px] resize-none"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2"
                />
              </div>
              
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                We review every application personally. Expect a response within 48 hours.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;

