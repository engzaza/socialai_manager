import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import LeadPipelineMetrics from './components/LeadPipelineMetrics';
import CustomerFinderTool from './components/CustomerFinderTool';
import CampaignManager from './components/CampaignManager';
import LeadDatabase from './components/LeadDatabase';
import AutomatedFollowUp from './components/AutomatedFollowUp';
import IntegrationPanel from './components/IntegrationPanel';
import ResponseManager from './components/ResponseManager';

const LeadGeneration = () => {
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const viewOptions = [
    { id: 'overview', label: 'Overview', description: 'Pipeline metrics and key insights' },
    { id: 'finder', label: 'Customer Finder', description: 'AI-powered prospect discovery' },
    { id: 'campaigns', label: 'Campaigns', description: 'Automated outreach management' },
    { id: 'database', label: 'Lead Database', description: 'Contact management and tracking' },
    { id: 'followup', label: 'Follow-Up', description: 'Automated nurturing sequences' },
    { id: 'responses', label: 'Responses', description: 'Manage lead interactions' },
    { id: 'integrations', label: 'Integrations', description: 'Connect external tools' }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <LeadPipelineMetrics />;
      case 'finder':
        return <CustomerFinderTool />;
      case 'campaigns':
        return <CampaignManager />;
      case 'database':
        return <LeadDatabase />;
      case 'followup':
        return <AutomatedFollowUp />;
      case 'responses':
        return <ResponseManager />;
      case 'integrations':
        return <IntegrationPanel />;
      default:
        return <LeadPipelineMetrics />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Lead Generation - SocialAI Manager</title>
        <meta name="description" content="Comprehensive AI-powered lead generation and customer acquisition tools for automated outreach and nurturing campaigns." />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Lead Generation</h1>
                <p className="text-lg text-text-secondary mt-2">
                  Automate customer acquisition and nurture leads across all channels
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-6 bg-card border border-border rounded-lg px-6 py-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">1,247</div>
                  <p className="text-sm text-text-secondary">Active Leads</p>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">23.5%</div>
                  <p className="text-sm text-text-secondary">Conversion Rate</p>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$198.6K</div>
                  <p className="text-sm text-text-secondary">Pipeline Value</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {viewOptions?.map((option) => (
                  <button
                    key={option?.id}
                    onClick={() => setActiveView(option?.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                      activeView === option?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span>{option?.label}</span>
                      <span className="text-xs opacity-75">{option?.description}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile Quick Stats */}
          <div className="lg:hidden mb-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-foreground">1,247</div>
                <p className="text-xs text-text-secondary">Active Leads</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-success">23.5%</div>
                <p className="text-xs text-text-secondary">Conversion</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-primary">$198.6K</div>
                <p className="text-xs text-text-secondary">Pipeline</p>
              </div>
            </div>
          </div>

          {/* Active View Content */}
          <div className="space-y-8">
            {renderActiveView()}
          </div>

          {/* Additional Context for Overview */}
          {activeView === 'overview' && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">New lead added from Instagram campaign</p>
                      <p className="text-xs text-text-secondary">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Follow-up sequence completed for 12 leads</p>
                      <p className="text-xs text-text-secondary">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">WhatsApp campaign paused due to rate limit</p>
                      <p className="text-xs text-text-secondary">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Sources</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-medium">IG</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">Instagram</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">456 leads</div>
                      <div className="text-xs text-success">+18%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-medium">LI</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">LinkedIn</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">324 leads</div>
                      <div className="text-xs text-success">+12%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-medium">FB</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">Facebook</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">289 leads</div>
                      <div className="text-xs text-success">+8%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <QuickActionButton />
    </div>
  );
};

export default LeadGeneration;