import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BotFlowBuilder = ({ nodes, edges, onNodesChange, onEdgesChange, onNodeAdd, onNodeSelect, selectedNode }) => {
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const nodeTypes = [
    { type: 'start', label: 'Start', icon: 'Play', color: 'bg-success' },
    { type: 'message', label: 'Message', icon: 'MessageSquare', color: 'bg-primary' },
    { type: 'question', label: 'Question', icon: 'HelpCircle', color: 'bg-secondary' },
    { type: 'condition', label: 'Condition', icon: 'GitBranch', color: 'bg-warning' },
    { type: 'action', label: 'Action', icon: 'Zap', color: 'bg-accent' },
    { type: 'end', label: 'End', icon: 'Square', color: 'bg-error' }
  ];

  const handleNodeDragStart = useCallback((e, nodeType) => {
    const rect = e?.target?.getBoundingClientRect();
    setDragOffset({
      x: e?.clientX - rect?.left,
      y: e?.clientY - rect?.top
    });
    setDraggedNode(nodeType);
  }, []);

  const handleCanvasDrop = useCallback((e) => {
    e?.preventDefault();
    if (!draggedNode || !canvasRef?.current) return;

    const rect = canvasRef?.current?.getBoundingClientRect();
    const x = e?.clientX - rect?.left - dragOffset?.x;
    const y = e?.clientY - rect?.top - dragOffset?.y;

    const newNode = {
      id: `node_${Date.now()}`,
      type: draggedNode?.type,
      position: { x, y },
      data: {
        label: draggedNode?.label,
        content: '',
        responses: draggedNode?.type === 'question' ? [''] : []
      }
    };

    onNodeAdd(newNode);
    setDraggedNode(null);
  }, [draggedNode, dragOffset, onNodeAdd]);

  const handleCanvasDragOver = useCallback((e) => {
    e?.preventDefault();
  }, []);

  const getNodeIcon = (nodeType) => {
    const type = nodeTypes?.find(t => t?.type === nodeType);
    return type ? type?.icon : 'Circle';
  };

  const getNodeColor = (nodeType) => {
    const type = nodeTypes?.find(t => t?.type === nodeType);
    return type ? type?.color : 'bg-muted';
  };

  return (
    <div className="flex h-full">
      {/* Node Palette */}
      <div className="w-64 bg-surface border-r border-border p-4">
        <h3 className="font-semibold text-foreground mb-4">Flow Elements</h3>
        <div className="space-y-2">
          {nodeTypes?.map((nodeType) => (
            <div
              key={nodeType?.type}
              draggable
              onDragStart={(e) => handleNodeDragStart(e, nodeType)}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted cursor-grab active:cursor-grabbing transition-smooth"
            >
              <div className={`w-8 h-8 ${nodeType?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={nodeType?.icon} size={16} color="white" />
              </div>
              <span className="text-sm font-medium text-foreground">{nodeType?.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Icon name="Download" size={14} className="mr-2" />
              Export Flow
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Icon name="Upload" size={14} className="mr-2" />
              Import Flow
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Icon name="RotateCcw" size={14} className="mr-2" />
              Reset Canvas
            </Button>
          </div>
        </div>
      </div>
      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden bg-muted/30">
        <div
          ref={canvasRef}
          className="w-full h-full relative"
          onDrop={handleCanvasDrop}
          onDragOver={handleCanvasDragOver}
        >
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Edges */}
          <svg className="absolute inset-0 pointer-events-none">
            {edges?.map((edge) => {
              const sourceNode = nodes?.find(n => n?.id === edge?.source);
              const targetNode = nodes?.find(n => n?.id === edge?.target);
              
              if (!sourceNode || !targetNode) return null;

              const x1 = sourceNode?.position?.x + 100;
              const y1 = sourceNode?.position?.y + 40;
              const x2 = targetNode?.position?.x;
              const y2 = targetNode?.position?.y + 40;

              return (
                <g key={edge?.id}>
                  <path
                    d={`M ${x1} ${y1} C ${x1 + 50} ${y1} ${x2 - 50} ${y2} ${x2} ${y2}`}
                    stroke="var(--color-border)"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              );
            })}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="var(--color-border)"
                />
              </marker>
            </defs>
          </svg>

          {/* Nodes */}
          {nodes?.map((node) => (
            <div
              key={node?.id}
              className={`absolute w-48 bg-surface border-2 rounded-lg shadow-soft cursor-pointer transition-smooth ${
                selectedNode?.id === node?.id ? 'border-primary' : 'border-border hover:border-primary/50'
              }`}
              style={{
                left: node?.position?.x,
                top: node?.position?.y
              }}
              onClick={() => onNodeSelect(node)}
            >
              <div className="p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-6 h-6 ${getNodeColor(node?.type)} rounded flex items-center justify-center`}>
                    <Icon name={getNodeIcon(node?.type)} size={12} color="white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{node?.data?.label}</span>
                </div>
                <div className="text-xs text-text-secondary">
                  {node?.data?.content || 'Click to configure'}
                </div>
              </div>
              
              {/* Connection Points */}
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-surface"></div>
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-muted rounded-full border-2 border-surface"></div>
            </div>
          ))}

          {/* Empty State */}
          {nodes?.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Icon name="Bot" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Start Building Your Bot</h3>
                <p className="text-text-secondary mb-4">Drag elements from the left panel to create your conversation flow</p>
                <Button onClick={() => onNodeAdd({
                  id: 'start_node',
                  type: 'start',
                  position: { x: 300, y: 200 },
                  data: { label: 'Start', content: 'Welcome! How can I help you today?' }
                })}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add Start Node
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotFlowBuilder;