import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Credibility from "@/components/Credibility";
import WhatWeDo from "@/components/WhatWeDo";
import CaseStudies from "@/components/CaseStudies";
import WhyThisWorks from "@/components/WhyThisWorks";
import ProofSection from "@/components/ProofSection";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import FloatingApplyButton from "@/components/FloatingApplyButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Credibility />
        <WhatWeDo />
        <CaseStudies />
        <WhyThisWorks />
        <ProofSection />
        <HowItWorks />
        <FAQ />
        <ApplicationForm />
      </main>
      <Footer />
      <FloatingApplyButton />
    </div>
  );
};

export default Index;
