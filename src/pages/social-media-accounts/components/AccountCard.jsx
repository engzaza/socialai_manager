import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AccountCard = ({ account, onReconnect, onSettings, onDisconnect }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Clock';
    }
  };

  const handleReconnect = async () => {
    setIsLoading(true);
    try {
      await onReconnect(account?.id);
    } finally {
      setIsLoading(false);
    }
  };

  const formatLastSync = (timestamp) => {
    const now = new Date();
    const syncTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - syncTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            <Image 
              src={account?.platformLogo} 
              alt={`${account?.platform} logo`}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{account?.accountName}</h3>
            <p className="text-sm text-text-secondary">{account?.platform}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon(account?.status)} 
            size={16} 
            className={getStatusColor(account?.status)}
          />
          <span className={`text-xs font-medium capitalize ${getStatusColor(account?.status)}`}>
            {account?.status}
          </span>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Followers</span>
          <span className="text-sm font-medium text-foreground">
            {account?.followers?.toLocaleString() || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Last Sync</span>
          <span className="text-sm font-medium text-foreground">
            {formatLastSync(account?.lastSync)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">API Limit</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  account?.apiUsage > 80 ? 'bg-error' : 
                  account?.apiUsage > 60 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${account?.apiUsage}%` }}
              />
            </div>
            <span className="text-xs text-text-secondary">{account?.apiUsage}%</span>
          </div>
        </div>
      </div>
      {account?.status === 'error' && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
            <div>
              <p className="text-sm font-medium text-error">Connection Issue</p>
              <p className="text-xs text-error/80">{account?.errorMessage}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex space-x-2">
        {account?.status === 'error' ? (
          <Button
            variant="default"
            size="sm"
            onClick={handleReconnect}
            loading={isLoading}
            iconName="RefreshCw"
            iconPosition="left"
            className="flex-1"
          >
            Reconnect
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSettings(account?.id)}
            iconName="Settings"
            iconPosition="left"
            className="flex-1"
          >
            Settings
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDisconnect(account?.id)}
          iconName="Trash2"
          iconPosition="left"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default AccountCard;