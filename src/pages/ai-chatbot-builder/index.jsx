import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BotFlowBuilder from './components/BotFlowBuilder';
import BotPersonalitySettings from './components/BotPersonalitySettings';
import BotTemplates from './components/BotTemplates';
import BotTestingPanel from './components/BotTestingPanel';
import PlatformDeployment from './components/PlatformDeployment';
import BotAnalytics from './components/BotAnalytics';

const AIChatbotBuilder = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [showTestingPanel, setShowTestingPanel] = useState(false);
  const [currentBot, setCurrentBot] = useState(null);
  const [botConfig, setBotConfig] = useState({
    name: 'Customer Support Bot',
    description: 'AI-powered customer support assistant',
    tone: 'friendly',
    language: 'en',
    responseStyle: 'conversational',
    greetingMessage: 'Hello! How can I help you today?',
    fallbackMessage: 'I\'m not sure I understand. Could you please rephrase that?',
    goodbyeMessage: 'Thank you for chatting with me. Have a great day!',
    responseDelay: 1000,
    enableLearning: true,
    sentimentAnalysis: false,
    humanHandoff: true
  });

  // Flow builder state
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const tabs = [
    { id: 'templates', label: 'Templates', icon: 'Layout' },
    { id: 'builder', label: 'Flow Builder', icon: 'GitBranch' },
    { id: 'personality', label: 'Personality', icon: 'User' },
    { id: 'deployment', label: 'Deployment', icon: 'Rocket' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const handleTemplateSelect = (template) => {
    setBotConfig(prev => ({
      ...prev,
      name: template?.name,
      description: template?.description
    }));
    
    // Create initial flow based on template
    const initialNodes = [
      {
        id: 'start',
        type: 'start',
        position: { x: 100, y: 100 },
        data: { label: 'Start', content: template?.preview }
      },
      {
        id: 'welcome',
        type: 'message',
        position: { x: 300, y: 100 },
        data: { label: 'Welcome Message', content: template?.preview }
      }
    ];
    
    const initialEdges = [
      { id: 'start-welcome', source: 'start', target: 'welcome' }
    ];
    
    setNodes(initialNodes);
    setEdges(initialEdges);
    setActiveTab('builder');
  };

  const handleCreateFromScratch = () => {
    setNodes([]);
    setEdges([]);
    setActiveTab('builder');
  };

  const handleNodeAdd = (newNode) => {
    setNodes(prev => [...prev, newNode]);
  };

  const handleNodesChange = (changes) => {
    // Handle node changes (position, deletion, etc.)
    console.log('Nodes changed:', changes);
  };

  const handleEdgesChange = (changes) => {
    // Handle edge changes
    console.log('Edges changed:', changes);
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const handleConfigChange = (newConfig) => {
    setBotConfig(newConfig);
  };

  const handleDeploy = (deploymentData) => {
    console.log('Deploying bot:', deploymentData);
    // Handle deployment logic
    alert('Bot deployed successfully!');
  };

  const handleTestBot = () => {
    setShowTestingPanel(true);
  };

  const handleSaveBot = () => {
    const botData = {
      config: botConfig,
      nodes,
      edges,
      timestamp: new Date()?.toISOString()
    };
    console.log('Saving bot:', botData);
    alert('Bot saved successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'templates':
        return (
          <BotTemplates
            onTemplateSelect={handleTemplateSelect}
            onCreateFromScratch={handleCreateFromScratch}
          />
        );
      
      case 'builder':
        return (
          <BotFlowBuilder
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onNodeAdd={handleNodeAdd}
            onNodeSelect={handleNodeSelect}
            selectedNode={selectedNode}
          />
        );
      
      case 'personality':
        return (
          <BotPersonalitySettings
            botConfig={botConfig}
            onConfigChange={handleConfigChange}
          />
        );
      
      case 'deployment':
        return (
          <PlatformDeployment
            botConfig={botConfig}
            onDeploy={handleDeploy}
          />
        );
      
      case 'analytics':
        return (
          <BotAnalytics
            botId={currentBot?.id}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="h-screen flex flex-col">
          {/* Top Bar */}
          <div className="bg-surface border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Bot" size={20} color="white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">AI Chatbot Builder</h1>
                    <p className="text-sm text-text-secondary">
                      {botConfig?.name || 'Create intelligent chatbots for your business'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" onClick={handleTestBot}>
                  <Icon name="Play" size={16} className="mr-2" />
                  Test Bot
                </Button>
                <Button variant="outline" size="sm" onClick={handleSaveBot}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Save
                </Button>
                <Button size="sm">
                  <Icon name="Rocket" size={16} className="mr-2" />
                  Deploy
                </Button>
              </div>
            </div>

            {/* Tab Navigation */}
            <nav className="flex space-x-8 mt-4">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-smooth ${
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

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            {renderTabContent()}
          </div>
        </div>
      </div>
      {/* Testing Panel */}
      <BotTestingPanel
        botConfig={botConfig}
        isVisible={showTestingPanel}
        onClose={() => setShowTestingPanel(false)}
      />
      <QuickActionButton />
    </div>
  );
};

export default AIChatbotBuilder;