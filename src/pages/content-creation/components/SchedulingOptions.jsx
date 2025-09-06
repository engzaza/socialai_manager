import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SchedulingOptions = ({ onSchedule, selectedPlatforms }) => {
  const [schedulingType, setSchedulingType] = useState('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [timezone, setTimezone] = useState('America/New_York');
  const [isScheduling, setIsScheduling] = useState(false);

  const schedulingOptions = [
    { value: 'now', label: 'Publish Now' },
    { value: 'scheduled', label: 'Schedule for Later' },
    { value: 'optimal', label: 'AI Optimal Time' }
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' }
  ];

  const optimalTimes = [
    { platform: 'Facebook', time: '1:00 PM - 3:00 PM', reason: 'Peak engagement hours' },
    { platform: 'Instagram', time: '11:00 AM - 1:00 PM', reason: 'Lunch break scrolling' },
    { platform: 'Twitter', time: '9:00 AM - 10:00 AM', reason: 'Morning commute' },
    { platform: 'LinkedIn', time: '8:00 AM - 10:00 AM', reason: 'Business hours start' },
    { platform: 'TikTok', time: '6:00 PM - 10:00 PM', reason: 'Evening entertainment' },
    { platform: 'YouTube', time: '2:00 PM - 4:00 PM', reason: 'Afternoon break time' }
  ];

  const handleSchedule = async () => {
    setIsScheduling(true);
    
    const scheduleData = {
      type: schedulingType,
      date: scheduledDate,
      time: scheduledTime,
      timezone: timezone,
      platforms: selectedPlatforms
    };

    // Simulate scheduling delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSchedule(scheduleData);
    setIsScheduling(false);
  };

  const getMinDateTime = () => {
    const now = new Date();
    now?.setMinutes(now?.getMinutes() + 5); // Minimum 5 minutes from now
    return now?.toISOString()?.slice(0, 16);
  };

  const isValidSchedule = () => {
    if (schedulingType === 'now' || schedulingType === 'optimal') return true;
    if (schedulingType === 'scheduled') {
      return scheduledDate && scheduledTime;
    }
    return false;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Clock" size={20} className="text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Publishing Schedule</h3>
      </div>
      <div className="space-y-4">
        <Select
          label="When to Publish"
          options={schedulingOptions}
          value={schedulingType}
          onChange={setSchedulingType}
        />

        {schedulingType === 'scheduled' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e?.target?.value)}
              min={new Date()?.toISOString()?.split('T')?.[0]}
            />
            <Input
              label="Time"
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e?.target?.value)}
            />
          </div>
        )}

        {(schedulingType === 'scheduled' || schedulingType === 'optimal') && (
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={timezone}
            onChange={setTimezone}
          />
        )}

        {schedulingType === 'optimal' && selectedPlatforms?.length > 0 && (
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-accent" />
              <span>AI Recommended Times</span>
            </h4>
            <div className="space-y-2">
              {selectedPlatforms?.map(platformId => {
                const optimal = optimalTimes?.find(t => t?.platform?.toLowerCase()?.includes(platformId));
                if (!optimal) return null;
                
                return (
                  <div key={platformId} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{optimal?.platform}</span>
                    <div className="text-right">
                      <p className="text-accent font-medium">{optimal?.time}</p>
                      <p className="text-text-secondary text-xs">{optimal?.reason}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedPlatforms?.length === 0 && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <p className="text-sm text-warning">Select platforms to enable publishing</p>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <Button
            onClick={handleSchedule}
            disabled={!isValidSchedule() || selectedPlatforms?.length === 0 || isScheduling}
            loading={isScheduling}
            iconName={schedulingType === 'now' ? 'Send' : 'Calendar'}
            iconPosition="left"
            className="flex-1"
          >
            {isScheduling 
              ? 'Processing...' 
              : schedulingType === 'now' ?'Publish Now' 
                : schedulingType === 'optimal' ?'Schedule at Optimal Times' :'Schedule Post'
            }
          </Button>
          
          <Button
            variant="outline"
            iconName="Save"
            iconPosition="left"
          >
            Save Draft
          </Button>
        </div>

        {schedulingType === 'scheduled' && scheduledDate && scheduledTime && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Info" size={14} className="text-secondary" />
              <span className="text-foreground">
                Will be published on {new Date(`${scheduledDate}T${scheduledTime}`)?.toLocaleDateString()} 
                at {new Date(`${scheduledDate}T${scheduledTime}`)?.toLocaleTimeString()} ({timezone})
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulingOptions;