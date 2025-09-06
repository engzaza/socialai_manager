import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AddAccountSection = ({ onConnect }) => {
  const [connectingPlatform, setConnectingPlatform] = useState(null);

  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
      description: 'Connect your Facebook pages and profiles',
      color: 'bg-blue-600',
      features: ['Pages', 'Groups', 'Ads Manager']
    },
    {
      id: 'instagram',
      name: 'Instagram',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
      description: 'Manage Instagram business accounts',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      features: ['Posts', 'Stories', 'Reels', 'IGTV']
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg',
      description: 'Connect your Twitter/X accounts',
      color: 'bg-black',
      features: ['Tweets', 'Threads', 'Spaces']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
      description: 'Professional networking and company pages',
      color: 'bg-blue-700',
      features: ['Personal', 'Company Pages', 'Articles']
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      logo: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg',
      description: 'Create and manage TikTok content',
      color: 'bg-black',
      features: ['Videos', 'Live', 'Business Tools']
    },
    {
      id: 'youtube',
      name: 'YouTube',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png',
      description: 'Upload and manage YouTube videos',
      color: 'bg-red-600',
      features: ['Videos', 'Shorts', 'Live Streams']
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
      description: 'WhatsApp Business API integration',
      color: 'bg-green-500',
      features: ['Messages', 'Broadcast', 'Catalog']
    },
    {
      id: 'telegram',
      name: 'Telegram',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
      description: 'Telegram channels and bots',
      color: 'bg-blue-500',
      features: ['Channels', 'Groups', 'Bots']
    }
  ];

  const handleConnect = async (platform) => {
    setConnectingPlatform(platform?.id);
    try {
      // Simulate OAuth connection flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      await onConnect(platform);
    } finally {
      setConnectingPlatform(null);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Add New Account</h2>
        <p className="text-text-secondary">
          Connect your social media accounts to start managing them from one place
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {platforms?.map((platform) => (
          <div
            key={platform?.id}
            className="border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-300 group"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 ${platform?.color} rounded-lg flex items-center justify-center overflow-hidden`}>
                <Image 
                  src={platform?.logo} 
                  alt={`${platform?.name} logo`}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{platform?.name}</h3>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-3">
              {platform?.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {platform?.features?.map((feature) => (
                <span
                  key={feature}
                  className="px-2 py-1 bg-muted text-xs text-text-secondary rounded"
                >
                  {feature}
                </span>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleConnect(platform)}
              loading={connectingPlatform === platform?.id}
              iconName="Plus"
              iconPosition="left"
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              {connectingPlatform === platform?.id ? 'Connecting...' : 'Connect'}
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-secondary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Connection Requirements</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Business or Creator accounts recommended for advanced features</li>
              <li>• Some platforms require app review for full API access</li>
              <li>• Rate limits apply based on platform policies</li>
              <li>• Secure OAuth 2.0 authentication used for all connections</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccountSection;