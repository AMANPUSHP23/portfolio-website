import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';

// Custom node component with hover tooltip
const CustomNode = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Connection Handles - Allow connections from all directions */}
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle 
        type="target" 
        position={Position.Bottom} 
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle 
        type="target" 
        position={Position.Right} 
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle 
        type="source" 
        position={Position.Top} 
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle 
        type="source" 
        position={Position.Left} 
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      
      <div
        className={`px-4 py-3 rounded-lg border-2 shadow-lg transition-all duration-300 ${data.style || 'bg-card border-primary'
          } hover:shadow-xl hover:scale-105 cursor-pointer`}
      >
        <div className="flex items-center gap-2">
          {data.icon && <span className="text-2xl">{data.icon}</span>}
          <div>
            <div className="font-bold text-sm">{data.label}</div>
            {data.subtitle && (
              <div className="text-xs text-muted-foreground">{data.subtitle}</div>
            )}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && data.description && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full"
        >
          <div className="bg-background border border-border rounded-lg shadow-xl p-3 max-w-xs">
            <p className="text-xs text-foreground">{data.description}</p>
            {data.tech && (
              <div className="flex flex-wrap gap-1 mt-2">
                {data.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Arrow */}
          <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-border mx-auto"></div>
        </motion.div>
      )}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const ArchitectureDiagram = ({ nodes: initialNodes, edges: initialEdges, title, className = '' }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => [...eds, params]),
    [setEdges]
  );

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {title}
        </h3>
      )}
      <div className="h-[500px] rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls className="bg-card border border-border rounded-lg" />
          <MiniMap
            className="bg-card border border-border rounded-lg"
            nodeColor={(node) => {
              if (node.type === 'custom') return 'hsl(var(--primary))';
              return '#666';
            }}
          />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
