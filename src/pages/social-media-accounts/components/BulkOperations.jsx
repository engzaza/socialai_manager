import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkOperations = ({ accounts, selectedAccounts, onSelectionChange, onBulkAction }) => {
  const [bulkAction, setBulkAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'sync', label: 'Sync All Selected', description: 'Refresh data from platforms' },
    { value: 'enable_posting', label: 'Enable Posting', description: 'Allow posting to selected accounts' },
    { value: 'disable_posting', label: 'Disable Posting', description: 'Prevent posting to selected accounts' },
    { value: 'update_settings', label: 'Update Settings', description: 'Apply common settings' },
    { value: 'export_data', label: 'Export Data', description: 'Download account analytics' },
    { value: 'disconnect', label: 'Disconnect All', description: 'Remove selected connections' }
  ];

  const handleSelectAll = (checked) => {
    if (checked) {
      const allAccountIds = accounts?.map(account => account?.id);
      onSelectionChange(allAccountIds);
    } else {
      onSelectionChange([]);
    }
  };

  const handleAccountSelection = (accountId, checked) => {
    if (checked) {
      onSelectionChange([...selectedAccounts, accountId]);
    } else {
      onSelectionChange(selectedAccounts?.filter(id => id !== accountId));
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedAccounts?.length === 0) return;

    setIsProcessing(true);
    try {
      await onBulkAction(bulkAction, selectedAccounts);
      setBulkAction('');
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'sync': return 'RefreshCw';
      case 'enable_posting': return 'Play';
      case 'disable_posting': return 'Pause';
      case 'update_settings': return 'Settings';
      case 'export_data': return 'Download';
      case 'disconnect': return 'Unlink';
      default: return 'Play';
    }
  };

  const getActionVariant = (action) => {
    switch (action) {
      case 'disconnect': return 'destructive';
      case 'disable_posting': return 'warning';
      default: return 'default';
    }
  };

  const isAllSelected = accounts?.length > 0 && selectedAccounts?.length === accounts?.length;
  const isIndeterminate = selectedAccounts?.length > 0 && selectedAccounts?.length < accounts?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Bulk Operations</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {selectedAccounts?.length} of {accounts?.length} selected
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isAllSelected}
            indeterminate={isIndeterminate}
            onChange={(e) => handleSelectAll(e?.target?.checked)}
            label="Select all accounts"
          />
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2">
          {accounts?.map((account) => (
            <div
              key={account?.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                selectedAccounts?.includes(account?.id)
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedAccounts?.includes(account?.id)}
                  onChange={(e) => handleAccountSelection(account?.id, e?.target?.checked)}
                />
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={account?.platform === 'Facebook' ? 'Facebook' : 'Globe'} size={16} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{account?.accountName}</p>
                  <p className="text-sm text-text-secondary">{account?.platform}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={account?.status === 'connected' ? 'CheckCircle' : 'AlertCircle'} 
                  size={14} 
                  className={account?.status === 'connected' ? 'text-success' : 'text-warning'}
                />
                <span className={`text-xs font-medium capitalize ${
                  account?.status === 'connected' ? 'text-success' : 'text-warning'
                }`}>
                  {account?.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedAccounts?.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <Select
                  options={bulkActionOptions}
                  value={bulkAction}
                  onChange={setBulkAction}
                  placeholder="Choose an action..."
                />
              </div>
              <Button
                variant={getActionVariant(bulkAction)}
                onClick={handleBulkAction}
                loading={isProcessing}
                disabled={!bulkAction}
                iconName={getActionIcon(bulkAction)}
                iconPosition="left"
              >
                {isProcessing ? 'Processing...' : 'Apply'}
              </Button>
            </div>

            {bulkAction && (
              <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {bulkActionOptions?.find(option => option?.value === bulkAction)?.label}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {bulkActionOptions?.find(option => option?.value === bulkAction)?.description}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      This action will be applied to {selectedAccounts?.length} selected account(s).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkOperations;