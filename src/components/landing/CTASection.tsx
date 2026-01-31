import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 border border-primary-foreground rounded-full" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/30 rotate-45" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
          Start Your Journey Today
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Join 50,000+ students who have transformed their careers with Consultix University.
          Applications for Jan'26 session are now open!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            variant="gold" 
            size="xl" 
            className="animate-pulse-glow"
            onClick={() => navigate('/apply')}
          >
            Apply Now - Free Counseling
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button 
            variant="heroOutline" 
            size="xl"
            onClick={() => window.location.href = 'tel:+911234567890'}
          >
            <Phone className="w-5 h-5" />
            Talk to Advisor
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 items-center">
          <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
            <span className="text-secondary font-semibold">UGC</span>
            <span className="text-primary-foreground text-sm">Approved</span>
          </div>
          <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
            <span className="text-secondary font-semibold">NAAC A+</span>
            <span className="text-primary-foreground text-sm">Accredited</span>
          </div>
          <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
            <span className="text-secondary font-semibold">AICTE</span>
            <span className="text-primary-foreground text-sm">Recognized</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
