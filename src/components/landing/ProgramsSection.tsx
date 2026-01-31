import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Clock, IndianRupee, Award, ArrowRight } from 'lucide-react';
import campusBca from '@/assets/campus-bca.jpg';
import campusMba from '@/assets/campus-mba.jpg';
import campusMca from '@/assets/campus-mca.jpg';
import campusBba from '@/assets/campus-bba.jpg';

interface Program {
  id: string;
  name: string;
  fullName: string;
  duration: string;
  fee: string;
  image: string;
  features: string[];
}

const programs: Program[] = [
  {
    id: 'bca',
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    duration: '3 Years',
    fee: '₹1,20,000/year',
    image: campusBca,
    features: ['Industry Certification', 'Live Projects', '100% Placement Support'],
  },
  {
    id: 'mba',
    name: 'MBA',
    fullName: 'Master of Business Administration',
    duration: '2 Years',
    fee: '₹1,50,000/year',
    image: campusMba,
    features: ['Global Case Studies', 'Industry Mentors', 'Leadership Programs'],
  },
  {
    id: 'mca',
    name: 'MCA',
    fullName: 'Master of Computer Applications',
    duration: '2 Years',
    fee: '₹1,40,000/year',
    image: campusMca,
    features: ['AI & ML Specialization', 'Tech Projects', 'Internship Guarantee'],
  },
  {
    id: 'bba',
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    duration: '3 Years',
    fee: '₹1,00,000/year',
    image: campusBba,
    features: ['Entrepreneurship Track', 'Industry Visits', 'Soft Skills Training'],
  },
];

const ProgramsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="programs" className="py-16 lg:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-secondary/20 text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Path to Success
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our UGC-approved degree programs designed for working professionals
            and aspiring students.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className="card-elevated group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Program Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-primary-foreground">{program.name}</h3>
                </div>
              </div>

              {/* Program Details */}
              <div className="p-5">
                <p className="text-sm text-muted-foreground mb-4">{program.fullName}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="text-foreground">{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="w-4 h-4 text-secondary" />
                    <span className="text-foreground">{program.fee}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-1 mb-4">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Award className="w-3 h-3 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="navyOutline"
                  size="sm"
                  className="w-full group/btn"
                  onClick={() => navigate('/apply')}
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="gold" size="lg" onClick={() => navigate('/programs')}>
            View All Programs
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
