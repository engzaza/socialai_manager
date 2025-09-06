import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const OptimalTimingPanel = ({ isOpen, onClose, onApplyTiming }) => {
  const [selectedAccount, setSelectedAccount] = useState('main-brand');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [timeframe, setTimeframe] = useState('week');

  const accounts = [
    { value: 'main-brand', label: 'Main Brand' },
    { value: 'client-a', label: 'Client A Marketing' },
    { value: 'client-b', label: 'Client B Corp' }
  ];

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' }
  ];

  const timeframeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  // Mock optimal timing data
  const optimalTimes = {
    facebook: [
      { day: 'Monday', time: '09:00', score: 92, engagement: '2.4K' },
      { day: 'Monday', time: '15:00', score: 88, engagement: '2.1K' },
      { day: 'Tuesday', time: '10:00', score: 85, engagement: '1.9K' },
      { day: 'Wednesday', time: '14:00', score: 90, engagement: '2.3K' },
      { day: 'Thursday', time: '11:00', score: 87, engagement: '2.0K' },
      { day: 'Friday', time: '16:00', score: 83, engagement: '1.8K' }
    ],
    instagram: [
      { day: 'Monday', time: '11:00', score: 94, engagement: '3.2K' },
      { day: 'Tuesday', time: '14:00', score: 91, engagement: '2.9K' },
      { day: 'Wednesday', time: '10:00', score: 89, engagement: '2.7K' },
      { day: 'Thursday', time: '15:00', score: 92, engagement: '3.0K' },
      { day: 'Friday', time: '12:00', score: 86, engagement: '2.5K' },
      { day: 'Saturday', time: '13:00', score: 88, engagement: '2.6K' }
    ],
    twitter: [
      { day: 'Monday', time: '08:00', score: 89, engagement: '1.5K' },
      { day: 'Tuesday', time: '12:00', score: 91, engagement: '1.7K' },
      { day: 'Wednesday', time: '17:00', score: 87, engagement: '1.4K' },
      { day: 'Thursday', time: '09:00', score: 93, engagement: '1.8K' },
      { day: 'Friday', time: '14:00', score: 85, engagement: '1.3K' }
    ],
    linkedin: [
      { day: 'Tuesday', time: '09:00', score: 95, engagement: '890' },
      { day: 'Wednesday', time: '10:00', score: 92, engagement: '820' },
      { day: 'Thursday', time: '08:00', score: 90, engagement: '780' },
      { day: 'Friday', time: '11:00', score: 88, engagement: '750' }
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 80) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getCurrentData = () => {
    if (selectedPlatform === 'all') {
      // Combine all platforms
      const allTimes = [];
      Object.entries(optimalTimes)?.forEach(([platform, times]) => {
        times?.forEach(time => {
          allTimes?.push({ ...time, platform });
        });
      });
      return allTimes?.sort((a, b) => b?.score - a?.score)?.slice(0, 10);
    }
    return optimalTimes?.[selectedPlatform] || [];
  };

  const handleApplyTiming = () => {
    const timingData = {
      account: selectedAccount,
      platform: selectedPlatform,
      timeframe: timeframe,
      optimalTimes: getCurrentData()
    };
    onApplyTiming(timingData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300 p-4">
      <div className="bg-surface rounded-lg border border-border shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">AI-Powered Optimal Timing</h2>
            <p className="text-text-secondary mt-1">Discover the best times to post based on your audience analytics</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Account"
              options={accounts}
              value={selectedAccount}
              onChange={setSelectedAccount}
            />
            <Select
              label="Platform"
              options={platforms}
              value={selectedPlatform}
              onChange={setSelectedPlatform}
            />
            <Select
              label="Timeframe"
              options={timeframeOptions}
              value={timeframe}
              onChange={setTimeframe}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Optimal Times List */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Recommended Posting Times</h3>
              <div className="space-y-3">
                {getCurrentData()?.map((time, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg hover:shadow-soft transition-smooth">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-medium text-foreground">{time?.day}</div>
                        <div className="text-sm text-text-secondary">{time?.time}</div>
                      </div>
                      {selectedPlatform === 'all' && (
                        <div className="flex items-center space-x-2">
                          <Icon name="Globe" size={16} className="text-text-secondary" />
                          <span className="text-sm text-text-secondary capitalize">{time?.platform}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium text-foreground">{time?.engagement}</div>
                        <div className="text-xs text-text-secondary">Avg. Engagement</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(time?.score)}`}>
                        {time?.score}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights & Recommendations */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">AI Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="TrendingUp" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Peak Engagement Window</h4>
                      <p className="text-sm text-text-secondary mt-1">
                        Your audience is most active between 9 AM - 3 PM on weekdays. 
                        Consider scheduling important announcements during this window.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Users" size={20} className="text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Audience Behavior</h4>
                      <p className="text-sm text-text-secondary mt-1">
                        Your followers show 23% higher engagement on visual content 
                        posted during lunch hours (12-1 PM).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Calendar" size={20} className="text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Weekly Pattern</h4>
                      <p className="text-sm text-text-secondary mt-1">
                        Tuesday and Thursday posts receive 18% more engagement 
                        compared to other weekdays.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Zap" size={20} className="text-secondary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Quick Tip</h4>
                      <p className="text-sm text-text-secondary mt-1">
                        Avoid posting during 6-8 PM as your audience engagement 
                        drops by 35% during dinner hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-Schedule Options */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-3">Auto-Schedule Options</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Calendar"
                    iconPosition="left"
                    size="sm"
                  >
                    Apply to Next 7 Days
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Repeat"
                    iconPosition="left"
                    size="sm"
                  >
                    Set as Default Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Based on {timeframe === 'week' ? '7 days' : timeframe === 'month' ? '30 days' : '90 days'} of audience data
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="default"
              onClick={handleApplyTiming}
              iconName="Check"
              iconPosition="left"
            >
              Apply Recommendations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimalTimingPanel;