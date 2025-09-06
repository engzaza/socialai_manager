import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CalendarHeader = ({ 
  currentDate, 
  viewMode, 
  onViewModeChange, 
  onNavigate, 
  selectedAccount, 
  onAccountChange, 
  accounts,
  selectedPlatforms,
  onPlatformToggle,
  platforms 
}) => {
  const viewOptions = [
    { value: 'month', label: 'Month View' },
    { value: 'week', label: 'Week View' },
    { value: 'day', label: 'Day View' }
  ];

  const formatDateHeader = () => {
    const options = { 
      year: 'numeric', 
      month: 'long',
      ...(viewMode === 'day' && { day: 'numeric' })
    };
    return currentDate?.toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-surface border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Title and Navigation */}
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Publishing Calendar</h1>
            <p className="text-text-secondary mt-1">Schedule and manage your content across all platforms</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigate('prev')}
            >
              <Icon name="ChevronLeft" size={18} />
            </Button>
            
            <div className="min-w-48 text-center">
              <h2 className="text-lg font-semibold text-foreground">{formatDateHeader()}</h2>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigate('next')}
            >
              <Icon name="ChevronRight" size={18} />
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => onNavigate('today')}
              className="ml-2"
            >
              Today
            </Button>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Account Selector */}
          <Select
            options={accounts}
            value={selectedAccount}
            onChange={onAccountChange}
            placeholder="Select Account"
            className="min-w-48"
          />

          {/* Platform Filters */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary">Platforms:</span>
            <div className="flex space-x-1">
              {platforms?.map((platform) => (
                <Button
                  key={platform?.id}
                  variant={selectedPlatforms?.includes(platform?.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPlatformToggle(platform?.id)}
                  className="flex items-center space-x-1"
                >
                  <Icon name={platform?.icon} size={14} />
                  <span className="hidden sm:inline">{platform?.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* View Mode Selector */}
          <Select
            options={viewOptions}
            value={viewMode}
            onChange={onViewModeChange}
            className="min-w-32"
          />

          {/* Quick Actions */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              iconName="Upload"
              iconPosition="left"
              size="sm"
            >
              Bulk Upload
            </Button>
            
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              size="sm"
            >
              Create Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;