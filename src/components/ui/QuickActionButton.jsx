import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const quickActions = [
    {
      id: 'create-post',
      label: 'Create Post',
      icon: 'PenTool',
      description: 'AI-powered content creation',
      action: () => navigate('/content-creation'),
      color: 'bg-primary'
    },
    {
      id: 'schedule-post',
      label: 'Schedule Post',
      icon: 'Calendar',
      description: 'Add to publishing calendar',
      action: () => navigate('/publishing-calendar'),
      color: 'bg-secondary'
    },
    {
      id: 'generate-lead',
      label: 'Generate Leads',
      icon: 'Target',
      description: 'Start lead generation campaign',
      action: () => navigate('/lead-generation'),
      color: 'bg-accent'
    },
    {
      id: 'create-chatbot',
      label: 'Create Chatbot',
      icon: 'Bot',
      description: 'Build AI chatbot flow',
      action: () => navigate('/ai-chatbot-builder'),
      color: 'bg-warning'
    }
  ];

  // Get contextual actions based on current page
  const getContextualActions = () => {
    switch (location?.pathname) {
      case '/main-dashboard':
        return quickActions;
      case '/content-creation':
        return quickActions?.filter(action => 
          ['schedule-post', 'generate-lead']?.includes(action?.id)
        );
      case '/publishing-calendar':
        return quickActions?.filter(action => 
          ['create-post', 'generate-lead']?.includes(action?.id)
        );
      case '/lead-generation':
        return quickActions?.filter(action => 
          ['create-post', 'create-chatbot']?.includes(action?.id)
        );
      case '/ai-chatbot-builder':
        return quickActions?.filter(action => 
          ['create-post', 'generate-lead']?.includes(action?.id)
        );
      default:
        return quickActions?.slice(0, 2); // Show top 2 actions for other pages
    }
  };

  const contextualActions = getContextualActions();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleActionClick = (action) => {
    action?.action();
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-1200">
      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2">
          <div className="bg-popover border border-border rounded-lg shadow-elevated p-2 min-w-64">
            <div className="p-2 border-b border-border mb-2">
              <h3 className="font-semibold text-sm text-foreground">Quick Actions</h3>
              <p className="text-xs text-text-secondary">Create and manage content instantly</p>
            </div>
            <div className="space-y-1">
              {contextualActions?.map((action) => (
                <button
                  key={action?.id}
                  onClick={() => handleActionClick(action)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-smooth text-left"
                >
                  <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={action?.icon} size={18} color="white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{action?.label}</p>
                    <p className="text-xs text-text-secondary">{action?.description}</p>
                  </div>
                </button>
              ))}
            </div>
            {contextualActions?.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-sm text-text-secondary">No quick actions available</p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Main Button */}
      <Button
        onClick={toggleMenu}
        size="lg"
        className={`w-14 h-14 rounded-full shadow-elevated transition-all duration-300 ${
          isOpen 
            ? 'bg-error hover:bg-error/90 rotate-45' :'bg-primary hover:bg-primary/90 rotate-0'
        }`}
      >
        <Icon 
          name={isOpen ? 'X' : 'Plus'} 
          size={24} 
          color="white"
          className="transition-transform duration-300"
        />
      </Button>
      {/* Keyboard Shortcut Hint */}
      {!isOpen && (
        <div className="absolute -top-12 right-0 bg-popover border border-border rounded px-2 py-1 text-xs text-text-secondary opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Press Ctrl+K for quick actions
        </div>
      )}
    </div>
  );
};

export default QuickActionButton;