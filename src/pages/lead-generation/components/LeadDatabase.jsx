import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LeadDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);

  const leads = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      company: "FitLife Studio",
      source: "Instagram",
      status: "Hot",
      score: 92,
      lastContact: "2025-01-06",
      tags: ["Fitness", "Small Business"],
      interactions: 8,
      value: "$2,500",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@techstartup.com",
      phone: "+1 (555) 234-5678",
      company: "TechStartup Inc",
      source: "LinkedIn",
      status: "Warm",
      score: 78,
      lastContact: "2025-01-05",
      tags: ["Technology", "B2B"],
      interactions: 5,
      value: "$5,000",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@fashionbrand.com",
      phone: "+1 (555) 345-6789",
      company: "Fashion Forward",
      source: "Facebook",
      status: "Cold",
      score: 45,
      lastContact: "2025-01-03",
      tags: ["Fashion", "E-commerce"],
      interactions: 2,
      value: "$1,200",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 4,
      name: "David Rodriguez",
      email: "david@consultingpro.com",
      phone: "+1 (555) 456-7890",
      company: "Consulting Pro",
      source: "WhatsApp",
      status: "Qualified",
      score: 88,
      lastContact: "2025-01-06",
      tags: ["Consulting", "Professional"],
      interactions: 12,
      value: "$8,500",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'hot', label: 'Hot' },
    { value: 'warm', label: 'Warm' },
    { value: 'cold', label: 'Cold' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'converted', label: 'Converted' }
  ];

  const sourceOptions = [
    { value: '', label: 'All Sources' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'email', label: 'Email' }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'hot': return 'bg-error text-error-foreground';
      case 'warm': return 'bg-warning text-warning-foreground';
      case 'cold': return 'bg-muted text-text-secondary';
      case 'qualified': return 'bg-success text-success-foreground';
      case 'converted': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const handleSelectLead = (leadId) => {
    if (selectedLeads?.includes(leadId)) {
      setSelectedLeads(selectedLeads?.filter(id => id !== leadId));
    } else {
      setSelectedLeads([...selectedLeads, leadId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedLeads?.length === leads?.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads?.map(lead => lead?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for leads:`, selectedLeads);
  };

  const handleLeadAction = (action, leadId) => {
    console.log(`${action} lead:`, leadId);
  };

  const filteredLeads = leads?.filter(lead => {
    const matchesSearch = lead?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         lead?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         lead?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = !selectedStatus || lead?.status?.toLowerCase() === selectedStatus;
    const matchesSource = !selectedSource || lead?.source?.toLowerCase() === selectedSource;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Lead Database</h2>
          <p className="text-sm text-text-secondary">Manage and track all your leads in one place</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Upload" size={16} className="mr-2" />
            Import
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Search leads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
        />
        
        <Select
          options={statusOptions}
          value={selectedStatus}
          onChange={setSelectedStatus}
          placeholder="Filter by status"
        />
        
        <Select
          options={sourceOptions}
          value={selectedSource}
          onChange={setSelectedSource}
          placeholder="Filter by source"
        />
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="Filter" size={16} className="mr-2" />
            More Filters
          </Button>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedLeads?.length > 0 && (
        <div className="bg-muted rounded-lg p-4 mb-4 flex items-center justify-between">
          <span className="text-sm text-foreground">
            {selectedLeads?.length} lead{selectedLeads?.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleBulkAction('tag')}>
              <Icon name="Tag" size={16} className="mr-2" />
              Tag
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleBulkAction('status')}>
              <Icon name="Edit" size={16} className="mr-2" />
              Change Status
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleBulkAction('export')}>
              <Icon name="Download" size={16} className="mr-2" />
              Export Selected
            </Button>
          </div>
        </div>
      )}
      {/* Leads Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedLeads?.length === leads?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Lead</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Contact</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Source</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Score</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Value</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads?.map((lead) => (
              <tr key={lead?.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedLeads?.includes(lead?.id)}
                    onChange={() => handleSelectLead(lead?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={lead?.avatar}
                      alt={lead?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-foreground">{lead?.name}</div>
                      <div className="text-sm text-text-secondary">{lead?.company}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm">
                    <div className="text-foreground">{lead?.email}</div>
                    <div className="text-text-secondary">{lead?.phone}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-foreground">{lead?.source}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead?.status)}`}>
                    {lead?.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`font-medium ${getScoreColor(lead?.score)}`}>
                    {lead?.score}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-foreground">{lead?.value}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleLeadAction('view', lead?.id)}>
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleLeadAction('edit', lead?.id)}>
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleLeadAction('message', lead?.id)}>
                      <Icon name="MessageCircle" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-text-secondary">
          Showing {filteredLeads?.length} of {leads?.length} leads
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <span className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">1</span>
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadDatabase;