import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkSchedulingPanel = ({ isOpen, onClose, onBulkSchedule }) => {
  const [bulkData, setBulkData] = useState({
    content: '',
    platforms: [],
    startDate: '',
    endDate: '',
    frequency: 'daily',
    times: ['09:00'],
    timezone: 'America/New_York'
  });

  const [csvFile, setCsvFile] = useState(null);
  const [uploadMode, setUploadMode] = useState('manual'); // 'manual' or 'csv'

  const platforms = [
    { value: 'facebook', label: 'Facebook', icon: 'Facebook' },
    { value: 'instagram', label: 'Instagram', icon: 'Instagram' },
    { value: 'twitter', label: 'Twitter', icon: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn', icon: 'Linkedin' },
    { value: 'tiktok', label: 'TikTok', icon: 'Music' },
    { value: 'youtube', label: 'YouTube', icon: 'Youtube' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom Interval' }
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'UTC', label: 'UTC' }
  ];

  const handlePlatformToggle = (platformValue) => {
    setBulkData(prev => ({
      ...prev,
      platforms: prev?.platforms?.includes(platformValue)
        ? prev?.platforms?.filter(p => p !== platformValue)
        : [...prev?.platforms, platformValue]
    }));
  };

  const handleTimeAdd = () => {
    setBulkData(prev => ({
      ...prev,
      times: [...prev?.times, '12:00']
    }));
  };

  const handleTimeChange = (index, value) => {
    setBulkData(prev => ({
      ...prev,
      times: prev?.times?.map((time, i) => i === index ? value : time)
    }));
  };

  const handleTimeRemove = (index) => {
    setBulkData(prev => ({
      ...prev,
      times: prev?.times?.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file && file?.type === 'text/csv') {
      setCsvFile(file);
    }
  };

  const handleBulkSchedule = () => {
    if (uploadMode === 'csv' && csvFile) {
      // Process CSV file
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e?.target?.result;
        // Parse CSV and create posts
        onBulkSchedule({ type: 'csv', data: csvData });
      };
      reader?.readAsText(csvFile);
    } else {
      // Use manual bulk data
      onBulkSchedule({ type: 'manual', data: bulkData });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300 p-4">
      <div className="bg-surface rounded-lg border border-border shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Bulk Scheduling</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Upload Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Scheduling Method
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setUploadMode('manual')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-smooth ${
                  uploadMode === 'manual' ?'bg-primary text-primary-foreground border-primary' :'bg-surface text-text-secondary border-border hover:border-primary/50'
                }`}
              >
                <Icon name="Edit" size={16} />
                <span>Manual Entry</span>
              </button>
              <button
                onClick={() => setUploadMode('csv')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-smooth ${
                  uploadMode === 'csv' ?'bg-primary text-primary-foreground border-primary' :'bg-surface text-text-secondary border-border hover:border-primary/50'
                }`}
              >
                <Icon name="Upload" size={16} />
                <span>CSV Upload</span>
              </button>
            </div>
          </div>

          {uploadMode === 'csv' ? (
            /* CSV Upload Mode */
            (<div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Upload CSV File
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Icon name="Upload" size={32} className="mx-auto text-text-secondary mb-2" />
                  <p className="text-text-secondary mb-2">
                    Drop your CSV file here or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload">
                    <Button variant="outline" as="span">
                      Choose File
                    </Button>
                  </label>
                  {csvFile && (
                    <p className="text-sm text-success mt-2">
                      File selected: {csvFile?.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">CSV Format Requirements:</h4>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Column headers: content, platforms, scheduled_time, hashtags</li>
                  <li>• Platforms should be comma-separated (facebook,instagram)</li>
                  <li>• Date format: YYYY-MM-DD HH:MM</li>
                  <li>• Hashtags should be comma-separated without # symbol</li>
                </ul>
                <Button variant="link" size="sm" className="mt-2 p-0">
                  Download Sample CSV
                </Button>
              </div>
            </div>)
          ) : (
            /* Manual Entry Mode */
            (<div className="space-y-6">
              {/* Platforms Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select Platforms
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms?.map((platform) => (
                    <Checkbox
                      key={platform?.value}
                      label={
                        <div className="flex items-center space-x-2">
                          <Icon name={platform?.icon} size={16} />
                          <span>{platform?.label}</span>
                        </div>
                      }
                      checked={bulkData?.platforms?.includes(platform?.value)}
                      onChange={() => handlePlatformToggle(platform?.value)}
                    />
                  ))}
                </div>
              </div>
              {/* Content Template */}
              <div>
                <Input
                  label="Content Template"
                  type="textarea"
                  placeholder="Enter your post content template..."
                  value={bulkData?.content}
                  onChange={(e) => setBulkData(prev => ({ ...prev, content: e?.target?.value }))}
                  description="Use {date}, {time}, {platform} as placeholders"
                />
              </div>
              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={bulkData?.startDate}
                  onChange={(e) => setBulkData(prev => ({ ...prev, startDate: e?.target?.value }))}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={bulkData?.endDate}
                  onChange={(e) => setBulkData(prev => ({ ...prev, endDate: e?.target?.value }))}
                />
              </div>
              {/* Frequency */}
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Frequency"
                  options={frequencyOptions}
                  value={bulkData?.frequency}
                  onChange={(value) => setBulkData(prev => ({ ...prev, frequency: value }))}
                />
                <Select
                  label="Timezone"
                  options={timezoneOptions}
                  value={bulkData?.timezone}
                  onChange={(value) => setBulkData(prev => ({ ...prev, timezone: value }))}
                />
              </div>
              {/* Publishing Times */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Publishing Times
                </label>
                <div className="space-y-2">
                  {bulkData?.times?.map((time, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => handleTimeChange(index, e?.target?.value)}
                        className="flex-1"
                      />
                      {bulkData?.times?.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleTimeRemove(index)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTimeAdd}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Time
                  </Button>
                </div>
              </div>
            </div>)
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            {uploadMode === 'manual' && bulkData?.platforms?.length > 0 && bulkData?.startDate && bulkData?.endDate && (
              <span>
                This will create approximately {Math.ceil((new Date(bulkData.endDate) - new Date(bulkData.startDate)) / (1000 * 60 * 60 * 24)) * bulkData?.times?.length * bulkData?.platforms?.length} posts
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleBulkSchedule}
              disabled={
                uploadMode === 'csv' 
                  ? !csvFile 
                  : !bulkData?.platforms?.length || !bulkData?.content || !bulkData?.startDate || !bulkData?.endDate
              }
            >
              Schedule Posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkSchedulingPanel;