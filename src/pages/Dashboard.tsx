import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  Briefcase, 
  Users, 
  Award,
  ArrowRight
} from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  image: string;
}

const featureCards: FeatureCard[] = [
  {
    title: 'Dashboard',
    description: 'View your academic progress and notifications',
    icon: LayoutDashboard,
    href: '/dashboard/overview',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
  },
  {
    title: 'Learning Portal',
    description: 'Access courses, lectures and study materials',
    icon: BookOpen,
    href: '/lms',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
  },
  {
    title: 'Post Your Queries',
    description: 'Ask questions and get answers from faculty',
    icon: HelpCircle,
    href: '/support',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
  },
  {
    title: 'Career Services',
    description: 'Explore job opportunities and career guidance',
    icon: Briefcase,
    href: '/careers',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
  },
  {
    title: 'Community',
    description: 'Connect with peers and alumni network',
    icon: Users,
    href: '/community',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
  },
  {
    title: 'Certifications',
    description: 'Earn industry certifications and badges',
    icon: Award,
    href: '/certifications',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-hero rounded-xl p-6 lg:p-8 text-primary-foreground">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Consultix Online Digital Campus
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl">
            Access all your academic resources, courses, and career services in one place.
            Start learning today!
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <Link
              key={card.title}
              to={card.href}
              className="card-elevated group block"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Card Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/20" />
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-primary-foreground/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <card.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="feature-card-overlay flex items-center justify-between">
                <span>{card.title}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Enrolled Courses</p>
            <p className="text-2xl font-bold text-foreground">6</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-success">4</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Pending Assessments</p>
            <p className="text-2xl font-bold text-secondary">3</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Certifications</p>
            <p className="text-2xl font-bold text-info">2</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
