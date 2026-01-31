import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  Clock, 
  IndianRupee,
  ExternalLink,
  Bookmark,
  Search,
  Filter,
  GraduationCap,
  Users,
  FileText
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Remote';
  salary: string;
  postedDate: string;
  skills: string[];
  logo: string;
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Software Developer',
    company: 'TechCorp India',
    location: 'Bangalore',
    type: 'Full-time',
    salary: '8-12 LPA',
    postedDate: '2 days ago',
    skills: ['React', 'Node.js', 'MongoDB'],
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    title: 'Data Analyst',
    company: 'Analytics Pro',
    location: 'Mumbai',
    type: 'Full-time',
    salary: '6-10 LPA',
    postedDate: '1 week ago',
    skills: ['Python', 'SQL', 'Tableau'],
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    title: 'IoT Engineer Intern',
    company: 'SmartDevices Ltd',
    location: 'Remote',
    type: 'Internship',
    salary: '25K/month',
    postedDate: '3 days ago',
    skills: ['Arduino', 'Python', 'MQTT'],
    logo: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    title: 'Business Analyst',
    company: 'ConsultFirm',
    location: 'Delhi NCR',
    type: 'Full-time',
    salary: '10-15 LPA',
    postedDate: '5 days ago',
    skills: ['Excel', 'PowerBI', 'SQL'],
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
  },
  {
    id: '5',
    title: 'Cloud Engineer',
    company: 'CloudFirst Solutions',
    location: 'Hyderabad',
    type: 'Remote',
    salary: '12-18 LPA',
    postedDate: '1 day ago',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    logo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&h=100&fit=crop',
  },
];

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: FileText,
    title: 'Resume Building',
    description: 'Get expert help crafting an ATS-friendly resume',
  },
  {
    icon: Users,
    title: 'Mock Interviews',
    description: 'Practice with industry professionals',
  },
  {
    icon: GraduationCap,
    title: 'Skill Assessment',
    description: 'Identify and fill skill gaps',
  },
  {
    icon: Briefcase,
    title: 'Job Referrals',
    description: 'Direct referrals to partner companies',
  },
];

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-hero rounded-xl p-6 lg:p-8 text-primary-foreground">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Career Services</h1>
          <p className="text-primary-foreground/80 max-w-2xl mb-6">
            Explore job opportunities, get career guidance, and connect with top employers.
          </p>
          
          {/* Search */}
          <div className="flex gap-3 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs, skills, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <Button variant="gold" size="lg">
              <Filter className="w-5 h-5" />
              Filter
            </Button>
          </div>
        </div>

        {/* Career Services */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Job Listings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Latest Opportunities</h2>
            <span className="text-sm text-muted-foreground">{filteredJobs.length} jobs found</span>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Company Logo */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={job.logo} 
                      alt={job.company}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Job Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{job.title}</h3>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {job.company}
                        </p>
                      </div>
                      <button 
                        onClick={() => toggleSaveJob(job.id)}
                        className="p-2 hover:bg-muted rounded-lg"
                      >
                        <Bookmark className={`w-5 h-5 ${
                          savedJobs.includes(job.id) 
                            ? 'fill-secondary text-secondary' 
                            : 'text-muted-foreground'
                        }`} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.postedDate}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.skills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="flex sm:flex-col gap-2 sm:justify-center">
                    <Button variant="gold" size="sm">
                      Apply Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Careers;
