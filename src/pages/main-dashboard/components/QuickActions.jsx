import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'create-content',
      title: 'Create Content',
      description: 'AI-powered post generation',
      icon: 'PenTool',
      color: 'bg-primary',
      action: () => navigate('/content-creation'),
      stats: '12 posts this week'
    },
    {
      id: 'schedule-posts',
      title: 'Schedule Posts',
      description: 'Plan your content calendar',
      icon: 'Calendar',
      color: 'bg-secondary',
      action: () => navigate('/publishing-calendar'),
      stats: '8 posts scheduled'
    },
    {
      id: 'generate-leads',
      title: 'Generate Leads',
      description: 'AI-powered lead campaigns',
      icon: 'Target',
      color: 'bg-accent',
      action: () => navigate('/lead-generation'),
      stats: '24 new leads'
    },
    {
      id: 'build-chatbot',
      title: 'Build Chatbot',
      description: 'Automate customer service',
      icon: 'Bot',
      color: 'bg-warning',
      action: () => navigate('/ai-chatbot-builder'),
      stats: '3 active bots'
    }
  ];

  const recentTemplates = [
    {
      id: 1,
      name: 'Product Launch',
      type: 'Instagram Post',
      uses: 45,
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=60&h=60&fit=crop'
    },
    {
      id: 2,
      name: 'Weekly Tips',
      type: 'LinkedIn Article',
      uses: 32,
      thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=60&h=60&fit=crop'
    },
    {
      id: 3,
      name: 'Customer Story',
      type: 'Facebook Post',
      uses: 28,
      thumbnail: 'https://images.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg?w=60&h=60&fit=crop'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            <p className="text-sm text-text-secondary">Jump into your most used features</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth text-left"
            >
              <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={action?.icon} size={20} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{action?.title}</h4>
                <p className="text-sm text-text-secondary">{action?.description}</p>
                <p className="text-xs text-text-secondary mt-1">{action?.stats}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            </button>
          ))}
        </div>
      </div>
      {/* Recent Templates */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Templates</h3>
            <p className="text-sm text-text-secondary">Your most used content templates</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/content-creation')}
          >
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {recentTemplates?.map((template) => (
            <div
              key={template?.id}
              className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
              onClick={() => navigate('/content-creation')}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                <img
                  src={template?.thumbnail}
                  alt={template?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{template?.name}</h4>
                <p className="text-sm text-text-secondary">{template?.type}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{template?.uses}</p>
                <p className="text-xs text-text-secondary">uses</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* AI Assistant */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={20} color="white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">AI Content Assistant</h3>
            <p className="text-sm text-text-secondary mb-4">
              Let AI help you create engaging content for all your social media platforms. 
              Generate posts, captions, and hashtags in seconds.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="default"
                size="sm"
                iconName="Wand2"
                iconPosition="left"
                onClick={() => navigate('/content-creation')}
              >
                Generate Content
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/ai-chatbot-builder')}
              >
                Build Chatbot
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;