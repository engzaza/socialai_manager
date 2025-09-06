import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import AccountCard from './components/AccountCard';
import AddAccountSection from './components/AddAccountSection';
import AccountSwitcher from './components/AccountSwitcher';
import BulkOperations from './components/BulkOperations';
import ConnectionDialog from './components/ConnectionDialog';

const SocialMediaAccounts = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('main-brand');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [connectionDialog, setConnectionDialog] = useState({ isOpen: false, platform: null });
  const [disconnectDialog, setDisconnectDialog] = useState({ isOpen: false, accountId: null });

  // Mock data for connected accounts
  const mockAccounts = [
    {
      id: 'fb_001',
      platform: 'Facebook',
      accountName: 'TechCorp Official',
      status: 'connected',
      followers: 15420,
      lastSync: new Date(Date.now() - 300000), // 5 minutes ago
      apiUsage: 45,
      platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
      errorMessage: null
    },
    {
      id: 'ig_001',
      platform: 'Instagram',
      accountName: '@techcorp_official',
      status: 'connected',
      followers: 8750,
      lastSync: new Date(Date.now() - 600000), // 10 minutes ago
      apiUsage: 32,
      platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
      errorMessage: null
    },
    {
      id: 'tw_001',
      platform: 'Twitter/X',
      accountName: '@TechCorpHQ',
      status: 'warning',
      followers: 12300,
      lastSync: new Date(Date.now() - 3600000), // 1 hour ago
      apiUsage: 78,
      platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg',
      errorMessage: 'API rate limit approaching'
    },
    {
      id: 'li_001',
      platform: 'LinkedIn',
      accountName: 'TechCorp Solutions',
      status: 'error',
      followers: 5680,
      lastSync: new Date(Date.now() - 7200000), // 2 hours ago
      apiUsage: 0,
      platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
      errorMessage: 'Authentication token expired. Please reconnect.'
    },
    {
      id: 'yt_001',
      platform: 'YouTube',
      accountName: 'TechCorp Channel',
      status: 'connected',
      followers: 25600,
      lastSync: new Date(Date.now() - 900000), // 15 minutes ago
      apiUsage: 23,
      platformLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png',
      errorMessage: null
    }
  ];

  // Mock data for brands
  const mockBrands = [
    {
      id: 'main-brand',
      name: 'TechCorp Solutions',
      description: 'Main company brand',
      role: 'owner',
      accountCount: 5,
      logo: null,
      connectedPlatforms: [
        { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
        { name: 'Instagram', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' },
        { name: 'Twitter', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg' },
        { name: 'LinkedIn', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
        { name: 'YouTube', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png' }
      ]
    },
    {
      id: 'client-a',
      name: 'StartupX Marketing',
      description: 'Client brand management',
      role: 'admin',
      accountCount: 3,
      logo: null,
      connectedPlatforms: [
        { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
        { name: 'Instagram', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' },
        { name: 'LinkedIn', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' }
      ]
    }
  ];

  useEffect(() => {
    setConnectedAccounts(mockAccounts);
  }, []);

  const handleAccountReconnect = async (accountId) => {
    const account = connectedAccounts?.find(acc => acc?.id === accountId);
    if (account) {
      // Simulate reconnection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setConnectedAccounts(prev => prev?.map(acc => 
        acc?.id === accountId 
          ? { ...acc, status: 'connected', lastSync: new Date(), errorMessage: null }
          : acc
      ));
    }
  };

  const handleAccountSettings = (accountId) => {
    console.log('Opening settings for account:', accountId);
    // Navigate to account settings or open settings modal
  };

  const handleAccountDisconnect = (accountId) => {
    setDisconnectDialog({ isOpen: true, accountId });
  };

  const confirmDisconnect = () => {
    if (disconnectDialog?.accountId) {
      setConnectedAccounts(prev => 
        prev?.filter(acc => acc?.id !== disconnectDialog?.accountId)
      );
      setSelectedAccounts(prev => 
        prev?.filter(id => id !== disconnectDialog?.accountId)
      );
    }
    setDisconnectDialog({ isOpen: false, accountId: null });
  };

  const handleConnectAccount = (platform) => {
    setConnectionDialog({ isOpen: true, platform });
  };

  const handleConnectionComplete = (newAccount) => {
    setConnectedAccounts(prev => [...prev, newAccount]);
    setConnectionDialog({ isOpen: false, platform: null });
  };

  const handleBulkAction = async (action, accountIds) => {
    console.log('Performing bulk action:', action, 'on accounts:', accountIds);
    
    // Simulate bulk operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    switch (action) {
      case 'sync':
        setConnectedAccounts(prev => prev?.map(acc => 
          accountIds?.includes(acc?.id) 
            ? { ...acc, lastSync: new Date() }
            : acc
        ));
        break;
      case 'disconnect':
        setConnectedAccounts(prev => 
          prev?.filter(acc => !accountIds?.includes(acc?.id))
        );
        setSelectedAccounts([]);
        break;
      default:
        break;
    }
  };

  const filteredAccounts = connectedAccounts?.filter(account => {
    const matchesSearch = account?.accountName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         account?.platform?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesFilter = filterStatus === 'all' || account?.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusCounts = () => {
    return {
      all: connectedAccounts?.length,
      connected: connectedAccounts?.filter(acc => acc?.status === 'connected')?.length,
      warning: connectedAccounts?.filter(acc => acc?.status === 'warning')?.length,
      error: connectedAccounts?.filter(acc => acc?.status === 'error')?.length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Social Media Accounts</h1>
                <p className="text-text-secondary mt-1">
                  Manage and monitor your connected social media platforms
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => handleBulkAction('sync', connectedAccounts?.map(acc => acc?.id))}
                >
                  Sync All
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => document.getElementById('add-accounts')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Add Account
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Total Accounts</p>
                    <p className="text-2xl font-semibold text-foreground">{statusCounts?.all}</p>
                  </div>
                  <Icon name="Globe" size={24} className="text-secondary" />
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Connected</p>
                    <p className="text-2xl font-semibold text-success">{statusCounts?.connected}</p>
                  </div>
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Warnings</p>
                    <p className="text-2xl font-semibold text-warning">{statusCounts?.warning}</p>
                  </div>
                  <Icon name="AlertTriangle" size={24} className="text-warning" />
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Errors</p>
                    <p className="text-2xl font-semibold text-error">{statusCounts?.error}</p>
                  </div>
                  <Icon name="XCircle" size={24} className="text-error" />
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search accounts by name or platform..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </div>
              <div className="flex space-x-2">
                {['all', 'connected', 'warning', 'error']?.map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                  >
                    {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
                    {status !== 'all' && (
                      <span className="ml-1 text-xs">
                        ({statusCounts?.[status]})
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Connected Accounts */}
              {filteredAccounts?.length > 0 ? (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Connected Accounts ({filteredAccounts?.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredAccounts?.map((account) => (
                      <AccountCard
                        key={account?.id}
                        account={account}
                        onReconnect={handleAccountReconnect}
                        onSettings={handleAccountSettings}
                        onDisconnect={handleAccountDisconnect}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No accounts found</h3>
                  <p className="text-text-secondary">
                    {searchQuery ? 'Try adjusting your search terms' : 'Connect your first social media account to get started'}
                  </p>
                </div>
              )}

              {/* Add New Account Section */}
              <div id="add-accounts">
                <AddAccountSection onConnect={handleConnectAccount} />
              </div>

              {/* Bulk Operations */}
              {connectedAccounts?.length > 0 && (
                <BulkOperations
                  accounts={connectedAccounts}
                  selectedAccounts={selectedAccounts}
                  onSelectionChange={setSelectedAccounts}
                  onBulkAction={handleBulkAction}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AccountSwitcher
                brands={mockBrands}
                selectedBrand={selectedBrand}
                onBrandSwitch={setSelectedBrand}
                userRole="owner"
              />

              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Total Followers</span>
                    <span className="text-sm font-medium text-foreground">
                      {connectedAccounts?.reduce((sum, acc) => sum + (acc?.followers || 0), 0)?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Avg. API Usage</span>
                    <span className="text-sm font-medium text-foreground">
                      {Math.round(connectedAccounts?.reduce((sum, acc) => sum + acc?.apiUsage, 0) / connectedAccounts?.length || 0)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Last Sync</span>
                    <span className="text-sm font-medium text-foreground">
                      {connectedAccounts?.length > 0 ? 'Just now' : 'Never'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="Book" size={16} className="mr-2" />
                    Connection Guide
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="Video" size={16} className="mr-2" />
                    Watch Tutorial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Connection Dialog */}
      <ConnectionDialog
        isOpen={connectionDialog?.isOpen}
        onClose={() => setConnectionDialog({ isOpen: false, platform: null })}
        platform={connectionDialog?.platform}
        onConnect={handleConnectionComplete}
      />
      {/* Disconnect Confirmation Dialog */}
      {disconnectDialog?.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300 p-4">
          <div className="bg-popover border border-border rounded-lg shadow-elevated max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertTriangle" size={24} className="text-error" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Disconnect Account
              </h3>
              <p className="text-text-secondary">
                Are you sure you want to disconnect this account? You'll lose access to posting and analytics.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setDisconnectDialog({ isOpen: false, accountId: null })}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDisconnect}
                className="flex-1"
              >
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      )}
      <QuickActionButton />
    </div>
  );
};

export default SocialMediaAccounts;