import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BotTemplates = ({ onTemplateSelect, onCreateFromScratch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Templates', count: 12 },
    { id: 'customer-service', label: 'Customer Service', count: 4 },
    { id: 'lead-generation', label: 'Lead Generation', count: 3 },
    { id: 'ecommerce', label: 'E-commerce', count: 3 },
    { id: 'appointment', label: 'Appointments', count: 2 }
  ];

  const templates = [
    {
      id: 'customer-support',
      name: 'Customer Support Bot',
      description: 'Handle common customer inquiries, troubleshooting, and support ticket creation',
      category: 'customer-service',
      features: ['FAQ Automation', 'Ticket Creation', 'Live Agent Handoff', 'Order Status'],
      complexity: 'Beginner',
      estimatedTime: '15 min',
      icon: 'Headphones',
      color: 'bg-primary',
      preview: 'Hi! I\'m here to help with your questions. What can I assist you with today?'
    },
    {
      id: 'lead-qualifier',
      name: 'Lead Qualification Bot',
      description: 'Qualify potential customers and collect contact information for sales team',
      category: 'lead-generation',
      features: ['Lead Scoring', 'Contact Collection', 'CRM Integration', 'Follow-up Scheduling'],
      complexity: 'Intermediate',
      estimatedTime: '25 min',
      icon: 'Target',
      color: 'bg-accent',
      preview: 'Welcome! I\'d love to learn more about your business needs. What industry are you in?'
    },
    {
      id: 'ecommerce-assistant',
      name: 'E-commerce Assistant',
      description: 'Help customers find products, check inventory, and process orders',
      category: 'ecommerce',
      features: ['Product Search', 'Inventory Check', 'Order Tracking', 'Recommendations'],
      complexity: 'Advanced',
      estimatedTime: '35 min',
      icon: 'ShoppingCart',
      color: 'bg-secondary',
      preview: 'Hi! Looking for something specific? I can help you find the perfect product!'
    },
    {
      id: 'appointment-booking',
      name: 'Appointment Booking Bot',
      description: 'Schedule appointments, send reminders, and manage calendar availability',
      category: 'appointment',
      features: ['Calendar Integration', 'Availability Check', 'Reminders', 'Rescheduling'],
      complexity: 'Intermediate',
      estimatedTime: '30 min',
      icon: 'Calendar',
      color: 'bg-warning',
      preview: 'I can help you schedule an appointment. What service are you interested in?'
    },
    {
      id: 'faq-bot',
      name: 'FAQ Bot',
      description: 'Answer frequently asked questions with intelligent keyword matching',
      category: 'customer-service',
      features: ['Smart Search', 'Category Filtering', 'Feedback Collection', 'Analytics'],
      complexity: 'Beginner',
      estimatedTime: '10 min',
      icon: 'HelpCircle',
      color: 'bg-primary',
      preview: 'I have answers to common questions. What would you like to know?'
    },
    {
      id: 'feedback-collector',
      name: 'Feedback Collection Bot',
      description: 'Gather customer feedback, reviews, and satisfaction ratings',
      category: 'customer-service',
      features: ['Rating System', 'Review Collection', 'Sentiment Analysis', 'Reporting'],
      complexity: 'Beginner',
      estimatedTime: '20 min',
      icon: 'Star',
      color: 'bg-accent',
      preview: 'We value your feedback! How was your experience with us today?'
    }
  ];

  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Choose a Template</h2>
            <p className="text-text-secondary">Start with a pre-built bot template or create from scratch</p>
          </div>
          <Button onClick={onCreateFromScratch} variant="outline">
            <Icon name="Plus" size={16} className="mr-2" />
            Start from Scratch
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        {/* Categories Sidebar */}
        <div className="w-64 border-r border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Categories</h3>
          <div className="space-y-2">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category?.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-smooth ${
                  selectedCategory === category?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <span className="text-sm font-medium">{category?.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-text-secondary'
                }`}>
                  {category?.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          {filteredTemplates?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Icon name="Search" size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No templates found</h3>
              <p className="text-text-secondary text-center">
                Try adjusting your search or category filter
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates?.map((template) => (
                <div
                  key={template?.id}
                  className="bg-surface border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth cursor-pointer"
                  onClick={() => onTemplateSelect(template)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${template?.color} rounded-lg flex items-center justify-center`}>
                      <Icon name={template?.icon} size={24} color="white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(template?.complexity)}`}>
                        {template?.complexity}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-foreground mb-2">{template?.name}</h3>
                    <p className="text-sm text-text-secondary mb-3">{template?.description}</p>
                    
                    {/* Preview */}
                    <div className="bg-muted rounded-lg p-3 mb-3">
                      <p className="text-xs text-text-secondary mb-1">Preview:</p>
                      <p className="text-sm text-foreground italic">"{template?.preview}"</p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template?.features?.slice(0, 3)?.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-xs text-text-secondary rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {template?.features?.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-xs text-text-secondary rounded">
                          +{template?.features?.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <Icon name="Clock" size={12} />
                      <span>{template?.estimatedTime}</span>
                    </div>
                    <Button size="sm">
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotTemplates;