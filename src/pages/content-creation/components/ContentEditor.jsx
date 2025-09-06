import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentEditor = ({ content, onContentChange, selectedPlatforms }) => {
  const [editorContent, setEditorContent] = useState(content || '');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ['😀', '😂', '🥰', '😍', '🤩', '😎', '🔥', '💯', '👍', '❤️', '🎉', '✨', '🚀', '💪', '🙌', '👏'];

  const platformLimits = {
    facebook: 2200,
    instagram: 2200,
    twitter: 280,
    linkedin: 3000,
    tiktok: 150,
    youtube: 5000
  };

  useEffect(() => {
    setEditorContent(content || '');
  }, [content]);

  const handleContentChange = (value) => {
    setEditorContent(value);
    onContentChange(value);
  };

  const insertEmoji = (emoji) => {
    const newContent = editorContent + emoji;
    handleContentChange(newContent);
    setShowEmojiPicker(false);
  };

  const getCharacterCount = () => {
    return editorContent?.length;
  };

  const getMinCharacterLimit = () => {
    if (selectedPlatforms?.length === 0) return 5000;
    return Math.min(...selectedPlatforms?.map(platform => platformLimits?.[platform] || 5000));
  };

  const isOverLimit = () => {
    return getCharacterCount() > getMinCharacterLimit();
  };

  const formatText = (format) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const selectedText = editorContent?.substring(start, end);
    
    if (selectedText) {
      let formattedText = selectedText;
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `_${selectedText}_`;
          break;
        default:
          break;
      }
      
      const newContent = editorContent?.substring(0, start) + formattedText + editorContent?.substring(end);
      handleContentChange(newContent);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Content Editor</h3>
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${isOverLimit() ? 'text-error' : 'text-text-secondary'}`}>
            {getCharacterCount()}/{getMinCharacterLimit()}
          </span>
          {isOverLimit() && (
            <Icon name="AlertTriangle" size={16} className="text-error" />
          )}
        </div>
      </div>
      {/* Formatting Toolbar */}
      <div className="flex items-center space-x-2 mb-4 p-2 bg-muted rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatText('bold')}
          iconName="Bold"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatText('italic')}
          iconName="Italic"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatText('underline')}
          iconName="Underline"
        />
        <div className="w-px h-6 bg-border mx-2"></div>
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            iconName="Smile"
          />
          {showEmojiPicker && (
            <div className="absolute top-10 left-0 bg-popover border border-border rounded-lg shadow-elevated p-3 z-50">
              <div className="grid grid-cols-8 gap-1">
                {emojis?.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => insertEmoji(emoji)}
                    className="w-8 h-8 hover:bg-muted rounded text-lg flex items-center justify-center"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Content Textarea */}
      <div className="relative">
        <textarea
          id="content-editor"
          value={editorContent}
          onChange={(e) => handleContentChange(e?.target?.value)}
          placeholder="Start writing your content here..."
          className={`w-full h-48 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            isOverLimit() 
              ? 'border-error bg-error/5' :'border-border bg-background'
          }`}
        />
        
        {editorContent && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleContentChange('')}
            className="absolute top-2 right-2"
            iconName="X"
          />
        )}
      </div>
      {/* Platform-specific warnings */}
      {selectedPlatforms?.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedPlatforms?.map(platform => {
            const limit = platformLimits?.[platform];
            const isOverPlatformLimit = getCharacterCount() > limit;
            
            if (isOverPlatformLimit) {
              return (
                <div key={platform} className="flex items-center space-x-2 text-sm text-warning">
                  <Icon name="AlertTriangle" size={14} />
                  <span>Content exceeds {platform} limit ({limit} characters)</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
      {/* Quick Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleContentChange(editorContent + '\n\n#YourBrand #SocialMedia #Marketing')}
          iconName="Hash"
        >
          Add Hashtags
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleContentChange(editorContent + '\n\nWhat do you think? Let me know in the comments! 👇')}
          iconName="MessageCircle"
        >
          Add CTA
        </Button>
      </div>
    </div>
  );
};

export default ContentEditor;