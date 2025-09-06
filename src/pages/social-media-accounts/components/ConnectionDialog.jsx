import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ConnectionDialog = ({ isOpen, onClose, platform, onConnect }) => {
  const [step, setStep] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionData, setConnectionData] = useState({
    accountType: 'business',
    permissions: ['basic_info', 'manage_pages', 'publish_actions'],
    agreedToTerms: false
  });

  if (!isOpen || !platform) return null;

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAccount = {
        id: `${platform?.id}_${Date.now()}`,
        platform: platform?.name,
        accountName: `My ${platform?.name} Account`,
        status: 'connected',
        followers: Math.floor(Math.random() * 10000) + 1000,
        lastSync: new Date(),
        apiUsage: Math.floor(Math.random() * 50) + 10,
        platformLogo: platform?.logo
      };

      await onConnect(mockAccount);
      onClose();
    } finally {
      setIsConnecting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Link" size={24} color="white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Connect {platform?.name}
        </h3>
        <p className="text-text-secondary">
          You'll be redirected to {platform?.name} to authorize the connection
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">What we'll access:</h4>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-sm text-text-secondary">Basic profile information</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-sm text-text-secondary">Manage and publish posts</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-sm text-text-secondary">Read engagement metrics</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-sm text-text-secondary">Access page insights</span>
            </li>
          </ul>
        </div>

        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Shield" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Security Notice</p>
              <p className="text-xs text-warning/80">
                We use secure OAuth 2.0 authentication. Your login credentials are never stored.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button onClick={() => setStep(2)} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Settings" size={24} color="white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Connection Settings
        </h3>
        <p className="text-text-secondary">
          Configure how you want to use this account
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Account Type
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="accountType"
                value="business"
                checked={connectionData?.accountType === 'business'}
                onChange={(e) => setConnectionData({...connectionData, accountType: e?.target?.value})}
                className="w-4 h-4 text-primary"
              />
              <div>
                <p className="text-sm font-medium text-foreground">Business Account</p>
                <p className="text-xs text-text-secondary">Full analytics and advanced features</p>
              </div>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="accountType"
                value="personal"
                checked={connectionData?.accountType === 'personal'}
                onChange={(e) => setConnectionData({...connectionData, accountType: e?.target?.value})}
                className="w-4 h-4 text-primary"
              />
              <div>
                <p className="text-sm font-medium text-foreground">Personal Account</p>
                <p className="text-xs text-text-secondary">Basic posting and engagement features</p>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={connectionData?.agreedToTerms}
              onChange={(e) => setConnectionData({...connectionData, agreedToTerms: e?.target?.checked})}
              className="w-4 h-4 text-primary"
            />
            <span className="text-sm text-foreground">
              I agree to the platform's terms of service and privacy policy
            </span>
          </label>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleConnect} 
          disabled={!connectionData?.agreedToTerms}
          loading={isConnecting}
          className="flex-1"
        >
          {isConnecting ? 'Connecting...' : 'Connect Account'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300 p-4">
      <div className="bg-popover border border-border rounded-lg shadow-elevated max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="Globe" size={16} />
            </div>
            <span className="font-medium text-foreground">{platform?.name}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={16} />
          </Button>
        </div>

        {step === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
  );
};

export default ConnectionDialog;