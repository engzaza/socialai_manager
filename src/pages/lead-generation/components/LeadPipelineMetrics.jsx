import React from 'react';
import Icon from '../../../components/AppIcon';

const LeadPipelineMetrics = () => {
  const pipelineData = [
    {
      stage: "Prospects",
      count: 1247,
      value: "$124,700",
      change: "+12.5%",
      changeType: "positive",
      color: "bg-blue-500",
      icon: "Users"
    },
    {
      stage: "Qualified",
      count: 423,
      value: "$84,600",
      change: "+8.3%",
      changeType: "positive",
      color: "bg-yellow-500",
      icon: "UserCheck"
    },
    {
      stage: "Engaged",
      count: 186,
      value: "$55,800",
      change: "-2.1%",
      changeType: "negative",
      color: "bg-orange-500",
      icon: "MessageCircle"
    },
    {
      stage: "Converted",
      count: 67,
      value: "$33,500",
      change: "+15.7%",
      changeType: "positive",
      color: "bg-green-500",
      icon: "CheckCircle"
    }
  ];

  const conversionRate = 5.4;
  const avgDealSize = 500;
  const totalRevenue = 198600;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Lead Pipeline</h2>
          <p className="text-sm text-text-secondary">Track your lead conversion funnel</p>
        </div>
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-border rounded-lg px-3 py-2 bg-input">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>
      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {pipelineData?.map((stage, index) => (
          <div key={stage?.stage} className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stage?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={stage?.icon} size={20} color="white" />
              </div>
              <span className={`text-sm font-medium ${
                stage?.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}>
                {stage?.change}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{stage?.count?.toLocaleString()}</h3>
            <p className="text-sm text-text-secondary mb-2">{stage?.stage}</p>
            <p className="text-sm font-medium text-foreground">{stage?.value}</p>
          </div>
        ))}
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-1">{conversionRate}%</div>
          <p className="text-sm text-text-secondary">Conversion Rate</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-1">${avgDealSize}</div>
          <p className="text-sm text-text-secondary">Avg Deal Size</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-1">${totalRevenue?.toLocaleString()}</div>
          <p className="text-sm text-text-secondary">Total Revenue</p>
        </div>
      </div>
    </div>
  );
};

export default LeadPipelineMetrics;