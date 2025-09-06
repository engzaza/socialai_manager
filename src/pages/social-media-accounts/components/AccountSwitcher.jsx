import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AccountSwitcher = ({ brands, selectedBrand, onBrandSwitch, userRole }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const brandOptions = brands?.map(brand => ({
    value: brand?.id,
    label: brand?.name,
    description: `${brand?.accountCount} accounts • ${brand?.role}`
  }));

  const selectedBrandData = brands?.find(brand => brand?.id === selectedBrand);

  const getRoleColor = (role) => {
    switch (role) {
      case 'owner': return 'text-success';
      case 'admin': return 'text-secondary';
      case 'editor': return 'text-warning';
      case 'viewer': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'owner': return 'Crown';
      case 'admin': return 'Shield';
      case 'editor': return 'Edit';
      case 'viewer': return 'Eye';
      default: return 'User';
    }
  };

  const getPermissions = (role) => {
    switch (role) {
      case 'owner':
        return ['Full access', 'Manage users', 'Billing', 'Delete accounts'];
      case 'admin':
        return ['Manage content', 'Manage users', 'View analytics', 'Connect accounts'];
      case 'editor':
        return ['Create content', 'Schedule posts', 'View analytics'];
      case 'viewer':
        return ['View content', 'View analytics'];
      default:
        return [];
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Brand Management</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      <div className="mb-4">
        <Select
          label="Active Brand"
          options={brandOptions}
          value={selectedBrand}
          onChange={onBrandSwitch}
          className="mb-4"
        />
      </div>
      {selectedBrandData && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center overflow-hidden">
              {selectedBrandData?.logo ? (
                <Image 
                  src={selectedBrandData?.logo} 
                  alt={`${selectedBrandData?.name} logo`}
                  className="w-8 h-8 object-cover"
                />
              ) : (
                <Icon name="Building" size={20} color="white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{selectedBrandData?.name}</h3>
              <p className="text-sm text-text-secondary">{selectedBrandData?.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getRoleIcon(selectedBrandData?.role)} 
                  size={14} 
                  className={getRoleColor(selectedBrandData?.role)}
                />
                <span className={`text-sm font-medium capitalize ${getRoleColor(selectedBrandData?.role)}`}>
                  {selectedBrandData?.role}
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                {selectedBrandData?.accountCount} accounts
              </p>
            </div>
          </div>

          {isExpanded && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Your Permissions</h4>
                <div className="grid grid-cols-2 gap-2">
                  {getPermissions(selectedBrandData?.role)?.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-sm text-text-secondary">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Connected Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBrandData?.connectedPlatforms?.map((platform) => (
                    <div
                      key={platform?.name}
                      className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-full"
                    >
                      <Image 
                        src={platform?.logo} 
                        alt={`${platform?.name} logo`}
                        className="w-4 h-4 object-contain"
                      />
                      <span className="text-xs text-text-secondary">{platform?.name}</span>
                      <span className="text-xs text-success">•</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                  className="flex-1"
                >
                  Brand Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Users"
                  iconPosition="left"
                  className="flex-1"
                >
                  Manage Team
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          className="w-full"
        >
          Create New Brand
        </Button>
      </div>
    </div>
  );
};

export default AccountSwitcher;