import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('main-brand');
  const searchRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'LayoutDashboard' },
    { label: 'Accounts', path: '/social-media-accounts', icon: 'Users' },
    { label: 'Create', path: '/content-creation', icon: 'PenTool' },
    { label: 'Calendar', path: '/publishing-calendar', icon: 'Calendar' },
    { label: 'Chatbots', path: '/ai-chatbot-builder', icon: 'Bot' },
    { label: 'Leads', path: '/lead-generation', icon: 'Target' }
  ];

  const accounts = [
    { value: 'main-brand', label: 'Main Brand', description: '5 platforms connected' },
    { value: 'client-a', label: 'Client A Marketing', description: '3 platforms connected' },
    { value: 'client-b', label: 'Client B Corp', description: '4 platforms connected' },
    { value: 'personal', label: 'Personal Account', description: '2 platforms connected' }
  ];

  const notifications = [
    { id: 1, type: 'success', message: 'Post published successfully on Instagram', time: '2 min ago', unread: true },
    { id: 2, type: 'warning', message: 'Facebook token expires in 3 days', time: '1 hour ago', unread: true },
    { id: 3, type: 'info', message: 'New lead captured from LinkedIn campaign', time: '3 hours ago', unread: false },
    { id: 4, type: 'error', message: 'Failed to publish to Twitter - check connection', time: '5 hours ago', unread: false }
  ];

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsSearchExpanded(false);
      }
      if (accountDropdownRef?.current && !accountDropdownRef?.current?.contains(event?.target)) {
        setIsAccountDropdownOpen(false);
      }
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  const handleAccountSwitch = (accountValue) => {
    setSelectedAccount(accountValue);
    setIsAccountDropdownOpen(false);
    console.log('Switched to account:', accountValue);
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    // Mark as read and navigate to relevant section
    if (notification?.type === 'error') {
      navigate('/social-media-accounts');
    } else if (notification?.message?.includes('lead')) {
      navigate('/lead-generation');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-secondary';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border shadow-soft z-1000">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavigation('/main-dashboard')}
            className="flex items-center space-x-3 hover:opacity-80 transition-smooth"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">SocialAI Manager</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div ref={searchRef} className="relative">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className={`flex items-center transition-all duration-300 ${
                isSearchExpanded ? 'w-80' : 'w-10'
              }`}>
                <Input
                  type="search"
                  placeholder="Search content, leads, campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  onFocus={() => setIsSearchExpanded(true)}
                  className={`transition-all duration-300 ${
                    isSearchExpanded ? 'opacity-100 w-full' : 'opacity-0 w-0'
                  }`}
                />
                <Button
                  type={isSearchExpanded ? 'submit' : 'button'}
                  variant="ghost"
                  size="icon"
                  onClick={() => !isSearchExpanded && setIsSearchExpanded(true)}
                  className="ml-2"
                >
                  <Icon name="Search" size={18} />
                </Button>
              </div>
            </form>
          </div>

          {/* Notifications */}
          <div ref={notificationRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-96 bg-popover border border-border rounded-lg shadow-elevated z-1100">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <button
                      key={notification?.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full p-4 text-left hover:bg-muted transition-smooth border-b border-border last:border-b-0 ${
                        notification?.unread ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon
                          name={getNotificationIcon(notification?.type)}
                          size={16}
                          className={getNotificationColor(notification?.type)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{notification?.message}</p>
                          <p className="text-xs text-text-secondary mt-1">{notification?.time}</p>
                        </div>
                        {notification?.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Account Switcher */}
          <div ref={accountDropdownRef} className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="Building" size={16} color="white" />
              </div>
              <span className="hidden md:block text-sm font-medium">
                {accounts?.find(acc => acc?.value === selectedAccount)?.label}
              </span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {isAccountDropdownOpen && (
              <div className="absolute right-0 top-12 w-72 bg-popover border border-border rounded-lg shadow-elevated z-1100">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Switch Account</h3>
                </div>
                <div className="p-2">
                  {accounts?.map((account) => (
                    <button
                      key={account?.value}
                      onClick={() => handleAccountSwitch(account?.value)}
                      className={`w-full p-3 text-left rounded-lg hover:bg-muted transition-smooth ${
                        selectedAccount === account?.value ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                          <Icon name="Building" size={18} color="white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{account?.label}</p>
                          <p className="text-sm text-text-secondary">{account?.description}</p>
                        </div>
                        {selectedAccount === account?.value && (
                          <Icon name="Check" size={16} className="text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => handleNavigation('/social-media-accounts')}
                  >
                    Manage Accounts
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Icon name="Menu" size={18} />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-border bg-surface">
        <nav className="flex overflow-x-auto">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex flex-col items-center space-y-1 px-4 py-3 text-xs font-medium whitespace-nowrap transition-smooth ${
                  isActive
                    ? 'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;