import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const MediaGenerator = ({ onMediaGenerate, contentType }) => {
  const [mediaPrompt, setMediaPrompt] = useState('');
  const [mediaStyle, setMediaStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMedia, setGeneratedMedia] = useState([]);

  const styleOptions = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'modern', label: 'Modern' }
  ];

  const aspectRatioOptions = [
    { value: '1:1', label: 'Square (1:1)' },
    { value: '16:9', label: 'Landscape (16:9)' },
    { value: '9:16', label: 'Portrait (9:16)' },
    { value: '4:5', label: 'Instagram Post (4:5)' },
    { value: '9:16', label: 'Story (9:16)' }
  ];

  const handleGenerate = async () => {
    if (!mediaPrompt?.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock generated media
    const mockMedia = [
      {
        id: 1,
        type: contentType === 'reel' ? 'video' : 'image',
        url: contentType === 'reel' ?'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg' :'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
        prompt: mediaPrompt,
        style: mediaStyle,
        aspectRatio: aspectRatio
      },
      {
        id: 2,
        type: contentType === 'reel' ? 'video' : 'image',
        url: contentType === 'reel' ?'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg' :'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg',
        prompt: mediaPrompt,
        style: mediaStyle,
        aspectRatio: aspectRatio
      }
    ];

    setGeneratedMedia(mockMedia);
    onMediaGenerate(mockMedia?.[0]); // Select first generated media by default
    setIsGenerating(false);
  };

  const handleMediaSelect = (media) => {
    onMediaGenerate(media);
  };

  const handleUpload = () => {
    // Mock file upload
    const mockUploadedMedia = {
      id: Date.now(),
      type: 'image',
      url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      prompt: 'Uploaded media',
      style: 'uploaded',
      aspectRatio: '1:1'
    };
    onMediaGenerate(mockUploadedMedia);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Image" size={20} className="text-secondary" />
        <h3 className="text-lg font-semibold text-foreground">
          {contentType === 'reel' ? 'AI Video Generator' : 'AI Media Generator'}
        </h3>
      </div>
      <div className="space-y-4">
        <Input
          label="Media Description"
          type="text"
          placeholder={`Describe the ${contentType === 'reel' ? 'video' : 'image'} you want to create`}
          value={mediaPrompt}
          onChange={(e) => setMediaPrompt(e?.target?.value)}
          description="Be descriptive for better AI generation results"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Style"
            options={styleOptions}
            value={mediaStyle}
            onChange={setMediaStyle}
          />
          <Select
            label="Aspect Ratio"
            options={aspectRatioOptions}
            value={aspectRatio}
            onChange={setAspectRatio}
          />
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={handleGenerate}
            disabled={!mediaPrompt?.trim() || isGenerating}
            loading={isGenerating}
            iconName="Sparkles"
            iconPosition="left"
            className="flex-1"
          >
            {isGenerating ? 'Generating...' : `Generate AI ${contentType === 'reel' ? 'Video' : 'Media'}`}
          </Button>
          <Button
            onClick={handleUpload}
            variant="outline"
            iconName="Upload"
            iconPosition="left"
          >
            Upload
          </Button>
        </div>

        {generatedMedia?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium text-foreground mb-3">Generated Media</h4>
            <div className="grid grid-cols-2 gap-3">
              {generatedMedia?.map((media) => (
                <button
                  key={media?.id}
                  onClick={() => handleMediaSelect(media)}
                  className="relative group rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors"
                >
                  <div className="aspect-square">
                    <Image
                      src={media?.url}
                      alt={`Generated ${media?.type}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {media?.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Icon name="Play" size={20} className="text-gray-800 ml-1" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs font-medium">{media?.style}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGenerator;