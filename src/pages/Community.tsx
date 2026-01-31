import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Send,
  Image,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    program: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
}

const posts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      program: 'MBA - Semester III',
    },
    content: 'Just completed my Machine Learning certification! 🎉 Thanks to Consultix for the amazing course content and support. Ready to apply these skills in my data science projects!',
    likes: 42,
    comments: 8,
    timestamp: '2 hours ago',
    liked: false,
  },
  {
    id: '2',
    author: {
      name: 'Rahul Verma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      program: 'BCA - Semester V',
    },
    content: 'Looking for study partners for the upcoming IoT exam. Anyone interested in forming a study group? We can use Discord or Teams for discussions. #StudyGroup #IoT #BCA',
    likes: 15,
    comments: 23,
    timestamp: '5 hours ago',
    liked: true,
  },
  {
    id: '3',
    author: {
      name: 'Ananya Patel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      program: 'MCA - Semester II',
    },
    content: 'Excited to share that I got placed at TechCorp India! The career services team was incredibly helpful with mock interviews and resume building. Thank you Consultix! 🙏',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=300&fit=crop',
    likes: 128,
    comments: 34,
    timestamp: '1 day ago',
    liked: false,
  },
  {
    id: '4',
    author: {
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      program: 'BBA - Semester IV',
    },
    content: 'Does anyone have notes for the Financial Management module? Missed a few lectures due to work. Would really appreciate any help! 📚',
    likes: 5,
    comments: 12,
    timestamp: '2 days ago',
    liked: false,
  },
];

interface GroupChat {
  id: string;
  name: string;
  members: number;
  avatar: string;
  lastMessage: string;
}

const groupChats: GroupChat[] = [
  {
    id: '1',
    name: 'BCA Semester V',
    members: 156,
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
    lastMessage: 'IoT assignment due next week',
  },
  {
    id: '2',
    name: 'Coding Club',
    members: 89,
    avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop',
    lastMessage: 'Hackathon registration open!',
  },
  {
    id: '3',
    name: 'Placement Prep',
    members: 234,
    avatar: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=100&h=100&fit=crop',
    lastMessage: 'Interview tips shared',
  },
];

const Community = () => {
  const [newPost, setNewPost] = useState('');
  const [postsState, setPostsState] = useState(posts);

  const toggleLike = (postId: string) => {
    setPostsState(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              liked: !post.liked, 
              likes: post.liked ? post.likes - 1 : post.likes + 1 
            }
          : post
      )
    );
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: 'Aditya Tiwari',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        program: 'BCA - Semester V',
      },
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      liked: false,
    };
    
    setPostsState([post, ...postsState]);
    setNewPost('');
  };

  return (
    <DashboardLayout>
      <div className="flex gap-6">
        {/* Main Feed */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-foreground">Community</h1>
            <p className="text-muted-foreground">Connect with fellow students and alumni</p>
          </div>

          {/* Create Post */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-navy rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-semibold text-sm">AT</span>
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Share something with your community..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full p-3 bg-muted rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder-muted-foreground"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground">
                      <Image className="w-5 h-5" />
                    </button>
                  </div>
                  <Button variant="gold" size="sm" onClick={handlePost}>
                    <Send className="w-4 h-4" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {postsState.map((post) => (
              <div key={post.id} className="bg-card rounded-xl border border-border p-5">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{post.author.name}</h4>
                      <p className="text-xs text-muted-foreground">{post.author.program} • {post.timestamp}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-muted rounded-lg">
                    <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Post Content */}
                <p className="text-foreground mb-4">{post.content}</p>

                {/* Post Image */}
                {post.image && (
                  <div className="rounded-lg overflow-hidden mb-4">
                    <img 
                      src={post.image} 
                      alt="Post"
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-border">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-2 ${
                      post.liked ? 'text-destructive' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-80 space-y-6">
          {/* Group Chats */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Your Groups</h3>
            <div className="space-y-3">
              {groupChats.map((group) => (
                <div 
                  key={group.id}
                  className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer"
                >
                  <img 
                    src={group.avatar}
                    alt={group.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm truncate">{group.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{group.lastMessage}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{group.members}</span>
                </div>
              ))}
            </div>
            <Button variant="navyOutline" size="sm" className="w-full mt-4">
              <Users className="w-4 h-4" />
              Browse All Groups
            </Button>
          </div>

          {/* Trending Topics */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Trending Topics</h3>
            <div className="space-y-2">
              {['#PlacementSeason', '#IoTProjects', '#StudyGroup', '#Hackathon2026', '#CareerTips'].map((tag) => (
                <span 
                  key={tag}
                  className="inline-block px-3 py-1 bg-muted rounded-full text-sm text-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Community;
