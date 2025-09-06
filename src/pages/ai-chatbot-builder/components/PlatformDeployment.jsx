import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PlatformDeployment = ({ botConfig, onDeploy }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [deploymentSettings, setDeploymentSettings] = useState({});
  const [isDeploying, setIsDeploying] = useState(false);

  const platforms = [
    {
      id: 'messenger',
      name: 'Facebook Messenger',
      icon: 'MessageCircle',
      color: 'bg-blue-600',
      status: 'connected',
      features: ['Rich Cards', 'Quick Replies', 'Persistent Menu', 'Webview'],
      requirements: ['Facebook Page', 'App Verification']
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      icon: 'MessageSquare',
      color: 'bg-green-600',
      status: 'connected',
      features: ['Media Messages', 'Templates', 'Interactive Buttons', 'Lists'],
      requirements: ['Business Account', 'Phone Verification']
    },
    {
      id: 'instagram',
      name: 'Instagram DM',
      icon: 'Instagram',
      color: 'bg-pink-600',
      status: 'connected',
      features: ['Story Replies', 'Quick Replies', 'Media Sharing'],
      requirements: ['Business Account', 'Connected Facebook Page']
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: 'Send',
      color: 'bg-blue-500',
      status: 'not-connected',
      features: ['Inline Keyboards', 'Commands', 'File Sharing', 'Groups'],
      requirements: ['Bot Token', 'Channel Setup']
    },
    {
      id: 'website',
      name: 'Website Widget',
      icon: 'Globe',
      color: 'bg-primary',
      status: 'available',
      features: ['Customizable UI', 'Embed Code', 'Mobile Responsive'],
      requirements: ['Website Access', 'JavaScript Support']
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: 'Hash',
      color: 'bg-purple-600',
      status: 'not-connected',
      features: ['Slash Commands', 'Interactive Messages', 'Workflow Integration'],
      requirements: ['Slack Workspace', 'App Installation']
    }
  ];

  const deploymentModes = [
    { value: 'test', label: 'Test Mode', description: 'Deploy for testing with limited users' },
    { value: 'staging', label: 'Staging', description: 'Deploy to staging environment' },
    { value: 'production', label: 'Production', description: 'Deploy to live environment' }
  ];

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev => {
      if (prev?.includes(platformId)) {
        return prev?.filter(id => id !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
  };

  const handleSettingChange = (platformId, setting, value) => {
    setDeploymentSettings(prev => ({
      ...prev,
      [platformId]: {
        ...prev?.[platformId],
        [setting]: value
      }
    }));
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const deploymentData = {
      platforms: selectedPlatforms,
      settings: deploymentSettings,
      botConfig
    };
    
    onDeploy(deploymentData);
    setIsDeploying(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success bg-success/10';
      case 'not-connected': return 'text-error bg-error/10';
      case 'available': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'not-connected': return 'Not Connected';
      case 'available': return 'Available';
      default: return 'Unknown';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Deploy Your Bot</h2>
        <p className="text-text-secondary">Choose platforms and configure deployment settings</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          {/* Platform Selection */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Select Platforms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms?.map((platform) => (
                <div
                  key={platform?.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-smooth ${
                    selectedPlatforms?.includes(platform?.id)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  } ${platform?.status === 'not-connected' ? 'opacity-60' : ''}`}
                  onClick={() => platform?.status !== 'not-connected' && handlePlatformToggle(platform?.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 ${platform?.color} rounded-lg flex items-center justify-center`}>
                      <Icon name={platform?.icon} size={20} color="white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(platform?.status)}`}>
                        {getStatusLabel(platform?.status)}
                      </span>
                      {selectedPlatforms?.includes(platform?.id) && (
                        <Icon name="Check" size={16} className="text-primary" />
                      )}
                    </div>
                  </div>

                  <h4 className="font-semibold text-foreground mb-2">{platform?.name}</h4>
                  
                  <div className="mb-3">
                    <p className="text-xs text-text-secondary mb-2">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {platform?.features?.slice(0, 2)?.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-muted text-xs text-text-secondary rounded">
                          {feature}
                        </span>
                      ))}
                      {platform?.features?.length > 2 && (
                        <span className="px-2 py-1 bg-muted text-xs text-text-secondary rounded">
                          +{platform?.features?.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {platform?.status === 'not-connected' && (
                    <Button size="sm" variant="outline" className="w-full">
                      <Icon name="Link" size={14} className="mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Platform-Specific Settings */}
          {selectedPlatforms?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Platform Settings</h3>
              <div className="space-y-6">
                {selectedPlatforms?.map((platformId) => {
                  const platform = platforms?.find(p => p?.id === platformId);
                  return (
                    <div key={platformId} className="bg-muted rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-8 h-8 ${platform?.color} rounded-lg flex items-center justify-center`}>
                          <Icon name={platform?.icon} size={16} color="white" />
                        </div>
                        <h4 className="font-semibold text-foreground">{platform?.name}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Bot Name"
                          placeholder={`${platform?.name} bot name`}
                          value={deploymentSettings?.[platformId]?.botName || ''}
                          onChange={(e) => handleSettingChange(platformId, 'botName', e?.target?.value)}
                        />
                        <Input
                          label="Welcome Message"
                          placeholder="Custom welcome message"
                          value={deploymentSettings?.[platformId]?.welcomeMessage || ''}
                          onChange={(e) => handleSettingChange(platformId, 'welcomeMessage', e?.target?.value)}
                        />
                        
                        {platformId === 'website' && (
                          <>
                            <Input
                              label="Widget Color"
                              type="color"
                              value={deploymentSettings?.[platformId]?.widgetColor || '#1E40AF'}
                              onChange={(e) => handleSettingChange(platformId, 'widgetColor', e?.target?.value)}
                            />
                            <Select
                              label="Widget Position"
                              options={[
                                { value: 'bottom-right', label: 'Bottom Right' },
                                { value: 'bottom-left', label: 'Bottom Left' },
                                { value: 'top-right', label: 'Top Right' },
                                { value: 'top-left', label: 'Top Left' }
                              ]}
                              value={deploymentSettings?.[platformId]?.widgetPosition || 'bottom-right'}
                              onChange={(value) => handleSettingChange(platformId, 'widgetPosition', value)}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Deployment Configuration */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Deployment Configuration</h3>
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Deployment Mode"
                  description="Choose deployment environment"
                  options={deploymentModes}
                  value={deploymentSettings?.mode || 'test'}
                  onChange={(value) => setDeploymentSettings(prev => ({ ...prev, mode: value }))}
                />
                <Input
                  label="Version Tag"
                  placeholder="v1.0.0"
                  value={deploymentSettings?.version || ''}
                  onChange={(e) => setDeploymentSettings(prev => ({ ...prev, version: e?.target?.value }))}
                  description="Version identifier for this deployment"
                />
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-foreground mb-3">Advanced Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Auto-scaling</p>
                      <p className="text-sm text-text-secondary">Scale based on usage</p>
                    </div>
                    <Button
                      variant={deploymentSettings?.autoScaling ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDeploymentSettings(prev => ({ 
                        ...prev, 
                        autoScaling: !prev?.autoScaling 
                      }))}
                    >
                      {deploymentSettings?.autoScaling ? 'On' : 'Off'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Analytics</p>
                      <p className="text-sm text-text-secondary">Track bot performance</p>
                    </div>
                    <Button
                      variant={deploymentSettings?.analytics ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDeploymentSettings(prev => ({ 
                        ...prev, 
                        analytics: !prev?.analytics 
                      }))}
                    >
                      {deploymentSettings?.analytics ? 'On' : 'Off'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Monitoring</p>
                      <p className="text-sm text-text-secondary">Real-time monitoring</p>
                    </div>
                    <Button
                      variant={deploymentSettings?.monitoring ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDeploymentSettings(prev => ({ 
                        ...prev, 
                        monitoring: !prev?.monitoring 
                      }))}
                    >
                      {deploymentSettings?.monitoring ? 'On' : 'Off'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Deploy Actions */}
      <div className="border-t border-border p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            {selectedPlatforms?.length > 0 
              ? `Ready to deploy to ${selectedPlatforms?.length} platform${selectedPlatforms?.length > 1 ? 's' : ''}`
              : 'Select at least one platform to deploy'
            }
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Icon name="Eye" size={16} className="mr-2" />
              Preview
            </Button>
            <Button 
              onClick={handleDeploy}
              disabled={selectedPlatforms?.length === 0 || isDeploying}
              loading={isDeploying}
            >
              <Icon name="Rocket" size={16} className="mr-2" />
              {isDeploying ? 'Deploying...' : 'Deploy Bot'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformDeployment;