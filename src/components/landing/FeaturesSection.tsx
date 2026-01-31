import { 
  BookOpen, 
  Video, 
  Award, 
  Users, 
  Briefcase, 
  HeadphonesIcon,
  Laptop,
  FileCheck
} from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Engage with expert faculty in real-time through our HD video conferencing platform.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive LMS',
    description: 'Access course materials, assignments, and resources anytime through our learning portal.',
  },
  {
    icon: FileCheck,
    title: 'Online Assessments',
    description: 'Take proctored exams and quizzes from the comfort of your home.',
  },
  {
    icon: Award,
    title: 'Industry Certifications',
    description: 'Earn recognized certifications from top industry partners alongside your degree.',
  },
  {
    icon: Briefcase,
    title: 'Career Services',
    description: '100% placement assistance with resume building, mock interviews, and job referrals.',
  },
  {
    icon: Users,
    title: 'Peer Community',
    description: 'Connect with 50,000+ students and alumni through our networking platform.',
  },
  {
    icon: Laptop,
    title: 'Mobile Learning',
    description: 'Study on-the-go with our mobile app available on iOS and Android.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Get instant help from our dedicated student support team anytime you need.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive ecosystem is designed to provide you with the best
            online education experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-xl border border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-navy rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
