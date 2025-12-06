import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import HorizonLogo from "@/components/HorizonLogo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('apply');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <HorizonLogo className="w-9 h-9" />
            <span>Horizon</span>
          </a>
          
          <Button 
            variant={isScrolled ? "default" : "outline"}
            size="sm"
            onClick={scrollToForm}
            className={cn(
              "transition-all duration-300",
              !isScrolled && "border-foreground/20 hover:border-foreground/40"
            )}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
