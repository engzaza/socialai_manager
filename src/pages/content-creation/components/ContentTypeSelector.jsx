import React from 'react';
import Icon from '../../../components/AppIcon';


const ContentTypeSelector = ({ selectedType, onTypeChange }) => {
  const contentTypes = [
    {
      id: 'post',
      label: 'Post',
      icon: 'FileText',
      description: 'Regular social media posts'
    },
    {
      id: 'story',
      label: 'Story',
      icon: 'Circle',
      description: '24-hour temporary content'
    },
    {
      id: 'reel',
      label: 'Reel',
      icon: 'Video',
      description: 'Short-form video content'
    },
    {
      id: 'ad',
      label: 'Ad',
      icon: 'Target',
      description: 'Promotional advertisements'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Content Type</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {contentTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => onTypeChange(type?.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedType === type?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedType === type?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                <Icon name={type?.icon} size={20} />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm text-foreground">{type?.label}</p>
                <p className="text-xs text-text-secondary">{type?.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentTypeSelector;