import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BotPersonalitySettings = ({ botConfig, onConfigChange }) => {
  const [activeTab, setActiveTab] = useState('personality');

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and informal' },
    { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic and positive' },
    { value: 'empathetic', label: 'Empathetic', description: 'Understanding and caring' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' }
  ];

  const responseStyleOptions = [
    { value: 'concise', label: 'Concise', description: 'Short and to the point' },
    { value: 'detailed', label: 'Detailed', description: 'Comprehensive explanations' },
    { value: 'conversational', label: 'Conversational', description: 'Natural dialogue flow' }
  ];

  const tabs = [
    { id: 'personality', label: 'Personality', icon: 'User' },
    { id: 'responses', label: 'Responses', icon: 'MessageSquare' },
    { id: 'advanced', label: 'Advanced', icon: 'Settings' }
  ];

  const handleConfigUpdate = (field, value) => {
    onConfigChange({
      ...botConfig,
      [field]: value
    });
  };

  const renderPersonalityTab = () => (
    <div className="space-y-6">
      <div>
        <Input
          label="Bot Name"
          placeholder="Enter bot name"
          value={botConfig?.name || ''}
          onChange={(e) => handleConfigUpdate('name', e?.target?.value)}
          description="This name will be displayed to users"
        />
      </div>

      <div>
        <Input
          label="Bot Description"
          placeholder="Describe your bot's purpose"
          value={botConfig?.description || ''}
          onChange={(e) => handleConfigUpdate('description', e?.target?.value)}
          description="Brief description of what your bot does"
        />
      </div>

      <div>
        <Select
          label="Tone of Voice"
          description="How should your bot communicate?"
          options={toneOptions}
          value={botConfig?.tone || 'friendly'}
          onChange={(value) => handleConfigUpdate('tone', value)}
        />
      </div>

      <div>
        <Select
          label="Primary Language"
          options={languageOptions}
          value={botConfig?.language || 'en'}
          onChange={(value) => handleConfigUpdate('language', value)}
        />
      </div>

      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2">Preview</h4>
        <div className="bg-surface rounded-lg p-3 border border-border">
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Bot" size={16} color="white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{botConfig?.name || 'Your Bot'}</p>
              <p className="text-sm text-text-secondary mt-1">
                {botConfig?.tone === 'professional' && "Hello! I'm here to assist you with your inquiries. How may I help you today?"}
                {botConfig?.tone === 'friendly' && "Hi there! 😊 I'm here to help you out. What can I do for you?"}
                {botConfig?.tone === 'casual' && "Hey! What's up? How can I help you today?"}
                {botConfig?.tone === 'enthusiastic' && "Hello! I'm super excited to help you today! What can I do for you? 🎉"}
                {botConfig?.tone === 'empathetic' && "Hello, I understand you might need some assistance. I'm here to help you through this. What's on your mind?"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResponsesTab = () => (
    <div className="space-y-6">
      <div>
        <Select
          label="Response Style"
          description="How detailed should responses be?"
          options={responseStyleOptions}
          value={botConfig?.responseStyle || 'conversational'}
          onChange={(value) => handleConfigUpdate('responseStyle', value)}
        />
      </div>

      <div>
        <Input
          label="Greeting Message"
          placeholder="Welcome message for new users"
          value={botConfig?.greetingMessage || ''}
          onChange={(e) => handleConfigUpdate('greetingMessage', e?.target?.value)}
          description="First message users see when starting a conversation"
        />
      </div>

      <div>
        <Input
          label="Fallback Message"
          placeholder="Message when bot doesn't understand"
          value={botConfig?.fallbackMessage || ''}
          onChange={(e) => handleConfigUpdate('fallbackMessage', e?.target?.value)}
          description="Shown when the bot can't understand user input"
        />
      </div>

      <div>
        <Input
          label="Goodbye Message"
          placeholder="Message when ending conversation"
          value={botConfig?.goodbyeMessage || ''}
          onChange={(e) => handleConfigUpdate('goodbyeMessage', e?.target?.value)}
          description="Final message when conversation ends"
        />
      </div>

      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Quick Response Templates</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            "I understand your concern",
            "Let me help you with that",
            "That's a great question!",
            "I'll connect you with support",
            "Thank you for your patience",
            "Is there anything else?"
          ]?.map((template, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-left justify-start"
              onClick={() => {
                // Add template to current message
                console.log('Template selected:', template);
              }}
            >
              {template}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="Response Delay (ms)"
            type="number"
            placeholder="1000"
            value={botConfig?.responseDelay || ''}
            onChange={(e) => handleConfigUpdate('responseDelay', e?.target?.value)}
            description="Delay before bot responds"
          />
        </div>
        <div>
          <Input
            label="Max Conversation Length"
            type="number"
            placeholder="50"
            value={botConfig?.maxConversationLength || ''}
            onChange={(e) => handleConfigUpdate('maxConversationLength', e?.target?.value)}
            description="Maximum number of exchanges"
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-3">AI Behavior Settings</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium text-foreground">Enable Learning</p>
              <p className="text-sm text-text-secondary">Bot learns from conversations</p>
            </div>
            <Button
              variant={botConfig?.enableLearning ? "default" : "outline"}
              size="sm"
              onClick={() => handleConfigUpdate('enableLearning', !botConfig?.enableLearning)}
            >
              {botConfig?.enableLearning ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium text-foreground">Sentiment Analysis</p>
              <p className="text-sm text-text-secondary">Detect user emotions</p>
            </div>
            <Button
              variant={botConfig?.sentimentAnalysis ? "default" : "outline"}
              size="sm"
              onClick={() => handleConfigUpdate('sentimentAnalysis', !botConfig?.sentimentAnalysis)}
            >
              {botConfig?.sentimentAnalysis ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium text-foreground">Handoff to Human</p>
              <p className="text-sm text-text-secondary">Transfer complex queries</p>
            </div>
            <Button
              variant={botConfig?.humanHandoff ? "default" : "outline"}
              size="sm"
              onClick={() => handleConfigUpdate('humanHandoff', !botConfig?.humanHandoff)}
            >
              {botConfig?.humanHandoff ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-3">Integration Settings</h4>
        <div className="space-y-3">
          <Input
            label="CRM Webhook URL"
            placeholder="https://your-crm.com/webhook"
            value={botConfig?.crmWebhook || ''}
            onChange={(e) => handleConfigUpdate('crmWebhook', e?.target?.value)}
            description="Send lead data to your CRM"
          />
          <Input
            label="Analytics Tracking ID"
            placeholder="GA-XXXXXXXXX"
            value={botConfig?.analyticsId || ''}
            onChange={(e) => handleConfigUpdate('analyticsId', e?.target?.value)}
            description="Track bot interactions"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
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
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'personality' && renderPersonalityTab()}
        {activeTab === 'responses' && renderResponsesTab()}
        {activeTab === 'advanced' && renderAdvancedTab()}
      </div>
      {/* Actions */}
      <div className="border-t border-border p-6">
        <div className="flex justify-between">
          <Button variant="outline">
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Reset to Defaults
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Icon name="Eye" size={16} className="mr-2" />
              Preview Bot
            </Button>
            <Button>
              <Icon name="Save" size={16} className="mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotPersonalitySettings;