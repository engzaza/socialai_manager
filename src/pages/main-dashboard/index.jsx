import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import MetricCard from './components/MetricCard';
import CalendarWidget from './components/CalendarWidget';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import AnalyticsChart from './components/AnalyticsChart';
import AccountSwitcher from './components/AccountSwitcher';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const performanceMetrics = [
    {
      title: "Total Followers",
      value: "138.2K",
      change: "+12.5%",
      changeType: "positive",
      icon: "Users",
      color: "bg-primary",
      description: "Across all platforms"
    },
    {
      title: "Engagement Rate",
      value: "5.8%",
      change: "+0.8%",
      changeType: "positive",
      icon: "Heart",
      color: "bg-secondary",
      description: "Average this month"
    },
    {
      title: "Post Reach",
      value: "245.7K",
      change: "+18.2%",
      changeType: "positive",
      icon: "Eye",
      color: "bg-accent",
      description: "Last 30 days"
    },
    {
      title: "New Leads",
      value: "89",
      change: "+24",
      changeType: "positive",
      icon: "Target",
      color: "bg-warning",
      description: "This week"
    }
  ];

  const urgentNotifications = [
    {
      id: 1,
      type: 'error',
      message: 'Facebook token expires in 2 days',
      action: () => navigate('/social-media-accounts')
    },
    {
      id: 2,
      type: 'warning',
      message: '5 posts pending approval',
      action: () => navigate('/publishing-calendar')
    },
    {
      id: 3,
      type: 'info',
      message: 'New lead from LinkedIn campaign',
      action: () => navigate('/lead-generation')
    }
  ];

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {getGreeting()}, Welcome back! 👋
                </h1>
                <p className="text-text-secondary">
                  {formatDate(currentTime)} • Here's what's happening with your social media accounts
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => window.location?.reload()}
                >
                  Refresh Data
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/content-creation')}
                >
                  Create Content
                </Button>
              </div>
            </div>
          </div>

          {/* Urgent Notifications */}
          {urgentNotifications?.length > 0 && (
            <div className="mb-8">
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-2">Attention Required</h3>
                    <div className="space-y-2">
                      {urgentNotifications?.map((notification) => (
                        <button
                          key={notification?.id}
                          onClick={notification?.action}
                          className="block text-sm text-text-secondary hover:text-foreground transition-smooth"
                        >
                          • {notification?.message}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => {/* Handle dismiss */}}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {performanceMetrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
                description={metric?.description}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Calendar & Analytics */}
            <div className="lg:col-span-2 space-y-8">
              <CalendarWidget />
              <AnalyticsChart />
            </div>

            {/* Right Column - Activity & Quick Actions */}
            <div className="space-y-8">
              <AccountSwitcher />
              <ActivityFeed />
              <QuickActions />
            </div>
          </div>

          {/* Bottom Section - Additional Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Recommendations */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Lightbulb" size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Recommendations</h3>
                  <p className="text-sm text-text-secondary">Optimize your strategy</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-foreground font-medium">Best posting time</p>
                  <p className="text-xs text-text-secondary">Tuesday 2:00 PM shows 23% higher engagement</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-foreground font-medium">Content suggestion</p>
                  <p className="text-xs text-text-secondary">Behind-the-scenes content performs well</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-foreground font-medium">Hashtag optimization</p>
                  <p className="text-xs text-text-secondary">Use 5-7 hashtags for better reach</p>
                </div>
              </div>
            </div>

            {/* Recent Performance */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Top Performing</h3>
                  <p className="text-sm text-text-secondary">Last 7 days</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">Product Launch Post</p>
                    <p className="text-xs text-text-secondary">Instagram • 2 days ago</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-success">+245%</p>
                    <p className="text-xs text-text-secondary">engagement</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">Weekly Tips Video</p>
                    <p className="text-xs text-text-secondary">LinkedIn • 4 days ago</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-success">+189%</p>
                    <p className="text-xs text-text-secondary">reach</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">System Status</h3>
                  <p className="text-sm text-text-secondary">All systems operational</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">API Connections</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-success">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Content Generation</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-success">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Scheduled Posts</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-success">Running</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Chatbots</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm text-warning">3 Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <QuickActionButton />
    </div>
  );
};

export default MainDashboard;