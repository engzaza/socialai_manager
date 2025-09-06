import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsChart = () => {
  const [chartType, setChartType] = useState('engagement');
  const [timeRange, setTimeRange] = useState('7d');

  const engagementData = [
    { name: 'Mon', likes: 245, comments: 32, shares: 18, reach: 1250 },
    { name: 'Tue', likes: 312, comments: 45, shares: 24, reach: 1680 },
    { name: 'Wed', likes: 189, comments: 28, shares: 15, reach: 980 },
    { name: 'Thu', likes: 398, comments: 67, shares: 35, reach: 2100 },
    { name: 'Fri', likes: 456, comments: 89, shares: 42, reach: 2450 },
    { name: 'Sat', likes: 523, comments: 95, shares: 58, reach: 2890 },
    { name: 'Sun', likes: 378, comments: 72, shares: 38, reach: 2200 }
  ];

  const platformData = [
    { name: 'Instagram', value: 35, color: '#E1306C' },
    { name: 'Facebook', value: 28, color: '#1877F2' },
    { name: 'LinkedIn', value: 22, color: '#0A66C2' },
    { name: 'Twitter', value: 15, color: '#1DA1F2' }
  ];

  const leadData = [
    { name: 'Week 1', leads: 45, conversions: 12 },
    { name: 'Week 2', leads: 67, conversions: 18 },
    { name: 'Week 3', leads: 89, conversions: 24 },
    { name: 'Week 4', leads: 123, conversions: 35 }
  ];

  const chartOptions = [
    { value: 'engagement', label: 'Engagement Metrics' },
    { value: 'platforms', label: 'Platform Distribution' },
    { value: 'leads', label: 'Lead Generation' }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-text-secondary capitalize">{entry?.dataKey}:</span>
              <span className="text-sm font-medium text-foreground">{entry?.value?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'engagement':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="likes"
                stackId="1"
                stroke="var(--color-primary)"
                fill="var(--color-primary)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="comments"
                stackId="1"
                stroke="var(--color-secondary)"
                fill="var(--color-secondary)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="shares"
                stackId="1"
                stroke="var(--color-accent)"
                fill="var(--color-accent)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'platforms':
        return (
          <ResponsiveContainer width="100%" height={300}>
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
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Engagement']}
                labelFormatter={(label) => `Platform: ${label}`}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'leads':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="leads" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="conversions" 
                fill="var(--color-accent)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getChartStats = () => {
    switch (chartType) {
      case 'engagement':
        const totalLikes = engagementData?.reduce((sum, day) => sum + day?.likes, 0);
        const totalComments = engagementData?.reduce((sum, day) => sum + day?.comments, 0);
        const totalShares = engagementData?.reduce((sum, day) => sum + day?.shares, 0);
        return [
          { label: 'Total Likes', value: totalLikes?.toLocaleString(), color: 'text-primary' },
          { label: 'Total Comments', value: totalComments?.toLocaleString(), color: 'text-secondary' },
          { label: 'Total Shares', value: totalShares?.toLocaleString(), color: 'text-accent' }
        ];

      case 'platforms':
        return platformData?.map(platform => ({
          label: platform?.name,
          value: `${platform?.value}%`,
          color: 'text-foreground'
        }));

      case 'leads':
        const totalLeads = leadData?.reduce((sum, week) => sum + week?.leads, 0);
        const totalConversions = leadData?.reduce((sum, week) => sum + week?.conversions, 0);
        const conversionRate = ((totalConversions / totalLeads) * 100)?.toFixed(1);
        return [
          { label: 'Total Leads', value: totalLeads?.toLocaleString(), color: 'text-primary' },
          { label: 'Conversions', value: totalConversions?.toLocaleString(), color: 'text-accent' },
          { label: 'Conversion Rate', value: `${conversionRate}%`, color: 'text-success' }
        ];

      default:
        return [];
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Analytics Overview</h3>
            <p className="text-sm text-text-secondary">Track your social media performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              className="w-40"
            />
            <Select
              options={chartOptions}
              value={chartType}
              onChange={setChartType}
              className="w-48"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {getChartStats()?.map((stat, index) => (
            <div key={index} className="text-center">
              <p className={`text-2xl font-bold ${stat?.color}`}>{stat?.value}</p>
              <p className="text-sm text-text-secondary">{stat?.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderChart()}
      </div>
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export Data
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              iconPosition="left"
            >
              Configure
            </Button>
          </div>
          <p className="text-xs text-text-secondary">
            Last updated: {new Date()?.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;