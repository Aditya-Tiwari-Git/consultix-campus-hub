import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import heroStudent from '@/assets/hero-student.jpg';
import { Award, Users, BookOpen, Trophy } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, value: '50,000+', label: 'Active Students' },
    { icon: BookOpen, value: '100+', label: 'Courses' },
    { icon: Trophy, value: '95%', label: 'Placement Rate' },
    { icon: Award, value: 'A+', label: 'NAAC Grade' },
  ];

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-primary rotate-45" />
        <div className="absolute top-40 right-40 w-20 h-20 bg-secondary rotate-12" />
        <div className="absolute bottom-20 left-1/3 w-32 h-32 border border-secondary rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full mb-6">
              <Award className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-foreground">UGC Entitled University</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              India's <span className="bg-secondary text-secondary-foreground px-3 py-1">No. #1</span>
              <br />
              Online University
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Join the growing community of <strong>50,000+</strong> ambitious professionals
              who joined Consultix for their lifelong learning and career growth.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="gold" size="xl" onClick={() => navigate('/apply')}>
                Apply Now
              </Button>
              <Button variant="navyOutline" size="xl" onClick={() => navigate('/dashboard')}>
                Student Login
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-secondary/20 rounded-3xl rotate-3" />
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/10 rounded-3xl -rotate-3" />
              
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-muted to-background rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={heroStudent}
                  alt="Consultix University Student"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 left-6 bg-card shadow-lg rounded-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-success-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Top Ranked</div>
                    <div className="text-xs text-muted-foreground">Online University 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
