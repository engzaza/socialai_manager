import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'comment',
      platform: 'Instagram',
      user: 'sarah_marketing',
      content: "Love this new product! When will it be available in stores?",
      post: "New Product Launch Announcement",
      timestamp: new Date(Date.now() - 300000),
      priority: 'high',
      unread: true,
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      type: 'message',
      platform: 'Facebook',
      user: 'John Peterson',
      content: "Hi, I'm interested in your services. Can you provide more information about pricing?",
      timestamp: new Date(Date.now() - 900000),
      priority: 'high',
      unread: true,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      type: 'mention',
      platform: 'Twitter',
      user: '@techreview_blog',
      content: "Great insights from @socialamanager on social media automation trends!",
      timestamp: new Date(Date.now() - 1800000),
      priority: 'medium',
      unread: false,
      avatar: "https://randomuser.me/api/portraits/men/23.jpg"
    },
    {
      id: 4,
      type: 'lead',
      platform: 'LinkedIn',
      user: 'Maria Rodriguez',
      content: "Downloaded your social media guide. Interested in discussing automation solutions for our agency.",
      timestamp: new Date(Date.now() - 3600000),
      priority: 'high',
      unread: true,
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      id: 5,
      type: 'comment',
      platform: 'YouTube',
      user: 'CreativeStudio2024',
      content: "This tutorial was exactly what I needed! Thank you for the detailed explanation.",
      post: "AI Content Creation Tutorial",
      timestamp: new Date(Date.now() - 7200000),
      priority: 'low',
      unread: false,
      avatar: "https://randomuser.me/api/portraits/women/19.jpg"
    },
    {
      id: 6,
      type: 'message',
      platform: 'WhatsApp',
      user: 'David Chen',
      content: "Can you help me set up automated responses for my business WhatsApp?",
      timestamp: new Date(Date.now() - 10800000),
      priority: 'medium',
      unread: true,
      avatar: "https://randomuser.me/api/portraits/men/34.jpg"
    }
  ];

  const filters = [
    { value: 'all', label: 'All Activity', count: activities?.length },
    { value: 'unread', label: 'Unread', count: activities?.filter(a => a?.unread)?.length },
    { value: 'high', label: 'High Priority', count: activities?.filter(a => a?.priority === 'high')?.length },
    { value: 'messages', label: 'Messages', count: activities?.filter(a => a?.type === 'message')?.length }
  ];

  const filteredActivities = activities?.filter(activity => {
    switch (filter) {
      case 'unread': return activity?.unread;
      case 'high': return activity?.priority === 'high';
      case 'messages': return activity?.type === 'message';
      default: return true;
    }
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case 'comment': return 'MessageCircle';
      case 'message': return 'Mail';
      case 'mention': return 'AtSign';
      case 'lead': return 'Target';
      default: return 'Bell';
    }
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      Instagram: 'Instagram',
      Facebook: 'Facebook',
      Twitter: 'Twitter',
      LinkedIn: 'Linkedin',
      YouTube: 'Youtube',
      WhatsApp: 'MessageSquare'
    };
    return icons?.[platform] || 'Globe';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const handleActivityClick = (activity) => {
    if (activity?.type === 'lead') {
      navigate('/lead-generation');
    } else if (activity?.type === 'message') {
      navigate('/ai-chatbot-builder');
    } else {
      navigate('/social-media-accounts');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <p className="text-sm text-text-secondary">Comments, messages, and mentions</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            onClick={() => navigate('/social-media-accounts')}
          >
            Manage
          </Button>
        </div>

        <div className="flex space-x-1">
          {filters?.map((filterOption) => (
            <button
              key={filterOption?.value}
              onClick={() => setFilter(filterOption?.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                filter === filterOption?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-foreground hover:bg-muted'
              }`}
            >
              {filterOption?.label}
              {filterOption?.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  filter === filterOption?.value
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-text-secondary'
                }`}>
                  {filterOption?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredActivities?.map((activity) => (
              <div
                key={activity?.id}
                onClick={() => handleActivityClick(activity)}
                className={`p-4 hover:bg-muted/30 transition-smooth cursor-pointer ${
                  activity?.unread ? 'bg-muted/20' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={activity?.avatar}
                      alt={activity?.user}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-card border-2 border-card rounded-full flex items-center justify-center">
                      <Icon name={getActivityIcon(activity?.type)} size={12} className="text-text-secondary" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-foreground">{activity?.user}</p>
                      <Icon name={getPlatformIcon(activity?.platform)} size={14} className="text-text-secondary" />
                      <span className="text-xs text-text-secondary">{activity?.platform}</span>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(activity?.priority)}`}></div>
                    </div>
                    
                    <p className="text-sm text-text-secondary line-clamp-2 mb-2">{activity?.content}</p>
                    
                    {activity?.post && (
                      <p className="text-xs text-text-secondary bg-muted px-2 py-1 rounded inline-block mb-2">
                        Re: {activity?.post}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">{formatTimestamp(activity?.timestamp)}</span>
                      {activity?.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Inbox" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No activities found for the selected filter</p>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-secondary">
            {filteredActivities?.filter(a => a?.unread)?.length} unread items
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/social-media-accounts')}
          >
            View All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;