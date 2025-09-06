import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ContentPreview = ({ content, media, selectedPlatforms, contentType }) => {
  const platformPreviews = {
    facebook: {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-500',
      maxChars: 2200
    },
    instagram: {
      name: 'Instagram',
      icon: 'Instagram',
      color: 'bg-pink-500',
      maxChars: 2200
    },
    twitter: {
      name: 'Twitter/X',
      icon: 'Twitter',
      color: 'bg-gray-900',
      maxChars: 280
    },
    linkedin: {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-600',
      maxChars: 3000
    },
    tiktok: {
      name: 'TikTok',
      icon: 'Music',
      color: 'bg-black',
      maxChars: 150
    },
    youtube: {
      name: 'YouTube',
      icon: 'Youtube',
      color: 'bg-red-500',
      maxChars: 5000
    }
  };

  const truncateContent = (text, maxLength) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength - 3) + '...';
  };

  const formatContent = (text) => {
    // Simple formatting for preview
    return text?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')?.replace(/\*(.*?)\*/g, '<em>$1</em>')?.replace(/_(.*?)_/g, '<u>$1</u>')?.replace(/\n/g, '<br>');
  };

  if (selectedPlatforms?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Content Preview</h3>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Icon name="Eye" size={48} className="text-text-secondary mb-4" />
          <p className="text-text-secondary">Select platforms to see content preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Content Preview</h3>
      <div className="space-y-6">
        {selectedPlatforms?.map(platformId => {
          const platform = platformPreviews?.[platformId];
          if (!platform) return null;

          const displayContent = truncateContent(content || '', platform?.maxChars);
          const isOverLimit = content && content?.length > platform?.maxChars;

          return (
            <div key={platformId} className="border border-border rounded-lg p-4">
              {/* Platform Header */}
              <div className="flex items-center space-x-2 mb-3">
                <div className={`w-6 h-6 ${platform?.color} rounded flex items-center justify-center`}>
                  <Icon name={platform?.icon} size={14} color="white" />
                </div>
                <span className="font-medium text-foreground">{platform?.name}</span>
                {isOverLimit && (
                  <span className="text-xs text-error bg-error/10 px-2 py-1 rounded">
                    Exceeds limit
                  </span>
                )}
              </div>
              {/* Mock Platform UI */}
              <div className="bg-muted/30 rounded-lg p-4">
                {/* Profile Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">Your Brand</p>
                    <p className="text-xs text-text-secondary">2 minutes ago</p>
                  </div>
                </div>

                {/* Content */}
                {displayContent && (
                  <div 
                    className="text-sm text-foreground mb-3 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatContent(displayContent) }}
                  />
                )}

                {/* Media */}
                {media && (
                  <div className="mb-3">
                    <div className="relative rounded-lg overflow-hidden bg-muted">
                      {contentType === 'story' ? (
                        <div className="aspect-[9/16] max-h-96">
                          <Image
                            src={media?.url}
                            alt="Story preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : contentType === 'reel' ? (
                        <div className="aspect-[9/16] max-h-96 relative">
                          <Image
                            src={media?.url}
                            alt="Reel preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                              <Icon name="Play" size={24} color="white" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-video">
                          <Image
                            src={media?.url}
                            alt="Post media"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Engagement Actions */}
                <div className="flex items-center space-x-6 text-text-secondary">
                  <button className="flex items-center space-x-1 hover:text-foreground">
                    <Icon name="Heart" size={16} />
                    <span className="text-xs">Like</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-foreground">
                    <Icon name="MessageCircle" size={16} />
                    <span className="text-xs">Comment</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-foreground">
                    <Icon name="Share" size={16} />
                    <span className="text-xs">Share</span>
                  </button>
                </div>
              </div>
              {/* Character Count */}
              <div className="mt-2 text-xs text-text-secondary">
                {content ? content?.length : 0} / {platform?.maxChars} characters
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentPreview;