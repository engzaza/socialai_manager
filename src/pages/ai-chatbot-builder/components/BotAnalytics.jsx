import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BotAnalytics = ({ botId }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('conversations');

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const metricOptions = [
    { value: 'conversations', label: 'Conversations' },
    { value: 'messages', label: 'Messages' },
    { value: 'users', label: 'Unique Users' },
    { value: 'satisfaction', label: 'Satisfaction Score' }
  ];

  // Mock analytics data
  const conversationData = [
    { date: '2025-01-01', conversations: 45, messages: 180, users: 38, satisfaction: 4.2 },
    { date: '2025-01-02', conversations: 52, messages: 210, users: 44, satisfaction: 4.1 },
    { date: '2025-01-03', conversations: 38, messages: 152, users: 32, satisfaction: 4.3 },
    { date: '2025-01-04', conversations: 61, messages: 244, users: 51, satisfaction: 4.0 },
    { date: '2025-01-05', conversations: 48, messages: 192, users: 40, satisfaction: 4.2 },
    { date: '2025-01-06', conversations: 55, messages: 220, users: 46, satisfaction: 4.4 },
    { date: '2025-01-07', conversations: 42, messages: 168, users: 35, satisfaction: 4.1 }
  ];

  const platformData = [
    { name: 'WhatsApp', value: 45, color: '#25D366' },
    { name: 'Messenger', value: 30, color: '#0084FF' },
    { name: 'Website', value: 15, color: '#1E40AF' },
    { name: 'Instagram', value: 10, color: '#E4405F' }
  ];

  const topIntents = [
    { intent: 'Product Inquiry', count: 156, percentage: 32 },
    { intent: 'Support Request', count: 98, percentage: 20 },
    { intent: 'Pricing Information', count: 87, percentage: 18 },
    { intent: 'Order Status', count: 76, percentage: 16 },
    { intent: 'General Question', count: 68, percentage: 14 }
  ];

  const responseTimeData = [
    { hour: '00:00', avgTime: 1.2 },
    { hour: '04:00', avgTime: 0.8 },
    { hour: '08:00', avgTime: 2.1 },
    { hour: '12:00', avgTime: 3.2 },
    { hour: '16:00', avgTime: 2.8 },
    { hour: '20:00', avgTime: 1.9 }
  ];

  const kpiCards = [
    {
      title: 'Total Conversations',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: 'MessageSquare',
      color: 'text-primary'
    },
    {
      title: 'Unique Users',
      value: '892',
      change: '+8.3%',
      trend: 'up',
      icon: 'Users',
      color: 'text-accent'
    },
    {
      title: 'Avg. Satisfaction',
      value: '4.2/5',
      change: '+0.2',
      trend: 'up',
      icon: 'Star',
      color: 'text-warning'
    },
    {
      title: 'Resolution Rate',
      value: '87%',
      change: '-2.1%',
      trend: 'down',
      icon: 'CheckCircle',
      color: 'text-success'
    }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Bot Analytics</h2>
            <p className="text-text-secondary">Monitor your bot's performance and user interactions</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              className="w-40"
            />
            <Button variant="outline">
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards?.map((kpi, index) => (
            <div key={index} className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon name={kpi?.icon} size={20} className={kpi?.color} />
                <span className={`text-sm font-medium ${
                  kpi?.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {kpi?.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{kpi?.value}</p>
                <p className="text-sm text-text-secondary">{kpi?.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Conversation Trends</h3>
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              className="w-48"
            />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="var(--color-text-secondary)"
                />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Platform Distribution */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Platform Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {platformData?.map((platform, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: platform?.color }}
                    ></div>
                    <span className="text-sm text-foreground">{platform?.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{platform?.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Intents */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Top User Intents</h3>
            <div className="space-y-4">
              {topIntents?.map((intent, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{intent?.intent}</span>
                      <span className="text-sm text-text-secondary">{intent?.count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${intent?.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Response Time Chart */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Average Response Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="hour" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="avgTime" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { time: '2 min ago', event: 'New conversation started on WhatsApp', type: 'conversation' },
              { time: '5 min ago', event: 'Bot resolved support ticket #1247', type: 'resolution' },
              { time: '12 min ago', event: 'User provided 5-star feedback', type: 'feedback' },
              { time: '18 min ago', event: 'Failed to understand user query', type: 'error' },
              { time: '25 min ago', event: 'Lead captured from website widget', type: 'lead' }
            ]?.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-smooth">
                <div className={`w-2 h-2 rounded-full ${
                  activity?.type === 'conversation' ? 'bg-primary' :
                  activity?.type === 'resolution' ? 'bg-success' :
                  activity?.type === 'feedback' ? 'bg-warning' :
                  activity?.type === 'error'? 'bg-error' : 'bg-accent'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity?.event}</p>
                  <p className="text-xs text-text-secondary">{activity?.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotAnalytics;