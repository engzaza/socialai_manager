import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CustomerFinderTool = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' }
  ];

  const ageOptions = [
    { value: '', label: 'All Ages' },
    { value: '18-24', label: '18-24 years' },
    { value: '25-34', label: '25-34 years' },
    { value: '35-44', label: '35-44 years' },
    { value: '45-54', label: '45-54 years' },
    { value: '55+', label: '55+ years' }
  ];

  const interestOptions = [
    { value: 'fitness', label: 'Fitness & Health' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business & Finance' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food & Cooking' },
    { value: 'fashion', label: 'Fashion & Style' },
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music & Entertainment' }
  ];

  const foundProspects = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, US",
      age: 28,
      interests: ["Fitness & Health", "Technology"],
      engagement: 85,
      platform: "Instagram",
      followers: 2400,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "San Francisco, US",
      age: 34,
      interests: ["Business & Finance", "Technology"],
      engagement: 92,
      platform: "LinkedIn",
      followers: 5600,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Emma Wilson",
      location: "London, UK",
      age: 31,
      interests: ["Fashion & Style", "Travel"],
      engagement: 78,
      platform: "TikTok",
      followers: 8900,
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const handleAddToList = (prospect) => {
    console.log('Adding prospect to list:', prospect);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">AI Customer Finder</h2>
          <p className="text-sm text-text-secondary">Discover potential customers using AI-powered search</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export Results
          </Button>
        </div>
      </div>
      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Input
          label="Search Keywords"
          placeholder="e.g., fitness enthusiast, entrepreneur"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
        />
        
        <Select
          label="Location"
          options={locationOptions}
          value={selectedLocation}
          onChange={setSelectedLocation}
        />
        
        <Select
          label="Age Range"
          options={ageOptions}
          value={selectedAge}
          onChange={setSelectedAge}
        />
        
        <div className="flex items-end">
          <Button 
            onClick={handleSearch}
            loading={isSearching}
            className="w-full"
          >
            <Icon name="Search" size={16} className="mr-2" />
            Find Prospects
          </Button>
        </div>
      </div>
      {/* Interest Tags */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">Interests</label>
        <div className="flex flex-wrap gap-2">
          {interestOptions?.map((interest) => (
            <button
              key={interest?.value}
              onClick={() => {
                if (selectedInterests?.includes(interest?.value)) {
                  setSelectedInterests(selectedInterests?.filter(i => i !== interest?.value));
                } else {
                  setSelectedInterests([...selectedInterests, interest?.value]);
                }
              }}
              className={`px-3 py-1 rounded-full text-sm transition-smooth ${
                selectedInterests?.includes(interest?.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:bg-muted/80'
              }`}
            >
              {interest?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Found Prospects ({foundProspects?.length})</h3>
          <div className="text-sm text-text-secondary">
            Showing results for current filters
          </div>
        </div>

        {foundProspects?.map((prospect) => (
          <div key={prospect?.id} className="bg-muted rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={prospect?.avatar}
                alt={prospect?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-foreground">{prospect?.name}</h4>
                <p className="text-sm text-text-secondary">{prospect?.location} • Age {prospect?.age}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
                    {prospect?.platform}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {prospect?.followers?.toLocaleString()} followers
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {prospect?.engagement}% engagement
                </div>
                <div className="text-xs text-text-secondary">
                  {prospect?.interests?.join(', ')}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddToList(prospect)}
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Add to List
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerFinderTool;