import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const upcomingPosts = [
    {
      id: 1,
      title: "New Product Launch Announcement",
      platform: "Instagram",
      scheduledTime: "2025-01-06 10:00",
      status: "scheduled",
      engagement: "High priority",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      title: "Weekly Tips: Social Media Growth",
      platform: "LinkedIn",
      scheduledTime: "2025-01-06 14:30",
      status: "draft",
      engagement: "Medium priority",
      thumbnail: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      title: "Customer Success Story Feature",
      platform: "Facebook",
      scheduledTime: "2025-01-07 09:15",
      status: "scheduled",
      engagement: "High priority",
      thumbnail: "https://images.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      title: "Behind the Scenes Video",
      platform: "TikTok",
      scheduledTime: "2025-01-07 16:00",
      status: "pending_approval",
      engagement: "Medium priority",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop"
    }
  ];

  const getPlatformIcon = (platform) => {
    const icons = {
      Instagram: 'Instagram',
      LinkedIn: 'Linkedin',
      Facebook: 'Facebook',
      TikTok: 'Music',
      Twitter: 'Twitter',
      YouTube: 'Youtube'
    };
    return icons?.[platform] || 'Globe';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-success text-success-foreground';
      case 'draft': return 'bg-warning text-warning-foreground';
      case 'pending_approval': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled': return 'Scheduled';
      case 'draft': return 'Draft';
      case 'pending_approval': return 'Pending';
      default: return 'Unknown';
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Content Calendar</h3>
            <p className="text-sm text-text-secondary">Upcoming scheduled posts</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/publishing-calendar')}
          >
            View Full Calendar
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {upcomingPosts?.map((post) => {
            const { date, time } = formatDateTime(post?.scheduledTime);
            return (
              <div
                key={post?.id}
                className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
                onClick={() => navigate('/publishing-calendar')}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={post?.thumbnail}
                    alt={post?.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{post?.title}</h4>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center space-x-1">
                      <Icon name={getPlatformIcon(post?.platform)} size={14} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary">{post?.platform}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary">{date} at {time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post?.status)}`}>
                    {getStatusText(post?.status)}
                  </span>
                  <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/content-creation')}
              >
                Create Post
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => navigate('/publishing-calendar')}
              >
                Schedule
              </Button>
            </div>
            <p className="text-xs text-text-secondary">
              {upcomingPosts?.length} posts scheduled this week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;