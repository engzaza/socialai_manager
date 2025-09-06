import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BotTestingPanel = ({ botConfig, isVisible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [testingMode, setTestingMode] = useState('conversation');
  const messagesEndRef = useRef(null);

  const testScenarios = [
    {
      id: 'greeting',
      name: 'Greeting Flow',
      description: 'Test initial user interaction',
      messages: ['Hello', 'Hi there', 'Good morning']
    },
    {
      id: 'faq',
      name: 'FAQ Handling',
      description: 'Test common questions',
      messages: ['What are your hours?', 'How can I contact support?', 'What services do you offer?']
    },
    {
      id: 'lead-qualification',
      name: 'Lead Qualification',
      description: 'Test lead capture flow',
      messages: ['I need more information', 'I want to buy', 'Tell me about pricing']
    },
    {
      id: 'error-handling',
      name: 'Error Handling',
      description: 'Test fallback responses',
      messages: ['asdfgh', '???', 'I don\'t understand']
    }
  ];

  const mockBotResponses = {
    'hello': "Hi there! 👋 I'm here to help you. What can I do for you today?",
    'hi there': "Hello! Welcome! How can I assist you?",
    'good morning': "Good morning! I hope you\'re having a great day. How can I help?",
    'what are your hours': "We're available 24/7 through this chat! For phone support, we're open Monday-Friday 9AM-6PM EST.",
    'how can i contact support': "You can reach our support team through this chat, email at support@company.com, or call 1-800-123-4567.",
    'what services do you offer': "We offer social media management, content creation, lead generation, and AI chatbot services. Would you like to know more about any specific service?",
    'i need more information': "I'd be happy to provide more information! What specific area are you interested in learning about?",
    'i want to buy': "Great! I can help you get started. What product or service are you interested in purchasing?",
    'tell me about pricing': "Our pricing varies by service. Would you like me to connect you with a sales representative for detailed pricing information?",
    'default': "I'm not sure I understand. Could you please rephrase that or ask me something else? I'm here to help!"
  };

  useEffect(() => {
    if (messages?.length === 0) {
      // Add initial greeting
      setMessages([{
        id: Date.now(),
        type: 'bot',
        content: botConfig?.greetingMessage || "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date()
      }]);
    }
  }, [botConfig?.greetingMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateBotResponse = (userMessage) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const lowerMessage = userMessage?.toLowerCase();
      let response = mockBotResponses?.[lowerMessage] || mockBotResponses?.default;
      
      // Apply bot personality
      if (botConfig?.tone === 'professional') {
        response = response?.replace(/👋|😊|🎉/g, '');
      } else if (botConfig?.tone === 'enthusiastic') {
        response += ' 🎉';
      }

      const botMessage = {
        id: Date.now(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, botConfig?.responseDelay || 1000);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateBotResponse(inputMessage);
    setInputMessage('');
  };

  const handleScenarioTest = (scenario) => {
    const randomMessage = scenario?.messages?.[Math.floor(Math.random() * scenario?.messages?.length)];
    setInputMessage(randomMessage);
  };

  const clearConversation = () => {
    setMessages([{
      id: Date.now(),
      type: 'bot',
      content: botConfig?.greetingMessage || "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date()
    }]);
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1300 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg shadow-elevated w-full max-w-4xl h-[80vh] flex">
        {/* Testing Controls */}
        <div className="w-80 border-r border-border p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Bot Testing</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Mode Selector */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-2 block">Testing Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={testingMode === 'conversation' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTestingMode('conversation')}
              >
                Chat
              </Button>
              <Button
                variant={testingMode === 'scenarios' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTestingMode('scenarios')}
              >
                Scenarios
              </Button>
            </div>
          </div>

          {/* Test Scenarios */}
          <div className="flex-1">
            <h4 className="font-medium text-foreground mb-3">Quick Tests</h4>
            <div className="space-y-2">
              {testScenarios?.map((scenario) => (
                <div key={scenario?.id} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm text-foreground">{scenario?.name}</h5>
                    <Button
                      size="xs"
                      onClick={() => handleScenarioTest(scenario)}
                    >
                      Test
                    </Button>
                  </div>
                  <p className="text-xs text-text-secondary">{scenario?.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t border-border">
            <Button variant="outline" size="sm" className="w-full" onClick={clearConversation}>
              <Icon name="RotateCcw" size={14} className="mr-2" />
              Clear Chat
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Icon name="Download" size={14} className="mr-2" />
              Export Log
            </Button>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-border p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={20} color="white" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{botConfig?.name || 'Test Bot'}</h4>
                <p className="text-sm text-text-secondary">Testing Environment</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                }`}>
                  <p className="text-sm">{message?.content}</p>
                  <p className={`text-xs mt-1 ${
                    message?.type === 'user' ? 'text-primary-foreground/70' : 'text-text-secondary'
                  }`}>
                    {formatTime(message?.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e?.target?.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={!inputMessage?.trim()}>
                <Icon name="Send" size={16} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotTestingPanel;