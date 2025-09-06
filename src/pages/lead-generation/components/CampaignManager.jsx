import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CampaignManager = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const campaigns = [
    {
      id: 1,
      name: "Holiday Fitness Challenge",
      type: "WhatsApp",
      status: "Active",
      sent: 1247,
      opened: 892,
      replied: 156,
      converted: 23,
      created: "2025-01-02",
      nextSend: "2025-01-07 10:00 AM"
    },
    {
      id: 2,
      name: "New Year Business Growth",
      type: "Email",
      status: "Scheduled",
      sent: 0,
      opened: 0,
      replied: 0,
      converted: 0,
      created: "2025-01-05",
      nextSend: "2025-01-08 9:00 AM"
    },
    {
      id: 3,
      name: "Instagram DM Outreach",
      type: "Instagram",
      status: "Paused",
      sent: 567,
      opened: 423,
      replied: 89,
      converted: 12,
      created: "2024-12-28",
      nextSend: "Paused"
    }
  ];

  const campaignTypes = [
    { value: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
    { value: 'email', label: 'Email', icon: 'Mail' },
    { value: 'sms', label: 'SMS', icon: 'Smartphone' },
    { value: 'instagram', label: 'Instagram DM', icon: 'Instagram' },
    { value: 'facebook', label: 'Facebook Messenger', icon: 'Facebook' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Scheduled': return 'bg-warning text-warning-foreground';
      case 'Paused': return 'bg-muted text-text-secondary';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'WhatsApp': return 'MessageCircle';
      case 'Email': return 'Mail';
      case 'SMS': return 'Smartphone';
      case 'Instagram': return 'Instagram';
      case 'Facebook': return 'Facebook';
      default: return 'MessageSquare';
    }
  };

  const handleCampaignAction = (action, campaignId) => {
    console.log(`${action} campaign:`, campaignId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Campaign Manager</h2>
          <p className="text-sm text-text-secondary">Create and manage automated outreach campaigns</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Create Campaign
        </Button>
      </div>
      {/* Campaign Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Send" size={20} className="text-primary" />
            <span className="text-xs text-success">+12%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">1,814</div>
          <p className="text-sm text-text-secondary">Messages Sent</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Eye" size={20} className="text-secondary" />
            <span className="text-xs text-success">+8%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">1,315</div>
          <p className="text-sm text-text-secondary">Opened</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="MessageCircle" size={20} className="text-accent" />
            <span className="text-xs text-success">+15%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">245</div>
          <p className="text-sm text-text-secondary">Replies</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="text-xs text-success">+22%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">35</div>
          <p className="text-sm text-text-secondary">Conversions</p>
        </div>
      </div>
      {/* Campaign List */}
      <div className="space-y-4">
        {campaigns?.map((campaign) => (
          <div key={campaign?.id} className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name={getTypeIcon(campaign?.type)} size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{campaign?.name}</h3>
                  <p className="text-sm text-text-secondary">
                    {campaign?.type} • Created {campaign?.created}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign?.status)}`}>
                  {campaign?.status}
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleCampaignAction('edit', campaign?.id)}>
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleCampaignAction('duplicate', campaign?.id)}>
                    <Icon name="Copy" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleCampaignAction('delete', campaign?.id)}>
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-foreground">{campaign?.sent}</div>
                <p className="text-xs text-text-secondary">Sent</p>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">{campaign?.opened}</div>
                <p className="text-xs text-text-secondary">Opened</p>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">{campaign?.replied}</div>
                <p className="text-xs text-text-secondary">Replied</p>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">{campaign?.converted}</div>
                <p className="text-xs text-text-secondary">Converted</p>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{campaign?.nextSend}</div>
                <p className="text-xs text-text-secondary">Next Send</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Create New Campaign</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Campaign Name"
                placeholder="Enter campaign name"
              />
              
              <Select
                label="Campaign Type"
                options={campaignTypes}
                placeholder="Select campaign type"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Target Audience"
                  placeholder="e.g., Fitness enthusiasts"
                />
                <Input
                  label="Daily Send Limit"
                  type="number"
                  placeholder="50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message Template</label>
                <textarea
                  className="w-full h-32 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-text-secondary resize-none"
                  placeholder="Hi {{name}}, I noticed you're interested in {{interest}}. I'd love to share something that might help you..."
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateModal(false)}>
                  Create Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignManager;