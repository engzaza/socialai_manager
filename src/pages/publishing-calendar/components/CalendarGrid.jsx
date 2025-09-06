import React from 'react';
import Icon from '../../../components/AppIcon';


const CalendarGrid = ({ 
  viewMode, 
  currentDate, 
  posts, 
  onPostClick, 
  onPostDrop, 
  onDateClick,
  selectedPlatforms 
}) => {
  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    let day = startOfWeek?.getDay();
    const diff = startOfWeek?.getDate() - day;
    startOfWeek?.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      days?.push(day);
    }
    return days;
  };

  const getPostsForDate = (date) => {
    if (!date) return [];
    const dateStr = date?.toDateString();
    return posts?.filter(post => {
      const postDate = new Date(post.scheduledTime);
      return postDate?.toDateString() === dateStr && 
             (selectedPlatforms?.length === 0 || post?.platforms?.some(p => selectedPlatforms?.includes(p)));
    });
  };

  const getPlatformIcon = (platformId) => {
    const platformIcons = {
      'facebook': 'Facebook',
      'instagram': 'Instagram',
      'twitter': 'Twitter',
      'linkedin': 'Linkedin',
      'tiktok': 'Music',
      'youtube': 'Youtube'
    };
    return platformIcons?.[platformId] || 'Globe';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-primary';
      case 'published': return 'bg-success';
      case 'failed': return 'bg-error';
      case 'draft': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const handleDragStart = (e, post) => {
    e?.dataTransfer?.setData('text/plain', JSON.stringify(post));
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
  };

  const handleDrop = (e, date) => {
    e?.preventDefault();
    const postData = JSON.parse(e?.dataTransfer?.getData('text/plain'));
    onPostDrop(postData, date);
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        {/* Week day headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {weekDays?.map((day) => (
            <div key={day} className="p-4 text-center font-medium text-text-secondary bg-muted">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days?.map((date, index) => {
            const dayPosts = getPostsForDate(date);
            const isToday = date && date?.toDateString() === new Date()?.toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-32 border-r border-b border-border p-2 ${
                  date ? 'hover:bg-muted/50 cursor-pointer' : 'bg-muted/20'
                } ${isToday ? 'bg-primary/5' : ''}`}
                onClick={() => date && onDateClick(date)}
                onDragOver={handleDragOver}
                onDrop={(e) => date && handleDrop(e, date)}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-2 ${
                      isToday ? 'text-primary' : 'text-foreground'
                    }`}>
                      {date?.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayPosts?.slice(0, 3)?.map((post) => (
                        <div
                          key={post?.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, post)}
                          onClick={(e) => {
                            e?.stopPropagation();
                            onPostClick(post);
                          }}
                          className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${getStatusColor(post?.status)} text-white`}
                        >
                          <div className="flex items-center space-x-1">
                            <Icon name={getPlatformIcon(post?.platforms?.[0])} size={10} />
                            <span className="truncate">{post?.content?.substring(0, 20)}...</span>
                          </div>
                        </div>
                      ))}
                      {dayPosts?.length > 3 && (
                        <div className="text-xs text-text-secondary">
                          +{dayPosts?.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const days = getWeekDays(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-8 border-b border-border">
          <div className="p-4 bg-muted"></div>
          {days?.map((date) => {
            const isToday = date?.toDateString() === new Date()?.toDateString();
            return (
              <div key={date?.toISOString()} className={`p-4 text-center ${isToday ? 'bg-primary/10' : 'bg-muted'}`}>
                <div className={`font-medium ${isToday ? 'text-primary' : 'text-foreground'}`}>
                  {date?.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-sm ${isToday ? 'text-primary' : 'text-text-secondary'}`}>
                  {date?.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        {/* Time slots */}
        <div className="max-h-96 overflow-y-auto">
          {hours?.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-border">
              <div className="p-2 text-xs text-text-secondary bg-muted/50 border-r border-border">
                {hour?.toString()?.padStart(2, '0')}:00
              </div>
              {days?.map((date) => {
                const hourPosts = getPostsForDate(date)?.filter(post => {
                  const postHour = new Date(post.scheduledTime)?.getHours();
                  return postHour === hour;
                });
                
                return (
                  <div
                    key={`${date?.toISOString()}-${hour}`}
                    className="p-1 border-r border-border min-h-12 hover:bg-muted/50"
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      const dropDate = new Date(date);
                      dropDate?.setHours(hour, 0, 0, 0);
                      handleDrop(e, dropDate);
                    }}
                  >
                    {hourPosts?.map((post) => (
                      <div
                        key={post?.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, post)}
                        onClick={() => onPostClick(post)}
                        className={`text-xs p-1 rounded mb-1 cursor-pointer hover:opacity-80 ${getStatusColor(post?.status)} text-white`}
                      >
                        <div className="flex items-center space-x-1">
                          <Icon name={getPlatformIcon(post?.platforms?.[0])} size={10} />
                          <span className="truncate">{post?.content?.substring(0, 15)}...</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayPosts = getPostsForDate(currentDate);

    return (
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-muted">
          <h3 className="font-semibold text-foreground">
            {currentDate?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <p className="text-sm text-text-secondary">{dayPosts?.length} posts scheduled</p>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {hours?.map((hour) => {
            const hourPosts = dayPosts?.filter(post => {
              const postHour = new Date(post.scheduledTime)?.getHours();
              return postHour === hour;
            });

            return (
              <div key={hour} className="flex border-b border-border">
                <div className="w-20 p-4 text-sm text-text-secondary bg-muted/50 border-r border-border">
                  {hour?.toString()?.padStart(2, '0')}:00
                </div>
                <div 
                  className="flex-1 p-4 min-h-16 hover:bg-muted/50"
                  onDragOver={handleDragOver}
                  onDrop={(e) => {
                    const dropDate = new Date(currentDate);
                    dropDate?.setHours(hour, 0, 0, 0);
                    handleDrop(e, dropDate);
                  }}
                >
                  <div className="space-y-2">
                    {hourPosts?.map((post) => (
                      <div
                        key={post?.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, post)}
                        onClick={() => onPostClick(post)}
                        className={`p-3 rounded-lg cursor-pointer hover:opacity-90 ${getStatusColor(post?.status)} text-white`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              {post?.platforms?.map((platform) => (
                                <Icon key={platform} name={getPlatformIcon(platform)} size={14} />
                              ))}
                            </div>
                            <span className="font-medium">
                              {new Date(post.scheduledTime)?.toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs opacity-80 capitalize">{post?.status}</span>
                            <Icon name="MoreHorizontal" size={14} />
                          </div>
                        </div>
                        <p className="text-sm mt-2 line-clamp-2">{post?.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1">
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}
    </div>
  );
};

export default CalendarGrid;