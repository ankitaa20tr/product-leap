import { Instagram, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo / Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Horizon
              </h3>
              <p className="text-sm text-muted-foreground">
                AI Shadow Creator Agency
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/horizon.agencyyy/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/110113850" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:hello@horizon.agency" 
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 Horizon. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
