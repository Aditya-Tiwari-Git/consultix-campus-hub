import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  Download, 
  ExternalLink, 
  CheckCircle,
  Clock,
  Star,
  Lock,
  Share2
} from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: string;
  status: 'earned' | 'in-progress' | 'locked';
  earnedDate?: string;
  progress?: number;
  requirements?: string[];
  credentialId?: string;
  image: string;
}

const certifications: Certification[] = [
  {
    id: '1',
    title: 'Internet of Things Fundamentals',
    issuer: 'Consultix University',
    category: 'Technical',
    status: 'earned',
    earnedDate: '2026-01-15',
    credentialId: 'CX-IOT-2026-12345',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Python for Data Science',
    issuer: 'Consultix University',
    category: 'Programming',
    status: 'earned',
    earnedDate: '2025-12-20',
    credentialId: 'CX-PDS-2025-67890',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Cloud Computing Essentials',
    issuer: 'AWS Partner',
    category: 'Cloud',
    status: 'in-progress',
    progress: 65,
    requirements: ['Complete 8/12 modules', 'Pass final assessment', 'Submit project'],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Machine Learning Specialist',
    issuer: 'Consultix University',
    category: 'AI/ML',
    status: 'in-progress',
    progress: 40,
    requirements: ['Complete ML course', 'Build 3 projects', 'Pass certification exam'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    title: 'Cybersecurity Professional',
    issuer: 'Industry Partner',
    category: 'Security',
    status: 'locked',
    requirements: ['Complete prerequisite courses', 'Enroll in security track'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    title: 'Full Stack Development',
    issuer: 'Consultix University',
    category: 'Development',
    status: 'locked',
    requirements: ['Complete web development track', 'Build portfolio projects'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
  },
];

const Certifications = () => {
  const [filter, setFilter] = useState<'all' | 'earned' | 'in-progress' | 'locked'>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const filteredCerts = certifications.filter(cert => {
    if (filter === 'all') return true;
    return cert.status === filter;
  });

  const earnedCount = certifications.filter(c => c.status === 'earned').length;
  const inProgressCount = certifications.filter(c => c.status === 'in-progress').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'earned':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-secondary" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  if (selectedCert) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => setSelectedCert(null)}
            className="mb-6 text-muted-foreground hover:text-foreground flex items-center gap-2"
          >
            ← Back to Certifications
          </button>

          {/* Certificate Display */}
          <div className="bg-card rounded-xl border-2 border-secondary overflow-hidden">
            {/* Certificate Header */}
            <div className="bg-gradient-navy p-8 text-center text-primary-foreground">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-secondary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Certificate of Completion</h1>
              <p className="text-primary-foreground/70">This certifies that</p>
            </div>

            {/* Certificate Body */}
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Aditya Tiwari</h2>
              <p className="text-muted-foreground mb-6">has successfully completed</p>
              
              <h3 className="text-3xl font-bold text-primary mb-4">{selectedCert.title}</h3>
              
              <div className="flex justify-center items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <Star className="w-5 h-5 text-secondary fill-secondary" />
              </div>

              <div className="grid grid-cols-2 gap-8 max-w-md mx-auto mb-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Date Issued</p>
                  <p className="font-semibold text-foreground">{selectedCert.earnedDate}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Credential ID</p>
                  <p className="font-semibold text-foreground">{selectedCert.credentialId}</p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground mb-2">Issued by</p>
                <p className="font-semibold text-foreground">{selectedCert.issuer}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 bg-muted/50 flex flex-wrap gap-4 justify-center">
              <Button variant="gold">
                <Download className="w-4 h-4" />
                Download Certificate
              </Button>
              <Button variant="navyOutline">
                <Share2 className="w-4 h-4" />
                Share on LinkedIn
              </Button>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4" />
                Verify Certificate
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Certifications</h1>
            <p className="text-muted-foreground">Earn industry-recognized certifications</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-success/10 px-4 py-2 rounded-lg">
              <span className="text-success font-bold text-lg">{earnedCount}</span>
              <span className="text-muted-foreground text-sm ml-2">Earned</span>
            </div>
            <div className="bg-secondary/10 px-4 py-2 rounded-lg">
              <span className="text-secondary font-bold text-lg">{inProgressCount}</span>
              <span className="text-muted-foreground text-sm ml-2">In Progress</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(['all', 'earned', 'in-progress', 'locked'] as const).map((tab) => (
            <Button
              key={tab}
              variant={filter === tab ? 'navy' : 'outline'}
              size="sm"
              onClick={() => setFilter(tab)}
              className="capitalize"
            >
              {tab === 'in-progress' ? 'In Progress' : tab}
            </Button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div 
              key={cert.id}
              className={`card-elevated overflow-hidden ${
                cert.status === 'locked' ? 'opacity-70' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute top-3 right-3">
                  {getStatusIcon(cert.status)}
                </div>
                {cert.status === 'earned' && (
                  <div className="absolute bottom-3 left-3 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Certified
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs text-muted-foreground">{cert.category}</span>
                <h3 className="font-semibold text-foreground mt-1 mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">Issued by {cert.issuer}</p>

                {cert.status === 'earned' && (
                  <Button 
                    variant="gold" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <Award className="w-4 h-4" />
                    View Certificate
                  </Button>
                )}

                {cert.status === 'in-progress' && (
                  <div className="space-y-3">
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{cert.progress}% complete</p>
                    <Button variant="navyOutline" size="sm" className="w-full">
                      Continue Learning
                    </Button>
                  </div>
                )}

                {cert.status === 'locked' && (
                  <div className="space-y-3">
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {cert.requirements?.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Lock className="w-3 h-3" />
                          {req}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <Lock className="w-4 h-4" />
                      Locked
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Certifications;
