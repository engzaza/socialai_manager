import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AutomatedFollowUp = () => {
  const [selectedSequence, setSelectedSequence] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const followUpSequences = [
    {
      id: 1,
      name: "New Lead Nurturing",
      status: "Active",
      triggers: ["New lead added", "No response after 3 days"],
      steps: 5,
      enrolled: 234,
      completed: 67,
      responseRate: 23.5,
      created: "2025-01-02"
    },
    {
      id: 2,
      name: "Cold Lead Reactivation",
      status: "Active",
      triggers: ["Lead marked as cold", "No activity for 30 days"],
      steps: 3,
      enrolled: 156,
      completed: 89,
      responseRate: 18.2,
      created: "2024-12-28"
    },
    {
      id: 3,
      name: "Post-Demo Follow Up",
      status: "Paused",
      triggers: ["Demo completed", "No response after demo"],
      steps: 4,
      enrolled: 45,
      completed: 23,
      responseRate: 45.8,
      created: "2024-12-15"
    }
  ];

  const sequenceSteps = [
    {
      id: 1,
      step: 1,
      delay: "Immediately",
      type: "Email",
      subject: "Welcome! Let\'s get started",
      content: `Hi {{firstName}},\n\nThank you for your interest in our services. I'd love to learn more about your business goals and see how we can help.\n\nWould you be available for a quick 15-minute call this week?\n\nBest regards,\n{{senderName}}`,
      sent: 234,
      opened: 189,
      replied: 45
    },
    {
      id: 2,
      step: 2,
      delay: "3 days after step 1",
      type: "WhatsApp",
      subject: "Quick follow-up",
      content: `Hi {{firstName}}, just wanted to follow up on my previous message. I have some ideas that could really help {{companyName}} grow. Are you free for a brief chat?`,
      sent: 189,
      opened: 156,
      replied: 32
    },
    {
      id: 3,
      step: 3,
      delay: "1 week after step 2",
      type: "Email",
      subject: "Last attempt - valuable insights inside",
      content: `Hi {{firstName}},\n\nI don't want to be pushy, but I noticed {{companyName}} could benefit from our recent case study results.\n\nWe helped a similar business increase their leads by 300% in just 60 days.\n\nIf you're interested, I can share the details. Otherwise, I'll stop reaching out.\n\nBest,\n{{senderName}}`,
      sent: 124,
      opened: 98,
      replied: 28
    }
  ];

  const triggerOptions = [
    { value: 'new_lead', label: 'New lead added' },
    { value: 'no_response', label: 'No response after X days' },
    { value: 'status_change', label: 'Lead status changed' },
    { value: 'tag_added', label: 'Specific tag added' },
    { value: 'form_submitted', label: 'Form submitted' },
    { value: 'email_opened', label: 'Email opened' }
  ];

  const messageTypes = [
    { value: 'email', label: 'Email', icon: 'Mail' },
    { value: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
    { value: 'sms', label: 'SMS', icon: 'Smartphone' },
    { value: 'instagram', label: 'Instagram DM', icon: 'Instagram' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Paused': return 'bg-warning text-warning-foreground';
      case 'Draft': return 'bg-muted text-text-secondary';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Email': return 'Mail';
      case 'WhatsApp': return 'MessageCircle';
      case 'SMS': return 'Smartphone';
      case 'Instagram': return 'Instagram';
      default: return 'MessageSquare';
    }
  };

  const handleSequenceAction = (action, sequenceId) => {
    console.log(`${action} sequence:`, sequenceId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Automated Follow-Up</h2>
          <p className="text-sm text-text-secondary">Create drip campaigns to nurture leads automatically</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Create Sequence
        </Button>
      </div>
      {/* Sequence Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Users" size={20} className="text-primary" />
            <span className="text-xs text-success">+18%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">435</div>
          <p className="text-sm text-text-secondary">Active Enrollments</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="text-xs text-success">+12%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">179</div>
          <p className="text-sm text-text-secondary">Completed Sequences</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="TrendingUp" size={20} className="text-accent" />
            <span className="text-xs text-success">+8%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">29.1%</div>
          <p className="text-sm text-text-secondary">Avg Response Rate</p>
        </div>
      </div>
      {/* Sequence List */}
      <div className="space-y-4 mb-6">
        {followUpSequences?.map((sequence) => (
          <div key={sequence?.id} className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{sequence?.name}</h3>
                  <p className="text-sm text-text-secondary">
                    {sequence?.steps} steps • Created {sequence?.created}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sequence?.status)}`}>
                  {sequence?.status}
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleSequenceAction('edit', sequence?.id)}>
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleSequenceAction('duplicate', sequence?.id)}>
                    <Icon name="Copy" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleSequenceAction('analytics', sequence?.id)}>
                    <Icon name="BarChart3" size={16} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
              <div>
                <div className="text-lg font-semibold text-foreground">{sequence?.enrolled}</div>
                <p className="text-xs text-text-secondary">Enrolled</p>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">{sequence?.completed}</div>
                <p className="text-xs text-text-secondary">Completed</p>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">{sequence?.responseRate}%</div>
                <p className="text-xs text-text-secondary">Response Rate</p>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">{sequence?.steps}</div>
                <p className="text-xs text-text-secondary">Steps</p>
              </div>
            </div>
            
            <div className="border-t border-border pt-3">
              <p className="text-sm text-text-secondary mb-2">Triggers:</p>
              <div className="flex flex-wrap gap-2">
                {sequence?.triggers?.map((trigger, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Sequence Steps Detail */}
      <div className="bg-muted rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4">Sequence Steps - New Lead Nurturing</h3>
        <div className="space-y-4">
          {sequenceSteps?.map((step, index) => (
            <div key={step?.id} className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                    {step?.step}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Icon name={getTypeIcon(step?.type)} size={16} className="text-secondary" />
                      <span className="font-medium text-foreground">{step?.type}</span>
                      <span className="text-sm text-text-secondary">• {step?.delay}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground mt-1">{step?.subject}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="Edit" size={16} />
                </Button>
              </div>
              
              <div className="bg-muted rounded p-3 mb-3">
                <p className="text-sm text-foreground whitespace-pre-line">{step?.content}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm font-semibold text-foreground">{step?.sent}</div>
                  <p className="text-xs text-text-secondary">Sent</p>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{step?.opened}</div>
                  <p className="text-xs text-text-secondary">Opened</p>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{step?.replied}</div>
                  <p className="text-xs text-text-secondary">Replied</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Create Sequence Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Create Follow-Up Sequence</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Sequence Name"
                placeholder="Enter sequence name"
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Triggers</label>
                <Select
                  options={triggerOptions}
                  placeholder="Select trigger conditions"
                  multiple
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  className="w-full h-20 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-text-secondary resize-none"
                  placeholder="Describe the purpose of this sequence..."
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateModal(false)}>
                  Create & Add Steps
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomatedFollowUp;