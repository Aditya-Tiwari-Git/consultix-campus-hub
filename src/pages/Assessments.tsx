import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play,
  FileText,
  Award,
  ChevronRight
} from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  course: string;
  type: 'quiz' | 'assignment' | 'exam';
  questions: number;
  duration: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  score?: number;
  maxScore?: number;
}

const assessments: Assessment[] = [
  {
    id: '1',
    title: 'Module 3 Quiz - IoT Protocols',
    course: 'Internet of Things (CSIT136)',
    type: 'quiz',
    questions: 15,
    duration: '20 mins',
    dueDate: '2026-02-05',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Mid-Semester Assignment',
    course: 'Data Warehousing (CSIT341)',
    type: 'assignment',
    questions: 5,
    duration: '2 hours',
    dueDate: '2026-02-10',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Module 6 Assessment',
    course: 'Professional Ethics (PFE301)',
    type: 'quiz',
    questions: 20,
    duration: '30 mins',
    dueDate: '2026-02-01',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Module 2 Quiz - Sensors',
    course: 'Internet of Things (CSIT136)',
    type: 'quiz',
    questions: 10,
    duration: '15 mins',
    dueDate: '2026-01-25',
    status: 'completed',
    score: 9,
    maxScore: 10,
  },
  {
    id: '5',
    title: 'Case Study Analysis',
    course: 'Fundamentals of Ecommerce (CSIT334)',
    type: 'assignment',
    questions: 3,
    duration: '3 hours',
    dueDate: '2026-01-20',
    status: 'completed',
    score: 45,
    maxScore: 50,
  },
  {
    id: '6',
    title: 'Module 1 Quiz - Introduction',
    course: 'Artificial Intelligence (CSIT361)',
    type: 'quiz',
    questions: 10,
    duration: '15 mins',
    dueDate: '2026-01-15',
    status: 'completed',
    score: 10,
    maxScore: 10,
  },
];

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const sampleQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does IoT stand for?',
    options: [
      'Internet of Technology',
      'Internet of Things',
      'Integration of Technology',
      'Interconnected Online Technology'
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'Which protocol is commonly used for IoT communication?',
    options: ['FTP', 'SMTP', 'MQTT', 'POP3'],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: 'What is the primary function of a sensor in IoT?',
    options: [
      'Store data',
      'Process information',
      'Detect changes in the environment',
      'Transmit data to the cloud'
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: 'Which of the following is NOT an IoT device?',
    options: ['Smart thermostat', 'Fitness tracker', 'Desktop computer', 'Smart refrigerator'],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: 'What is the role of an actuator in IoT?',
    options: [
      'Measure temperature',
      'Convert electrical signals to physical actions',
      'Store sensor data',
      'Encrypt communications'
    ],
    correctAnswer: 1,
  },
];

const Assessments = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const pendingAssessments = assessments.filter(a => a.status === 'pending');
  const completedAssessments = assessments.filter(a => a.status === 'completed');

  const handleStartQuiz = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === sampleQuiz[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
            <AlertCircle className="w-3 h-3" />
            Overdue
          </span>
        );
    }
  };

  if (quizStarted && selectedAssessment) {
    if (showResults) {
      const score = calculateScore();
      const percentage = Math.round((score / sampleQuiz.length) * 100);
      
      return (
        <DashboardLayout>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-8 text-center">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
                percentage >= 80 ? 'bg-success/20' : percentage >= 60 ? 'bg-secondary/20' : 'bg-destructive/20'
              }`}>
                <Award className={`w-12 h-12 ${
                  percentage >= 80 ? 'text-success' : percentage >= 60 ? 'text-secondary' : 'text-destructive'
                }`} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Completed!</h2>
              <p className="text-muted-foreground mb-6">{selectedAssessment.title}</p>
              
              <div className="bg-muted rounded-xl p-6 mb-6">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {score}/{sampleQuiz.length}
                </div>
                <p className="text-muted-foreground">
                  You scored {percentage}%
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-success/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-success">{score}</div>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="bg-destructive/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-destructive">{sampleQuiz.length - score}</div>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => setQuizStarted(false)}>
                  Back to Assessments
                </Button>
                <Button variant="gold" onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswers([]);
                  setShowResults(false);
                }}>
                  Retry Quiz
                </Button>
              </div>
            </div>
          </div>
        </DashboardLayout>
      );
    }

    const question = sampleQuiz[currentQuestion];

    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto">
          {/* Quiz Header */}
          <div className="bg-gradient-navy rounded-xl p-6 mb-6 text-primary-foreground">
            <h2 className="text-xl font-bold mb-2">{selectedAssessment.title}</h2>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {sampleQuiz.length} Questions
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedAssessment.duration}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-card rounded-xl border border-border p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm font-medium text-foreground">
                {currentQuestion + 1} of {sampleQuiz.length}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill"
                style={{ width: `${((currentQuestion + 1) / sampleQuiz.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-card rounded-xl border border-border p-6 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                {currentQuestion + 1}
              </span>
              <h3 className="text-lg font-medium text-foreground flex-1">
                {question.question}
              </h3>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button 
              variant="gold" 
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              {currentQuestion === sampleQuiz.length - 1 ? 'Submit Quiz' : 'Next Question'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Assessments</h1>
          <p className="text-muted-foreground">Complete quizzes and assignments to track your progress</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'pending' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Pending ({pendingAssessments.length})
            {activeTab === 'pending' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'completed' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Completed ({completedAssessments.length})
            {activeTab === 'completed' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Assessments List */}
        <div className="grid gap-4">
          {(activeTab === 'pending' ? pendingAssessments : completedAssessments).map((assessment) => (
            <div 
              key={assessment.id}
              className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      assessment.type === 'quiz' ? 'bg-info/20' : 'bg-secondary/20'
                    }`}>
                      {assessment.type === 'quiz' ? (
                        <FileText className="w-5 h-5 text-info" />
                      ) : (
                        <FileText className="w-5 h-5 text-secondary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{assessment.title}</h3>
                      <p className="text-sm text-muted-foreground">{assessment.course}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {assessment.duration}
                    </span>
                  </div>
                  {assessment.score !== undefined && (
                    <div className="text-sm font-medium text-foreground">
                      Score: {assessment.score}/{assessment.maxScore}
                    </div>
                  )}
                  {getStatusBadge(assessment.status)}
                  {assessment.status === 'pending' && (
                    <Button 
                      variant="gold" 
                      size="sm"
                      onClick={() => handleStartQuiz(assessment)}
                    >
                      <Play className="w-4 h-4" />
                      Start
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Assessments;
