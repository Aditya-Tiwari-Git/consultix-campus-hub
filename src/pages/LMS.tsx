import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Play, 
  Calendar,
  ChevronRight,
  Filter
} from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  semester: string;
  progress: number;
  totalLectures: number;
  completedLectures: number;
  image: string;
  status: 'in-progress' | 'completed' | 'not-started';
}

const courses: Course[] = [
  {
    id: '1',
    code: 'CSIT136',
    name: 'Internet of Things',
    semester: 'Semester V',
    progress: 100,
    totalLectures: 24,
    completedLectures: 24,
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=250&fit=crop',
    status: 'completed',
  },
  {
    id: '2',
    code: 'CSIT334',
    name: 'Fundamentals of Ecommerce',
    semester: 'Semester V',
    progress: 99,
    totalLectures: 20,
    completedLectures: 19,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    status: 'in-progress',
  },
  {
    id: '3',
    code: 'CSIT341',
    name: 'Data Warehousing and Mining',
    semester: 'Semester V',
    progress: 100,
    totalLectures: 22,
    completedLectures: 22,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    status: 'completed',
  },
  {
    id: '4',
    code: 'CSIT361',
    name: 'Introduction to Artificial Intelligence',
    semester: 'Semester V',
    progress: 100,
    totalLectures: 28,
    completedLectures: 28,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    status: 'completed',
  },
  {
    id: '5',
    code: 'PFE301',
    name: 'Professional Ethics',
    semester: 'Semester V',
    progress: 75,
    totalLectures: 16,
    completedLectures: 12,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop',
    status: 'in-progress',
  },
  {
    id: '6',
    code: 'CERT001',
    name: 'Free Certificate Courses',
    semester: 'Additional',
    progress: 45,
    totalLectures: 10,
    completedLectures: 4,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop',
    status: 'in-progress',
  },
];

interface RecentItem {
  title: string;
  type: string;
  course: string;
}

const recentItems: RecentItem[] = [
  { title: 'Academic Calendar | Jul 25 Session', type: 'Online Classroom', course: '' },
  { title: 'Assessment Schema (Admin...)', type: 'Online Classroom', course: '' },
  { title: '6th Module Assessment', type: 'Professional Ethics (PFE301)...', course: '' },
];

const LMS = () => {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay: firstDay === 0 ? 6 : firstDay - 1, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <DashboardLayout>
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
              <p className="text-muted-foreground">Continue your learning journey</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'navy' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'in-progress' ? 'gold' : 'outline'} 
                size="sm"
                onClick={() => setFilter('in-progress')}
              >
                In Progress
              </Button>
              <Button 
                variant={filter === 'completed' ? 'success' : 'outline'} 
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed
              </Button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/lms/course/${course.id}`}
                className="card-elevated group"
              >
                {/* Course Image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {course.status === 'completed' && (
                    <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </div>
                  )}
                </div>

                {/* Course Details */}
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {course.code} - {course.semester}
                  </p>
                  <h3 className="font-semibold text-foreground mb-3 line-clamp-2 min-h-[2.5rem]">
                    {course.name}
                  </h3>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill"
                        style={{ 
                          width: `${course.progress}%`,
                          background: course.progress === 100 
                            ? 'hsl(var(--success))' 
                            : 'var(--gradient-gold)'
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {course.progress}% Course Completed
                    </p>
                  </div>

                  <Button variant="navyOutline" size="sm" className="w-full">
                    {course.status === 'completed' ? 'Review Course' : 'View Course'}
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden xl:block w-80 space-y-6">
          {/* Recent Items */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Recently accessed items</h3>
              <button className="text-muted-foreground hover:text-foreground">
                ×
              </button>
            </div>
            <div className="space-y-3">
              {recentItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-info">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="navyOutline" size="sm" className="w-full mt-4">
              Show more items
            </Button>
          </div>

          {/* Calendar */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Calendar</h3>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-1 hover:bg-muted rounded"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <span className="font-medium text-foreground">{monthName}</span>
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-1 hover:bg-muted rounded"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="py-1 text-muted-foreground font-medium">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="py-1" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => (
                <div 
                  key={i + 1} 
                  className={`py-1 rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors ${
                    i + 1 === 30 ? 'bg-primary text-primary-foreground' : ''
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LMS;
