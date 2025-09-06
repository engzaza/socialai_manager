import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const PlatformSelector = ({ selectedPlatforms, onPlatformChange }) => {
  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-500',
      maxChars: 2200,
      features: ['text', 'image', 'video', 'hashtags']
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'Instagram',
      color: 'bg-pink-500',
      maxChars: 2200,
      features: ['text', 'image', 'video', 'hashtags', 'stories']
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: 'Twitter',
      color: 'bg-gray-900',
      maxChars: 280,
      features: ['text', 'image', 'video', 'hashtags']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-600',
      maxChars: 3000,
      features: ['text', 'image', 'video', 'hashtags']
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'Music',
      color: 'bg-black',
      maxChars: 150,
      features: ['video', 'hashtags']
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: 'Youtube',
      color: 'bg-red-500',
      maxChars: 5000,
      features: ['video', 'text', 'hashtags']
    }
  ];

  const handlePlatformToggle = (platformId) => {
    const updatedPlatforms = selectedPlatforms?.includes(platformId)
      ? selectedPlatforms?.filter(id => id !== platformId)
      : [...selectedPlatforms, platformId];
    onPlatformChange(updatedPlatforms);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Select Platforms</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms?.map((platform) => (
          <div
            key={platform?.id}
            className={`border-2 rounded-lg p-4 transition-all duration-200 ${
              selectedPlatforms?.includes(platform?.id)
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={selectedPlatforms?.includes(platform?.id)}
                onChange={() => handlePlatformToggle(platform?.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-8 h-8 ${platform?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={platform?.icon} size={16} color="white" />
                  </div>
                  <span className="font-medium text-foreground">{platform?.name}</span>
                </div>
                <p className="text-xs text-text-secondary mb-2">
                  Max {platform?.maxChars} characters
                </p>
                <div className="flex flex-wrap gap-1">
                  {platform?.features?.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector;