import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContentTemplates = ({ onTemplateSelect, onSaveDraft }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      name: 'Product Launch',
      category: 'marketing',
      description: 'Announce new product releases',
      content: `🚀 Exciting News! We're thrilled to introduce our latest innovation that will revolutionize your daily routine.\n\n✨ Key Features:\n• Feature 1\n• Feature 2\n• Feature 3\n\nReady to experience the difference? Link in bio! 👆\n\n#ProductLaunch #Innovation #NewProduct`,
      platforms: ['facebook', 'instagram', 'linkedin'],
      engagement: 'High'
    },
    {
      id: 2,
      name: 'Behind the Scenes',category: 'engagement',description: 'Show your team and process',
      content: `Take a peek behind the curtain! 👀\n\nOur amazing team is hard at work creating something special for you. The dedication and passion that goes into every detail is what makes us who we are.\n\nWhat would you like to see more of behind the scenes? Let us know in the comments! 💬\n\n#BehindTheScenes #TeamWork #Process`,
      platforms: ['instagram', 'facebook', 'tiktok'],
      engagement: 'Medium'
    },
    {
      id: 3,
      name: 'Customer Testimonial',category: 'social-proof',description: 'Share customer success stories',
      content: `"This product has completely transformed how I work. The results speak for themselves!" - Sarah M. ⭐⭐⭐⭐⭐\n\nNothing makes us happier than hearing success stories from our amazing customers. Thank you for trusting us with your journey!\n\nHave a success story to share? We'd love to hear it! 💙\n\n#CustomerLove #Testimonial #Success`,
      platforms: ['linkedin', 'facebook', 'twitter'],
      engagement: 'High'
    },
    {
      id: 4,
      name: 'Educational Tip',
      category: 'education',
      description: 'Share valuable insights',
      content: `💡 Pro Tip Tuesday!\n\nDid you know that [insert valuable tip here]? This simple trick can save you hours of work and improve your results significantly.\n\nHere's how to implement it:\n1. Step one\n2. Step two\n3. Step three\n\nTry it out and let us know how it works for you! 🚀\n\n#ProTip #Education #Productivity`,
      platforms: ['linkedin', 'twitter', 'facebook'],
      engagement: 'Medium'
    },
    {
      id: 5,
      name: 'Event Announcement',category: 'events',description: 'Promote upcoming events',content: `📅 Mark Your Calendars!\n\nWe're excited to announce our upcoming [Event Name] on [Date] at [Time].\n\n🎯 What to expect:\n• Expert speakers\n• Networking opportunities\n• Exclusive insights\n• And much more!\n\nSpaces are limited - register now! Link in bio 👆\n\n#Event #Networking #Learning`,
      platforms: ['linkedin', 'facebook', 'twitter'],
      engagement: 'High'
    },
    {
      id: 6,
      name: 'Motivational Monday',
      category: 'inspiration',
      description: 'Start the week with motivation',
      content: `🌟 Monday Motivation\n\n"Success is not final, failure is not fatal: it is the courage to continue that counts."\n\nAs we start this new week, remember that every challenge is an opportunity to grow stronger. What goals are you working towards this week?\n\nShare your Monday motivation in the comments! 💪\n\n#MondayMotivation #Success #Goals`,
      platforms: ['linkedin', 'instagram', 'facebook'],
      engagement: 'Medium'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates', count: templates?.length },
    { id: 'marketing', label: 'Marketing', count: templates?.filter(t => t?.category === 'marketing')?.length },
    { id: 'engagement', label: 'Engagement', count: templates?.filter(t => t?.category === 'engagement')?.length },
    { id: 'social-proof', label: 'Social Proof', count: templates?.filter(t => t?.category === 'social-proof')?.length },
    { id: 'education', label: 'Educational', count: templates?.filter(t => t?.category === 'education')?.length },
    { id: 'events', label: 'Events', count: templates?.filter(t => t?.category === 'events')?.length },
    { id: 'inspiration', label: 'Inspiration', count: templates?.filter(t => t?.category === 'inspiration')?.length }
  ];

  const savedDrafts = [
    {
      id: 1,
      name: 'Summer Sale Campaign',
      lastModified: '2025-01-05',
      platforms: ['facebook', 'instagram'],
      content: 'Summer sale draft content...'
    },
    {
      id: 2,
      name: 'Team Introduction Post',
      lastModified: '2025-01-04',
      platforms: ['linkedin'],
      content: 'Team introduction draft...'
    }
  ];

  const filteredTemplates = templates?.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: 'Facebook',
      instagram: 'Instagram',
      twitter: 'Twitter',
      linkedin: 'Linkedin',
      tiktok: 'Music',
      youtube: 'Youtube'
    };
    return icons?.[platform] || 'Globe';
  };

  const getEngagementColor = (engagement) => {
    switch (engagement) {
      case 'High': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Low': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="FileText" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Templates & Drafts</h3>
      </div>
      {/* Search and Filter */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="mb-4"
        />
        
        <div className="flex flex-wrap gap-2">
          {categories?.map(category => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:bg-muted/80'
              }`}
            >
              {category?.label} ({category?.count})
            </button>
          ))}
        </div>
      </div>
      {/* Templates Grid */}
      <div className="mb-8">
        <h4 className="font-medium text-foreground mb-4">Content Templates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates?.map(template => (
            <div key={template?.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="font-medium text-foreground">{template?.name}</h5>
                  <p className="text-sm text-text-secondary">{template?.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(template?.engagement)}`}>
                  {template?.engagement}
                </span>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-foreground line-clamp-3">
                  {template?.content?.substring(0, 120)}...
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {template?.platforms?.slice(0, 3)?.map(platform => (
                    <div key={platform} className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                      <Icon name={getPlatformIcon(platform)} size={12} />
                    </div>
                  ))}
                  {template?.platforms?.length > 3 && (
                    <span className="text-xs text-text-secondary">+{template?.platforms?.length - 3}</span>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTemplateSelect(template)}
                  iconName="Plus"
                >
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTemplates?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No templates found matching your criteria</p>
          </div>
        )}
      </div>
      {/* Saved Drafts */}
      <div>
        <h4 className="font-medium text-foreground mb-4">Saved Drafts</h4>
        <div className="space-y-3">
          {savedDrafts?.map(draft => (
            <div key={draft?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{draft?.name}</p>
                  <p className="text-sm text-text-secondary">
                    Last modified: {new Date(draft.lastModified)?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {draft?.platforms?.map(platform => (
                    <div key={platform} className="w-5 h-5 bg-muted rounded flex items-center justify-center">
                      <Icon name={getPlatformIcon(platform)} size={10} />
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onTemplateSelect(draft)}
                  iconName="Edit"
                />
              </div>
            </div>
          ))}
          
          {savedDrafts?.length === 0 && (
            <div className="text-center py-6 border border-dashed border-border rounded-lg">
              <Icon name="FileText" size={32} className="text-text-secondary mx-auto mb-2" />
              <p className="text-text-secondary text-sm">No saved drafts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentTemplates;