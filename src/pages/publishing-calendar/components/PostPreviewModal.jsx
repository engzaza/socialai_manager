import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const PostPreviewModal = ({ post, isOpen, onClose, onSave, onDelete }) => {
  const [editedPost, setEditedPost] = useState(post || {});
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !post) return null;

  const platforms = [
    { value: 'facebook', label: 'Facebook', icon: 'Facebook' },
    { value: 'instagram', label: 'Instagram', icon: 'Instagram' },
    { value: 'twitter', label: 'Twitter', icon: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn', icon: 'Linkedin' },
    { value: 'tiktok', label: 'TikTok', icon: 'Music' },
    { value: 'youtube', label: 'YouTube', icon: 'Youtube' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'published', label: 'Published' },
    { value: 'failed', label: 'Failed' }
  ];

  const handleSave = () => {
    onSave(editedPost);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPost(post);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-primary bg-primary/10';
      case 'published': return 'text-success bg-success/10';
      case 'failed': return 'text-error bg-error/10';
      case 'draft': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime)?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300 p-4">
      <div className="bg-surface rounded-lg border border-border shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-foreground">
              {isEditing ? 'Edit Post' : 'Post Preview'}
            </h2>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(post?.status)}`}>
              {post?.status?.charAt(0)?.toUpperCase() + post?.status?.slice(1)}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <Button
                variant="outline"
                iconName="Edit"
                iconPosition="left"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Left Panel - Post Details */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Platforms */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Publishing Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  {platforms?.map((platform) => {
                    const isSelected = (isEditing ? editedPost?.platforms : post?.platforms)?.includes(platform?.value);
                    return (
                      <button
                        key={platform?.value}
                        onClick={() => {
                          if (isEditing) {
                            const currentPlatforms = editedPost?.platforms || [];
                            const newPlatforms = isSelected
                              ? currentPlatforms?.filter(p => p !== platform?.value)
                              : [...currentPlatforms, platform?.value];
                            setEditedPost({ ...editedPost, platforms: newPlatforms });
                          }
                        }}
                        disabled={!isEditing}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-smooth ${
                          isSelected
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-surface text-text-secondary border-border hover:border-primary/50'
                        } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <Icon name={platform?.icon} size={16} />
                        <span className="text-sm">{platform?.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Post Content
                </label>
                {isEditing ? (
                  <textarea
                    value={editedPost?.content || ''}
                    onChange={(e) => setEditedPost({ ...editedPost, content: e?.target?.value })}
                    className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Write your post content..."
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-foreground whitespace-pre-wrap">{post?.content}</p>
                  </div>
                )}
              </div>

              {/* Media */}
              {post?.media && post?.media?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Media Attachments
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {post?.media?.map((media, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={media?.url}
                          alt={media?.alt || `Media ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                          {media?.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scheduling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Scheduled Time
                  </label>
                  {isEditing ? (
                    <Input
                      type="datetime-local"
                      value={editedPost?.scheduledTime ? new Date(editedPost.scheduledTime)?.toISOString()?.slice(0, 16) : ''}
                      onChange={(e) => setEditedPost({ ...editedPost, scheduledTime: e?.target?.value })}
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-foreground">{formatDateTime(post?.scheduledTime)}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Status
                  </label>
                  {isEditing ? (
                    <Select
                      options={statusOptions}
                      value={editedPost?.status}
                      onChange={(value) => setEditedPost({ ...editedPost, status: value })}
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-foreground capitalize">{post?.status}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Hashtags */}
              {post?.hashtags && post?.hashtags?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Hashtags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {post?.hashtags?.map((hashtag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary/10 text-secondary rounded text-sm"
                      >
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Analytics & Actions */}
          <div className="w-full lg:w-80 border-l border-border bg-muted/30 p-6">
            <div className="space-y-6">
              {/* Performance Prediction */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Performance Prediction</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Expected Reach</span>
                    <span className="font-medium text-foreground">{post?.predictions?.reach || '2.5K'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Expected Engagement</span>
                    <span className="font-medium text-foreground">{post?.predictions?.engagement || '180'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Best Time Score</span>
                    <span className="font-medium text-success">{post?.predictions?.timeScore || '85%'}</span>
                  </div>
                </div>
              </div>

              {/* Post History */}
              {post?.status === 'published' && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Actual Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Total Reach</span>
                      <span className="font-medium text-foreground">{post?.analytics?.reach || '3.2K'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Engagement</span>
                      <span className="font-medium text-foreground">{post?.analytics?.engagement || '245'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Click Rate</span>
                      <span className="font-medium text-foreground">{post?.analytics?.clickRate || '3.2%'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Actions</h3>
                
                {isEditing ? (
                  <div className="space-y-2">
                    <Button
                      variant="default"
                      fullWidth
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Copy"
                      iconPosition="left"
                    >
                      Duplicate Post
                    </Button>
                    
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Calendar"
                      iconPosition="left"
                    >
                      Reschedule
                    </Button>
                    
                    {post?.status === 'scheduled' && (
                      <Button
                        variant="outline"
                        fullWidth
                        iconName="Play"
                        iconPosition="left"
                      >
                        Publish Now
                      </Button>
                    )}
                    
                    <Button
                      variant="destructive"
                      fullWidth
                      iconName="Trash2"
                      iconPosition="left"
                      onClick={() => onDelete(post?.id)}
                    >
                      Delete Post
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreviewModal;