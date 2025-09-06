import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ContentTypeSelector from './components/ContentTypeSelector';
import PlatformSelector from './components/PlatformSelector';
import AITextGenerator from './components/AITextGenerator';
import MediaGenerator from './components/MediaGenerator';
import ContentEditor from './components/ContentEditor';
import ContentPreview from './components/ContentPreview';
import SchedulingOptions from './components/SchedulingOptions';
import ContentTemplates from './components/ContentTemplates';

const ContentCreation = () => {
  const navigate = useNavigate();
  
  // State management
  const [selectedContentType, setSelectedContentType] = useState('post');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'facebook']);
  const [content, setContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeTab, setActiveTab] = useState('create');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Handle content generation from AI
  const handleAIContentGenerate = (generatedContent) => {
    setContent(generatedContent);
  };

  // Handle media generation/selection
  const handleMediaGenerate = (media) => {
    setSelectedMedia(media);
  };

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setContent(template?.content);
    setSelectedPlatforms(template?.platforms);
    setActiveTab('create');
  };

  // Handle scheduling/publishing
  const handleSchedule = (scheduleData) => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      if (scheduleData?.type === 'now') {
        // Redirect to dashboard after publishing
        navigate('/main-dashboard');
      } else {
        // Redirect to calendar after scheduling
        navigate('/publishing-calendar');
      }
    }, 3000);
  };

  // Handle content type change
  const handleContentTypeChange = (type) => {
    setSelectedContentType(type);
    // Reset media when changing content type
    setSelectedMedia(null);
  };

  // Handle platform change
  const handlePlatformChange = (platforms) => {
    setSelectedPlatforms(platforms);
  };

  // Handle content change
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  // Tab configuration
  const tabs = [
    { id: 'create', label: 'Create Content', icon: 'PenTool' },
    { id: 'templates', label: 'Templates & Drafts', icon: 'FileText' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Content Creation</h1>
                <p className="text-text-secondary mt-2">
                  Create engaging AI-powered content for your social media platforms
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/publishing-calendar')}
                  iconName="Calendar"
                  iconPosition="left"
                >
                  View Calendar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/main-dashboard')}
                  iconName="BarChart3"
                  iconPosition="left"
                >
                  Analytics
                </Button>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <p className="text-success font-medium">
                  Content scheduled successfully! Redirecting...
                </p>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'create' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Creation Tools */}
              <div className="lg:col-span-2 space-y-6">
                {/* Content Type Selection */}
                <ContentTypeSelector
                  selectedType={selectedContentType}
                  onTypeChange={handleContentTypeChange}
                />

                {/* Platform Selection */}
                <PlatformSelector
                  selectedPlatforms={selectedPlatforms}
                  onPlatformChange={handlePlatformChange}
                />

                {/* AI Text Generator */}
                <AITextGenerator
                  onContentGenerate={handleAIContentGenerate}
                  selectedPlatforms={selectedPlatforms}
                />

                {/* Media Generator */}
                <MediaGenerator
                  onMediaGenerate={handleMediaGenerate}
                  contentType={selectedContentType}
                />

                {/* Content Editor */}
                <ContentEditor
                  content={content}
                  onContentChange={handleContentChange}
                  selectedPlatforms={selectedPlatforms}
                />

                {/* Scheduling Options */}
                <SchedulingOptions
                  onSchedule={handleSchedule}
                  selectedPlatforms={selectedPlatforms}
                />
              </div>

              {/* Right Column - Preview */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <ContentPreview
                    content={content}
                    media={selectedMedia}
                    selectedPlatforms={selectedPlatforms}
                    contentType={selectedContentType}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Templates Tab */
            (<div className="max-w-4xl mx-auto">
              <ContentTemplates
                onTemplateSelect={handleTemplateSelect}
                onSaveDraft={() => {}}
              />
            </div>)
          )}
        </div>
      </main>
      <QuickActionButton />
    </div>
  );
};

export default ContentCreation;