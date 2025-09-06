import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationPanel = () => {
  const [connectedIntegrations, setConnectedIntegrations] = useState(['shopify', 'hubspot']);

  const integrations = [
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Sync customer data and order information',
      icon: 'ShoppingBag',
      color: 'bg-green-500',
      features: ['Customer sync', 'Order tracking', 'Abandoned cart recovery'],
      status: 'connected',
      lastSync: '2025-01-06 10:30 AM'
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      description: 'Connect your WordPress e-commerce store',
      icon: 'ShoppingCart',
      color: 'bg-purple-500',
      features: ['Product sync', 'Customer data', 'Sales tracking'],
      status: 'available',
      lastSync: null
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'CRM integration for lead management',
      icon: 'Database',
      color: 'bg-orange-500',
      features: ['Contact sync', 'Deal tracking', 'Email sequences'],
      status: 'connected',
      lastSync: '2025-01-06 09:15 AM'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Enterprise CRM integration',
      icon: 'Building',
      color: 'bg-blue-500',
      features: ['Lead sync', 'Opportunity tracking', 'Custom fields'],
      status: 'available',
      lastSync: null
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing automation',
      icon: 'Mail',
      color: 'bg-yellow-500',
      features: ['List sync', 'Campaign tracking', 'Audience segmentation'],
      status: 'available',
      lastSync: null
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 5000+ apps',
      icon: 'Zap',
      color: 'bg-indigo-500',
      features: ['Custom workflows', 'Automated triggers', 'Data mapping'],
      status: 'available',
      lastSync: null
    }
  ];

  const syncStats = {
    totalContacts: 12847,
    newToday: 156,
    lastSync: '2025-01-06 10:30 AM',
    syncErrors: 3
  };

  const handleConnect = (integrationId) => {
    console.log('Connecting to:', integrationId);
    setConnectedIntegrations([...connectedIntegrations, integrationId]);
  };

  const handleDisconnect = (integrationId) => {
    console.log('Disconnecting from:', integrationId);
    setConnectedIntegrations(connectedIntegrations?.filter(id => id !== integrationId));
  };

  const handleSync = (integrationId) => {
    console.log('Syncing:', integrationId);
  };

  const handleConfigure = (integrationId) => {
    console.log('Configuring:', integrationId);
  };

  const isConnected = (integrationId) => {
    return connectedIntegrations?.includes(integrationId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Integrations</h2>
          <p className="text-sm text-text-secondary">Connect your favorite tools for seamless data flow</p>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Sync All
        </Button>
      </div>
      {/* Sync Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Users" size={20} className="text-primary" />
            <span className="text-xs text-success">+12%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{syncStats?.totalContacts?.toLocaleString()}</div>
          <p className="text-sm text-text-secondary">Total Contacts</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="UserPlus" size={20} className="text-success" />
            <span className="text-xs text-success">+8%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{syncStats?.newToday}</div>
          <p className="text-sm text-text-secondary">New Today</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Clock" size={20} className="text-secondary" />
          </div>
          <div className="text-sm font-medium text-foreground">{syncStats?.lastSync}</div>
          <p className="text-sm text-text-secondary">Last Sync</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-foreground">{syncStats?.syncErrors}</div>
          <p className="text-sm text-text-secondary">Sync Errors</p>
        </div>
      </div>
      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations?.map((integration) => (
          <div key={integration?.id} className="bg-muted rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${integration?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={integration?.icon} size={24} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{integration?.name}</h3>
                  <p className="text-sm text-text-secondary">{integration?.description}</p>
                </div>
              </div>
              
              {isConnected(integration?.id) && (
                <div className="w-3 h-3 bg-success rounded-full"></div>
              )}
            </div>
            
            {/* Features */}
            <div className="mb-4">
              <p className="text-xs font-medium text-text-secondary mb-2">Features:</p>
              <div className="flex flex-wrap gap-1">
                {integration?.features?.map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Last Sync */}
            {integration?.lastSync && (
              <div className="mb-4">
                <p className="text-xs text-text-secondary">
                  Last sync: {integration?.lastSync}
                </p>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex items-center space-x-2">
              {isConnected(integration?.id) ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleSync(integration?.id)}>
                    <Icon name="RefreshCw" size={14} className="mr-1" />
                    Sync
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleConfigure(integration?.id)}>
                    <Icon name="Settings" size={14} className="mr-1" />
                    Configure
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDisconnect(integration?.id)}
                    className="text-error hover:text-error"
                  >
                    <Icon name="Unlink" size={14} />
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleConnect(integration?.id)}
                  className="w-full"
                >
                  <Icon name="Link" size={14} className="mr-2" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Integration Guide */}
      <div className="mt-6 bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-secondary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Integration Guide</h4>
            <p className="text-sm text-text-secondary mb-3">
              Connect your tools to automatically sync leads, customers, and campaign data. 
              Each integration provides real-time data synchronization and automated workflows.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-primary hover:underline">View Documentation</a>
              <a href="#" className="text-primary hover:underline">API Reference</a>
              <a href="#" className="text-primary hover:underline">Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationPanel;