import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  FileText, 
  Download, 
  ChevronDown,
  ChevronRight,
  BookOpen,
  Video,
  ArrowLeft
} from 'lucide-react';

interface Lecture {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'document' | 'quiz';
}

interface Module {
  id: string;
  title: string;
  lectures: Lecture[];
}

const courseModules: Module[] = [
  {
    id: '1',
    title: 'Module 1: Introduction to IoT',
    lectures: [
      { id: '1-1', title: 'What is Internet of Things?', duration: '15:30', completed: true, type: 'video' },
      { id: '1-2', title: 'History and Evolution of IoT', duration: '12:45', completed: true, type: 'video' },
      { id: '1-3', title: 'IoT Architecture Overview', duration: '18:20', completed: true, type: 'video' },
      { id: '1-4', title: 'Module 1 Reading Material', duration: '10 min read', completed: true, type: 'document' },
      { id: '1-5', title: 'Module 1 Quiz', duration: '10 questions', completed: true, type: 'quiz' },
    ],
  },
  {
    id: '2',
    title: 'Module 2: IoT Devices and Sensors',
    lectures: [
      { id: '2-1', title: 'Types of IoT Devices', duration: '20:15', completed: true, type: 'video' },
      { id: '2-2', title: 'Sensors and Actuators', duration: '25:00', completed: true, type: 'video' },
      { id: '2-3', title: 'Microcontrollers in IoT', duration: '22:30', completed: true, type: 'video' },
      { id: '2-4', title: 'Hands-on: Setting up Arduino', duration: '30:00', completed: false, type: 'video' },
      { id: '2-5', title: 'Module 2 Quiz', duration: '15 questions', completed: false, type: 'quiz' },
    ],
  },
  {
    id: '3',
    title: 'Module 3: IoT Communication Protocols',
    lectures: [
      { id: '3-1', title: 'WiFi and Bluetooth in IoT', duration: '18:45', completed: false, type: 'video' },
      { id: '3-2', title: 'MQTT Protocol Deep Dive', duration: '24:00', completed: false, type: 'video' },
      { id: '3-3', title: 'HTTP vs MQTT Comparison', duration: '15:30', completed: false, type: 'video' },
      { id: '3-4', title: 'LoRaWAN for Long Range IoT', duration: '20:00', completed: false, type: 'video' },
    ],
  },
  {
    id: '4',
    title: 'Module 4: IoT Cloud Platforms',
    lectures: [
      { id: '4-1', title: 'Introduction to AWS IoT', duration: '25:00', completed: false, type: 'video' },
      { id: '4-2', title: 'Azure IoT Hub', duration: '22:15', completed: false, type: 'video' },
      { id: '4-3', title: 'Google Cloud IoT Core', duration: '20:30', completed: false, type: 'video' },
      { id: '4-4', title: 'Comparing Cloud Platforms', duration: '18:00', completed: false, type: 'video' },
    ],
  },
];

const CourseDetail = () => {
  const { id } = useParams();
  const [expandedModules, setExpandedModules] = useState<string[]>(['1', '2']);
  const [currentVideo, setCurrentVideo] = useState<Lecture | null>(courseModules[0].lectures[0]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'document': return FileText;
      case 'quiz': return BookOpen;
      default: return Video;
    }
  };

  const totalLectures = courseModules.reduce((acc, m) => acc + m.lectures.length, 0);
  const completedLectures = courseModules.reduce(
    (acc, m) => acc + m.lectures.filter(l => l.completed).length, 
    0
  );
  const progress = Math.round((completedLectures / totalLectures) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link to="/lms" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>

        {/* Course Header */}
        <div className="bg-gradient-navy rounded-xl p-6 text-primary-foreground">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <span className="text-sm text-primary-foreground/70">CSIT136 - Semester V</span>
              <h1 className="text-2xl lg:text-3xl font-bold mt-1 mb-4">
                Internet of Things (IoT)
              </h1>
              <p className="text-primary-foreground/80 mb-4">
                Learn the fundamentals of IoT including devices, sensors, communication protocols,
                and cloud platforms. Build real-world IoT projects.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-secondary" />
                  <span>{totalLectures} Lectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span>12 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span>{progress}% Complete</span>
                </div>
              </div>
            </div>
            <div className="lg:w-64">
              <div className="bg-primary-foreground/10 rounded-lg p-4">
                <p className="text-sm text-primary-foreground/70 mb-2">Your Progress</p>
                <div className="progress-bar bg-primary-foreground/20">
                  <div 
                    className="progress-bar-fill bg-secondary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm mt-2">{completedLectures}/{totalLectures} lectures completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-foreground rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              <div className="relative text-center text-primary-foreground">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-secondary-foreground ml-1" />
                </div>
                <h3 className="text-xl font-semibold">{currentVideo?.title}</h3>
                <p className="text-primary-foreground/60">{currentVideo?.duration}</p>
              </div>
            </div>

            {/* Video Description */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-2">About this lecture</h3>
              <p className="text-muted-foreground">
                In this lecture, we'll explore the fundamental concepts of Internet of Things.
                You'll learn about the history, current applications, and future potential of IoT technology.
              </p>
              <div className="flex gap-3 mt-4">
                <Button variant="navy" size="sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Mark Complete
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download Resources
                </Button>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Course Content</h3>
              <p className="text-sm text-muted-foreground">
                {courseModules.length} modules • {totalLectures} lectures
              </p>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {courseModules.map((module) => (
                <div key={module.id} className="border-b border-border last:border-0">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedModules.includes(module.id) ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="font-medium text-foreground text-left">{module.title}</span>
                    </div>
                  </button>
                  {expandedModules.includes(module.id) && (
                    <div className="bg-muted/50">
                      {module.lectures.map((lecture) => {
                        const Icon = getTypeIcon(lecture.type);
                        return (
                          <button
                            key={lecture.id}
                            onClick={() => setCurrentVideo(lecture)}
                            className={`w-full p-3 pl-12 flex items-center gap-3 hover:bg-muted transition-colors text-left ${
                              currentVideo?.id === lecture.id ? 'bg-primary/10 border-l-2 border-primary' : ''
                            }`}
                          >
                            {lecture.completed ? (
                              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                            ) : (
                              <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm truncate ${lecture.completed ? 'text-muted-foreground' : 'text-foreground'}`}>
                                {lecture.title}
                              </p>
                              <p className="text-xs text-muted-foreground">{lecture.duration}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetail;
