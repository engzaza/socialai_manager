import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ResponseManager = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('responses');

  const recentResponses = [
    {
      id: 1,
      leadName: "Sarah Johnson",
      leadEmail: "sarah.johnson@email.com",
      platform: "WhatsApp",
      message: "Hi! I\'m interested in learning more about your fitness coaching services. Can you tell me about your pricing?",
      timestamp: "2025-01-06 10:30 AM",
      status: "unread",
      sentiment: "positive",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      leadName: "Michael Chen",
      leadEmail: "m.chen@techstartup.com",
      platform: "Email",
      message: "Thanks for reaching out. I\'d like to schedule a demo to see how your platform can help our marketing team.",
      timestamp: "2025-01-06 09:45 AM",
      status: "replied",
      sentiment: "positive",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      leadName: "Emma Wilson",
      leadEmail: "emma.w@fashionbrand.com",
      platform: "Instagram",
      message: "Not interested at the moment, but please keep me updated on new features.",
      timestamp: "2025-01-06 08:20 AM",
      status: "read",
      sentiment: "neutral",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  const quickTemplates = [
    {
      id: 1,
      name: "Pricing Inquiry",
      category: "Sales",
      content: `Hi {{firstName}},\n\nThank you for your interest! I'd be happy to discuss our pricing options with you.\n\nWe have several packages designed to fit different business needs:\n- Starter: $99/month\n- Professional: $199/month\n- Enterprise: Custom pricing\n\nWould you like to schedule a quick call to discuss which option would work best for {{companyName}}?\n\nBest regards,\n{{senderName}}`,
      usage: 45,
      responseRate: 68
    },
    {
      id: 2,
      name: "Demo Request",
      category: "Sales",
      content: `Hi {{firstName}},\n\nGreat to hear from you! I'd love to show you how our platform can help {{companyName}} achieve your marketing goals.\n\nI have availability for a 30-minute demo:\n- Tomorrow at 2:00 PM\n- Wednesday at 10:00 AM\n- Thursday at 3:00 PM\n\nWhich time works best for you?\n\nLooking forward to connecting!\n{{senderName}}`,
      usage: 32,
      responseRate: 72
    },
    {
      id: 3,
      name: "Follow-up After No Response",
      category: "Follow-up",
      content: `Hi {{firstName}},\n\nI wanted to follow up on my previous message about helping {{companyName}} with your marketing automation.\n\nI understand you're probably busy, so I'll keep this brief. We've helped similar businesses increase their lead generation by 300% in just 60 days.\n\nIf you're interested in learning how, I'd be happy to share a quick case study. Just let me know!\n\nBest,\n{{senderName}}`,
      usage: 28,
      responseRate: 45
    }
  ];

  const qualificationQuestions = [
    {
      id: 1,
      question: "What\'s your current monthly marketing budget?",
      type: "multiple_choice",
      options: ["Under $1,000", "$1,000-$5,000", "$5,000-$10,000", "Over $10,000"],
      weight: 25
    },
    {
      id: 2,
      question: "How many employees does your company have?",
      type: "multiple_choice",
      options: ["1-10", "11-50", "51-200", "200+"],
      weight: 20
    },
    {
      id: 3,
      question: "What\'s your biggest marketing challenge?",
      type: "text",
      weight: 30
    },
    {
      id: 4,
      question: "When are you looking to implement a solution?",
      type: "multiple_choice",
      options: ["Immediately", "Within 1 month", "Within 3 months", "Just researching"],
      weight: 25
    }
  ];

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'WhatsApp': return 'MessageCircle';
      case 'Email': return 'Mail';
      case 'Instagram': return 'Instagram';
      case 'Facebook': return 'Facebook';
      case 'LinkedIn': return 'Linkedin';
      default: return 'MessageSquare';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'neutral': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-error';
      case 'read': return 'bg-warning';
      case 'replied': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const handleQuickReply = (responseId, templateId) => {
    console.log('Quick reply:', responseId, templateId);
  };

  const handleMarkAsRead = (responseId) => {
    console.log('Mark as read:', responseId);
  };

  const handleQualifyLead = (responseId) => {
    console.log('Qualify lead:', responseId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Response Manager</h2>
          <p className="text-sm text-text-secondary">Manage lead responses and automate qualification</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setShowTemplateModal(true)}>
            <Icon name="Plus" size={16} className="mr-2" />
            New Template
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Auto-Reply Settings
          </Button>
        </div>
      </div>
      {/* Response Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="MessageCircle" size={20} className="text-primary" />
            <span className="text-xs text-success">+15%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">127</div>
          <p className="text-sm text-text-secondary">New Responses</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Clock" size={20} className="text-warning" />
            <span className="text-xs text-error">+5%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">2.3h</div>
          <p className="text-sm text-text-secondary">Avg Response Time</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="TrendingUp" size={20} className="text-success" />
            <span className="text-xs text-success">+12%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">68%</div>
          <p className="text-sm text-text-secondary">Response Rate</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="CheckCircle" size={20} className="text-accent" />
            <span className="text-xs text-success">+8%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">34</div>
          <p className="text-sm text-text-secondary">Qualified Today</p>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        <button
          onClick={() => setActiveTab('responses')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
            activeTab === 'responses' ?'bg-card text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
          }`}
        >
          Recent Responses
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
            activeTab === 'templates' ?'bg-card text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
          }`}
        >
          Quick Templates
        </button>
        <button
          onClick={() => setActiveTab('qualification')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
            activeTab === 'qualification'
              ? 'bg-card text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
          }`}
        >
          Qualification
        </button>
      </div>
      {/* Recent Responses Tab */}
      {activeTab === 'responses' && (
        <div className="space-y-4">
          {recentResponses?.map((response) => (
            <div key={response?.id} className="bg-muted rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={response?.avatar}
                      alt={response?.leadName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(response?.status)} rounded-full border-2 border-card`}></div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">{response?.leadName}</h4>
                      <Icon name={getPlatformIcon(response?.platform)} size={14} className="text-secondary" />
                      <span className={`text-xs ${getSentimentColor(response?.sentiment)}`}>
                        {response?.sentiment}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">{response?.timestamp}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(response?.id)}>
                    <Icon name="Eye" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleQualifyLead(response?.id)}>
                    <Icon name="UserCheck" size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="bg-card rounded p-3 mb-3">
                <p className="text-sm text-foreground">{response?.message}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <Select
                  options={quickTemplates?.map(t => ({ value: t?.id, label: t?.name }))}
                  placeholder="Select quick reply template"
                  className="flex-1 mr-3"
                />
                <Button size="sm" onClick={() => handleQuickReply(response?.id, selectedTemplate)}>
                  <Icon name="Send" size={16} className="mr-2" />
                  Send Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Quick Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickTemplates?.map((template) => (
            <div key={template?.id} className="bg-muted rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">{template?.name}</h4>
                  <p className="text-sm text-text-secondary">{template?.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="bg-card rounded p-3 mb-3 max-h-32 overflow-y-auto">
                <p className="text-sm text-foreground whitespace-pre-line">{template?.content}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Used {template?.usage} times</span>
                <span className="text-success">{template?.responseRate}% response rate</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Qualification Tab */}
      {activeTab === 'qualification' && (
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-4">Automated Qualification Questions</h3>
            <p className="text-sm text-text-secondary mb-4">
              These questions are automatically sent to new leads to help qualify them based on your criteria.
            </p>
            
            <div className="space-y-4">
              {qualificationQuestions?.map((question, index) => (
                <div key={question?.id} className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-foreground">Weight: {question?.weight}%</span>
                      </div>
                      <p className="text-foreground mb-2">{question?.question}</p>
                      {question?.options && (
                        <div className="flex flex-wrap gap-2">
                          {question?.options?.map((option, optIndex) => (
                            <span key={optIndex} className="px-2 py-1 bg-muted text-text-secondary text-sm rounded">
                              {option}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <span className="text-sm text-text-secondary">
                Leads scoring 70+ are automatically marked as qualified
              </span>
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Add Question
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Create Quick Reply Template</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowTemplateModal(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Template Name"
                placeholder="Enter template name"
              />
              
              <Select
                label="Category"
                options={[
                  { value: 'sales', label: 'Sales' },
                  { value: 'support', label: 'Support' },
                  { value: 'follow-up', label: 'Follow-up' },
                  { value: 'qualification', label: 'Qualification' }
                ]}
                placeholder="Select category"
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Template Content</label>
                <textarea
                  className="w-full h-40 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-text-secondary resize-none"
                  placeholder="Hi {{firstName}},&#10;&#10;Thank you for your message...&#10;&#10;Best regards,&#10;{{senderName}}"
                />
                <p className="text-xs text-text-secondary mt-1">
                  Use variables: {`{{firstName}}`}, {`{{lastName}}`}, {`{{companyName}}`}, {`{{senderName}}`}
                </p>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowTemplateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowTemplateModal(false)}>
                  Create Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponseManager;