import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountSwitcher = () => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState('main-brand');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const accounts = [
    {
      id: 'main-brand',
      name: 'Main Brand',
      description: 'Primary business account',
      platforms: ['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'YouTube'],
      stats: {
        followers: '45.2K',
        engagement: '4.8%',
        posts: 156
      },
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop',
      status: 'active'
    },
    {
      id: 'client-a',
      name: 'TechStart Solutions',
      description: 'Client account - Technology',
      platforms: ['LinkedIn', 'Twitter', 'YouTube'],
      stats: {
        followers: '12.8K',
        engagement: '6.2%',
        posts: 89
      },
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=60&h=60&fit=crop',
      status: 'active'
    },
    {
      id: 'client-b',
      name: 'Fashion Forward',
      description: 'Client account - Fashion & Lifestyle',
      platforms: ['Instagram', 'Facebook', 'TikTok', 'Pinterest'],
      stats: {
        followers: '78.5K',
        engagement: '7.1%',
        posts: 234
      },
      avatar: 'https://images.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg?w=60&h=60&fit=crop',
      status: 'active'
    },
    {
      id: 'personal',
      name: 'Personal Account',
      description: 'Personal social media',
      platforms: ['Instagram', 'Twitter'],
      stats: {
        followers: '2.1K',
        engagement: '3.4%',
        posts: 67
      },
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'active'
    }
  ];

  const currentAccount = accounts?.find(acc => acc?.id === selectedAccount);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAccountSwitch = (accountId) => {
    setSelectedAccount(accountId);
    setIsDropdownOpen(false);
    console.log('Switched to account:', accountId);
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      Instagram: 'Instagram',
      Facebook: 'Facebook',
      LinkedIn: 'Linkedin',
      Twitter: 'Twitter',
      YouTube: 'Youtube',
      TikTok: 'Music',
      Pinterest: 'Image'
    };
    return icons?.[platform] || 'Globe';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Active Account</h3>
          <p className="text-sm text-text-secondary">Switch between your managed accounts</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/social-media-accounts')}
        >
          Manage All
        </Button>
      </div>
      {/* Current Account Display */}
      <div className="bg-muted/30 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={currentAccount?.avatar}
              alt={currentAccount?.name}
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card"></div>
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{currentAccount?.name}</h4>
            <p className="text-sm text-text-secondary mb-2">{currentAccount?.description}</p>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} className="text-text-secondary" />
                <span className="text-foreground font-medium">{currentAccount?.stats?.followers}</span>
                <span className="text-text-secondary">followers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={14} className="text-success" />
                <span className="text-foreground font-medium">{currentAccount?.stats?.engagement}</span>
                <span className="text-text-secondary">engagement</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">Connected platforms:</span>
              <div className="flex items-center space-x-1">
                {currentAccount?.platforms?.slice(0, 4)?.map((platform) => (
                  <Icon
                    key={platform}
                    name={getPlatformIcon(platform)}
                    size={16}
                    className="text-text-secondary"
                  />
                ))}
                {currentAccount?.platforms?.length > 4 && (
                  <span className="text-xs text-text-secondary">+{currentAccount?.platforms?.length - 4}</span>
                )}
              </div>
            </div>
            <span className="text-sm font-medium text-foreground">{currentAccount?.stats?.posts} posts</span>
          </div>
        </div>
      </div>
      {/* Account Switcher */}
      <div ref={dropdownRef} className="relative">
        <Button
          variant="outline"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full justify-between"
          iconName="ChevronDown"
          iconPosition="right"
        >
          Switch Account
        </Button>

        {isDropdownOpen && (
          <div className="absolute top-12 left-0 right-0 bg-popover border border-border rounded-lg shadow-elevated z-50 max-h-80 overflow-y-auto">
            <div className="p-2">
              {accounts?.map((account) => (
                <button
                  key={account?.id}
                  onClick={() => handleAccountSwitch(account?.id)}
                  className={`w-full p-3 text-left rounded-lg hover:bg-muted transition-smooth ${
                    selectedAccount === account?.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={account?.avatar}
                        alt={account?.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                      {account?.status === 'active' && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border border-card"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{account?.name}</p>
                      <p className="text-sm text-text-secondary truncate">{account?.description}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-text-secondary">{account?.stats?.followers} followers</span>
                        <span className="text-xs text-text-secondary">{account?.platforms?.length} platforms</span>
                      </div>
                    </div>
                    
                    {selectedAccount === account?.id && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                iconName="Plus"
                iconPosition="left"
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate('/social-media-accounts');
                }}
              >
                Add New Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSwitcher;