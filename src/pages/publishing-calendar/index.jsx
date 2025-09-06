import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import PostPreviewModal from './components/PostPreviewModal';
import BulkSchedulingPanel from './components/BulkSchedulingPanel';
import OptimalTimingPanel from './components/OptimalTimingPanel';

const PublishingCalendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedAccount, setSelectedAccount] = useState('main-brand');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isBulkPanelOpen, setIsBulkPanelOpen] = useState(false);
  const [isTimingPanelOpen, setIsTimingPanelOpen] = useState(false);

  // Mock data
  const accounts = [
    { value: 'main-brand', label: 'Main Brand', description: '5 platforms connected' },
    { value: 'client-a', label: 'Client A Marketing', description: '3 platforms connected' },
    { value: 'client-b', label: 'Client B Corp', description: '4 platforms connected' },
    { value: 'personal', label: 'Personal Account', description: '2 platforms connected' }
  ];

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: 'Facebook', color: '#1877F2' },
    { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: '#E4405F' },
    { id: 'twitter', name: 'Twitter', icon: 'Twitter', color: '#1DA1F2' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin', color: '#0A66C2' },
    { id: 'tiktok', name: 'TikTok', icon: 'Music', color: '#000000' },
    { id: 'youtube', name: 'YouTube', icon: 'Youtube', color: '#FF0000' }
  ];

  const mockPosts = [
    {
      id: 1,
      content: "Exciting news! We\'re launching our new AI-powered social media management features. Stay tuned for more updates! 🚀",
      platforms: ['facebook', 'instagram', 'twitter'],
      scheduledTime: new Date(2025, 8, 8, 9, 0)?.toISOString(),
      status: 'scheduled',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400', alt: 'AI Technology' }
      ],
      hashtags: ['AI', 'SocialMedia', 'Innovation', 'Technology'],
      predictions: { reach: '3.2K', engagement: '245', timeScore: '92%' }
    },
    {
      id: 2,
      content: "Tips for creating engaging social media content:\n1. Know your audience\n2. Use high-quality visuals\n3. Post consistently\n4. Engage with your community",
      platforms: ['linkedin', 'twitter'],
      scheduledTime: new Date(2025, 8, 9, 14, 30)?.toISOString(),
      status: 'scheduled',
      hashtags: ['SocialMediaTips', 'ContentMarketing', 'DigitalMarketing'],
      predictions: { reach: '1.8K', engagement: '156', timeScore: '88%' }
    },
    {
      id: 3,
      content: "Behind the scenes: Our team working hard to bring you the best social media management experience! 💪",
      platforms: ['instagram', 'facebook'],
      scheduledTime: new Date(2025, 8, 10, 11, 15)?.toISOString(),
      status: 'draft',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400', alt: 'Team Working' }
      ],
      hashtags: ['BehindTheScenes', 'TeamWork', 'Company'],
      predictions: { reach: '2.1K', engagement: '189', timeScore: '85%' }
    },
    {
      id: 4,
      content: "Customer success story: How @ClientName increased their social media engagement by 300% using our platform! 📈",
      platforms: ['linkedin', 'twitter', 'facebook'],
      scheduledTime: new Date(2025, 8, 5, 16, 0)?.toISOString(),
      status: 'published',
      hashtags: ['CustomerSuccess', 'Results', 'SocialMediaGrowth'],
      analytics: { reach: '4.1K', engagement: '312', clickRate: '4.2%' }
    },
    {
      id: 5,
      content: "Weekend vibes! What\'s your favorite way to unwind after a productive week? Share in the comments! 🌟",
      platforms: ['instagram', 'facebook'],
      scheduledTime: new Date(2025, 8, 6, 18, 0)?.toISOString(),
      status: 'failed',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', alt: 'Weekend Relaxation' }
      ],
      hashtags: ['Weekend', 'Relaxation', 'Community'],
      predictions: { reach: '1.5K', engagement: '98', timeScore: '76%' }
    },
    {
      id: 6,
      content: "New blog post: \'The Future of AI in Social Media Marketing\' - Link in bio! 📚",
      platforms: ['linkedin', 'twitter'],
      scheduledTime: new Date(2025, 8, 12, 10, 0)?.toISOString(),
      status: 'scheduled',
      hashtags: ['BlogPost', 'AI', 'Marketing', 'FutureTech'],
      predictions: { reach: '2.3K', engagement: '167', timeScore: '90%' }
    }
  ];

  const [posts, setPosts] = useState(mockPosts);

  // Navigation handlers
  const handleNavigate = (direction) => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'month') {
      if (direction === 'prev') {
        newDate?.setMonth(newDate?.getMonth() - 1);
      } else if (direction === 'next') {
        newDate?.setMonth(newDate?.getMonth() + 1);
      } else if (direction === 'today') {
        setCurrentDate(new Date());
        return;
      }
    } else if (viewMode === 'week') {
      if (direction === 'prev') {
        newDate?.setDate(newDate?.getDate() - 7);
      } else if (direction === 'next') {
        newDate?.setDate(newDate?.getDate() + 7);
      } else if (direction === 'today') {
        setCurrentDate(new Date());
        return;
      }
    } else if (viewMode === 'day') {
      if (direction === 'prev') {
        newDate?.setDate(newDate?.getDate() - 1);
      } else if (direction === 'next') {
        newDate?.setDate(newDate?.getDate() + 1);
      } else if (direction === 'today') {
        setCurrentDate(new Date());
        return;
      }
    }
    
    setCurrentDate(newDate);
  };

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev => 
      prev?.includes(platformId)
        ? prev?.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const handlePostSave = (updatedPost) => {
    setPosts(prev => prev?.map(post => 
      post?.id === updatedPost?.id ? updatedPost : post
    ));
    setIsPostModalOpen(false);
  };

  const handlePostDelete = (postId) => {
    setPosts(prev => prev?.filter(post => post?.id !== postId));
    setIsPostModalOpen(false);
  };

  const handlePostDrop = (post, newDate) => {
    const updatedPost = {
      ...post,
      scheduledTime: newDate?.toISOString()
    };
    setPosts(prev => prev?.map(p => p?.id === post?.id ? updatedPost : p));
  };

  const handleDateClick = (date) => {
    // Navigate to content creation with pre-filled date
    navigate('/content-creation', { 
      state: { 
        scheduledDate: date?.toISOString(),
        account: selectedAccount 
      } 
    });
  };

  const handleBulkSchedule = (bulkData) => {
    console.log('Bulk scheduling:', bulkData);
    // Process bulk scheduling data and create posts
    // This would typically involve API calls to create multiple posts
  };

  const handleOptimalTiming = (timingData) => {
    console.log('Applying optimal timing:', timingData);
    // Apply optimal timing recommendations to existing or new posts
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 'k':
            e?.preventDefault();
            // Quick action handled by QuickActionButton
            break;
          case 'n':
            e?.preventDefault();
            navigate('/content-creation');
            break;
          case 'b':
            e?.preventDefault();
            setIsBulkPanelOpen(true);
            break;
          default:
            break;
        }
      }
      
      // Arrow key navigation
      if (!e?.ctrlKey && !e?.metaKey) {
        switch (e?.key) {
          case 'ArrowLeft':
            e?.preventDefault();
            handleNavigate('prev');
            break;
          case 'ArrowRight':
            e?.preventDefault();
            handleNavigate('next');
            break;
          case 't':
            e?.preventDefault();
            handleNavigate('today');
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentDate, viewMode]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-full mx-auto">
          <CalendarHeader
            currentDate={currentDate}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onNavigate={handleNavigate}
            selectedAccount={selectedAccount}
            onAccountChange={setSelectedAccount}
            accounts={accounts}
            selectedPlatforms={selectedPlatforms}
            onPlatformToggle={handlePlatformToggle}
            platforms={platforms}
          />
          
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <CalendarGrid
                viewMode={viewMode}
                currentDate={currentDate}
                posts={posts}
                onPostClick={handlePostClick}
                onPostDrop={handlePostDrop}
                onDateClick={handleDateClick}
                selectedPlatforms={selectedPlatforms}
              />
              
              {/* Side Panel - Quick Actions */}
              <div className="w-full lg:w-80 space-y-4">
                <div className="bg-surface rounded-lg border border-border p-4">
                  <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => navigate('/content-creation')}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted rounded-lg transition-smooth"
                    >
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">+</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Create Post</p>
                        <p className="text-xs text-text-secondary">AI-powered content creation</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setIsBulkPanelOpen(true)}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted rounded-lg transition-smooth"
                    >
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">⬆</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Bulk Upload</p>
                        <p className="text-xs text-text-secondary">Schedule multiple posts</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setIsTimingPanelOpen(true)}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted rounded-lg transition-smooth"
                    >
                      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">⚡</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Optimal Timing</p>
                        <p className="text-xs text-text-secondary">AI-powered recommendations</p>
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* Content Status Overview */}
                <div className="bg-surface rounded-lg border border-border p-4">
                  <h3 className="font-semibold text-foreground mb-4">Content Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm text-foreground">Scheduled</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {posts?.filter(p => p?.status === 'scheduled')?.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                        <span className="text-sm text-foreground">Published</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {posts?.filter(p => p?.status === 'published')?.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                        <span className="text-sm text-foreground">Draft</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {posts?.filter(p => p?.status === 'draft')?.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-error rounded-full"></div>
                        <span className="text-sm text-foreground">Failed</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {posts?.filter(p => p?.status === 'failed')?.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <PostPreviewModal
        post={selectedPost}
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSave={handlePostSave}
        onDelete={handlePostDelete}
      />
      <BulkSchedulingPanel
        isOpen={isBulkPanelOpen}
        onClose={() => setIsBulkPanelOpen(false)}
        onBulkSchedule={handleBulkSchedule}
      />
      <OptimalTimingPanel
        isOpen={isTimingPanelOpen}
        onClose={() => setIsTimingPanelOpen(false)}
        onApplyTiming={handleOptimalTiming}
      />
      <QuickActionButton />
    </div>
  );
};

export default PublishingCalendar;