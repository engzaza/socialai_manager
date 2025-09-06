import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AITextGenerator = ({ onContentGenerate, selectedPlatforms }) => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('professional');
  const [language, setLanguage] = useState('english');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'educational', label: 'Educational' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'portuguese', label: 'Portuguese' }
  ];

  const handleGenerate = async () => {
    if (!prompt?.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock generated content based on tone and platform
    const mockContent = generateMockContent(prompt, tone, selectedPlatforms, includeHashtags);
    onContentGenerate(mockContent);
    
    setIsGenerating(false);
  };

  const generateMockContent = (userPrompt, selectedTone, platforms, withHashtags) => {
    const toneVariations = {
      professional: "Discover how innovative solutions are transforming the industry landscape.",
      casual: "Hey everyone! Just wanted to share something cool I discovered today.",
      friendly: "Hope you\'re all having an amazing day! Here\'s something that might interest you.",
      humorous: "Plot twist: This actually works better than expected! Who would have thought?",
      inspirational: "Every challenge is an opportunity to grow stronger and achieve greatness.",
      urgent: "Don\'t miss out! This opportunity won\'t last long - act now!",
      educational: "Let\'s dive deep into understanding the key concepts behind this topic."
    };

    const baseContent = `${toneVariations?.[selectedTone]} ${userPrompt}\n\nThis content is optimized for your selected platforms and designed to maximize engagement with your target audience.`;
    
    const hashtags = withHashtags ? "\n\n#SocialMedia #Marketing #Growth #Business #Success #Innovation #Digital #Content" : "";
    
    return baseContent + hashtags;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Sparkles" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">AI Text Generator</h3>
      </div>
      <div className="space-y-4">
        <Input
          label="Content Prompt"
          type="text"
          placeholder="Describe what you want to create (e.g., 'Promote our new product launch')"
          value={prompt}
          onChange={(e) => setPrompt(e?.target?.value)}
          description="Be specific about your content goals for better AI results"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Tone"
            options={toneOptions}
            value={tone}
            onChange={setTone}
          />
          <Select
            label="Language"
            options={languageOptions}
            value={language}
            onChange={setLanguage}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="includeHashtags"
            checked={includeHashtags}
            onChange={(e) => setIncludeHashtags(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
          />
          <label htmlFor="includeHashtags" className="text-sm text-foreground">
            Include relevant hashtags
          </label>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!prompt?.trim() || isGenerating}
          loading={isGenerating}
          iconName="Wand2"
          iconPosition="left"
          className="w-full"
        >
          {isGenerating ? 'Generating Content...' : 'Generate AI Content'}
        </Button>

        {selectedPlatforms?.length === 0 && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <p className="text-sm text-warning">Select at least one platform to optimize content generation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITextGenerator;