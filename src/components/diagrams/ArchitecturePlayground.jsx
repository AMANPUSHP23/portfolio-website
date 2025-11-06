import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Panel,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';
import { Download, Trash2, Sparkles, X } from 'lucide-react';
import { serviceCategories, colorStyles, templates } from '@/data/serviceLibrary';
import { Button } from '@/components/ui/button';

// Custom node for playground with REAL connection handles
const PlaygroundNode = ({ data, selected }) => {
  const handleStyle = {
    background: 'hsl(var(--primary))',
    width: '14px',
    height: '14px',
    border: '3px solid white',
    cursor: 'crosshair',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
  };

  return (
    <div className={`px-4 py-3 rounded-lg border-2 shadow-lg transition-all duration-300 cursor-move relative ${data.style} ${
      selected ? 'ring-4 ring-primary/50 scale-105' : ''
    }`}>
      {/* REAL React Flow Handles - Both source AND target at each position! */}
      {/* Top handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        style={handleStyle}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={handleStyle}
        isConnectable={true}
      />
      
      {/* Right handles */}
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={handleStyle}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={handleStyle}
        isConnectable={true}
      />
      
      {/* Bottom handles */}
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        style={handleStyle}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={handleStyle}
        isConnectable={true}
      />
      
      {/* Left handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={handleStyle}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={handleStyle}
        isConnectable={true}
      />
      
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
  );
};

// Text node with style presets and per-node toolbar
const TextNode = ({ data, selected }) => {
  const editorRef = useRef(null);
  const preset = data?.preset || 'amber';
  const size = data?.size || 'm';
  const isBold = !!data?.bold;
  const isItalic = !!data?.italic;
  const rotate = Number.isFinite(data?.rotate) ? data.rotate : 0;
  const width = Number.isFinite(data?.width) ? Math.max(120, Math.min(360, data.width)) : 160;
  const customColor = data?.color; // hex

  const sizeCls = size === 's' ? 'text-xs' : size === 'l' ? 'text-base' : 'text-sm';
  const presetMap = {
    amber: {
      wrap: 'bg-amber-50 dark:bg-amber-200/15 border-amber-200/70 dark:border-amber-300/30',
      pin: 'bg-amber-400 border-amber-300',
      text: 'text-slate-800 dark:text-amber-50/90',
      ring: 'ring-amber-400/40',
    },
    mint: {
      wrap: 'bg-emerald-50 dark:bg-emerald-200/15 border-emerald-200/70 dark:border-emerald-300/30',
      pin: 'bg-emerald-400 border-emerald-300',
      text: 'text-slate-800 dark:text-emerald-50/90',
      ring: 'ring-emerald-400/40',
    },
    sky: {
      wrap: 'bg-sky-50 dark:bg-sky-200/15 border-sky-200/70 dark:border-sky-300/30',
      pin: 'bg-sky-400 border-sky-300',
      text: 'text-slate-800 dark:text-sky-50/90',
      ring: 'ring-sky-400/40',
    },
    violet: {
      wrap: 'bg-violet-50 dark:bg-violet-200/15 border-violet-200/70 dark:border-violet-300/30',
      pin: 'bg-violet-400 border-violet-300',
      text: 'text-slate-800 dark:text-violet-50/90',
      ring: 'ring-violet-400/40',
    },
    gray: {
      wrap: 'bg-zinc-50 dark:bg-zinc-200/10 border-zinc-200/60 dark:border-zinc-300/20',
      pin: 'bg-zinc-400 border-zinc-300',
      text: 'text-slate-800 dark:text-zinc-100/90',
      ring: 'ring-zinc-400/30',
    },
  };
  const p = presetMap[preset] || presetMap.amber;

  const wrapStyle = customColor
    ? { background: customColor, borderColor: customColor }
    : undefined;
  const pinStyle = customColor ? { background: customColor, borderColor: customColor } : undefined;

  return (
    <div
      className={`relative px-4 py-3 rounded-xl border shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-[1px] ${customColor ? '' : p.wrap} ${selected ? `ring-4 ${p.ring}` : ''}`}
      style={{ transform: `rotate(${rotate}deg)`, width, ...wrapStyle }}
    >
      <span
        className={`absolute -top-2 left-5 w-3 h-3 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.35)] border ${customColor ? '' : p.pin}`}
        style={pinStyle}
      ></span>

      {selected && (data?.onStyle || data?.onDelete) && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-card/90 backdrop-blur px-2 py-1 rounded-md border text-[10px]">
          <button
            className="px-1.5 py-0.5 rounded border bg-background"
            title="Edit text"
            onClick={() => {
              const el = editorRef.current;
              if (!el) return;
              el.focus();
              try {
                const sel = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false); // caret at end
                sel.removeAllRanges();
                sel.addRange(range);
              } catch {}
            }}
          >Edit</button>
          <select
            value={preset}
            onChange={(e) => data.onStyle(data.nodeId, { preset: e.target.value })}
            className="px-1 py-0.5 rounded border bg-background"
          >
            <option value="amber">Sticky</option>
            <option value="mint">Mint</option>
            <option value="sky">Sky</option>
            <option value="violet">Violet</option>
            <option value="gray">Gray</option>
          </select>
          <select
            value={size}
            onChange={(e) => data.onStyle(data.nodeId, { size: e.target.value })}
            className="px-1 py-0.5 rounded border bg-background"
          >
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
          </select>
          <button
            className={`px-1 py-0.5 rounded border ${isBold ? 'bg-muted font-semibold' : 'bg-background'}`}
            onClick={() => data.onStyle(data.nodeId, { bold: !isBold })}
            title="Bold"
          >B</button>
          <button
            className={`px-1 py-0.5 rounded border ${isItalic ? 'bg-muted italic' : 'bg-background'}`}
            onClick={() => data.onStyle(data.nodeId, { italic: !isItalic })}
            title="Italic"
          >I</button>
          <input
            type="color"
            value={customColor || '#f59e0b'}
            onChange={(e) => data.onStyle(data.nodeId, { color: e.target.value })}
            className="w-6 h-5 border rounded"
            title="Color"
          />
          <button
            className="px-1 py-0.5 rounded border bg-background"
            onClick={() => data.onStyle(data.nodeId, { rotate: rotate - 15 })}
            title="Rotate -15"
          >⟲</button>
          <button
            className="px-1 py-0.5 rounded border bg-background"
            onClick={() => data.onStyle(data.nodeId, { rotate: rotate + 15 })}
            title="Rotate +15"
          >⟳</button>
          <button
            className="px-1 py-0.5 rounded border bg-background"
            onClick={() => data.onStyle(data.nodeId, { width: width - 20 })}
            title="Narrow"
          >−</button>
          <button
            className="px-1 py-0.5 rounded border bg-background"
            onClick={() => data.onStyle(data.nodeId, { width: width + 20 })}
            title="Wider"
          >＋</button>
          {!!data.onDelete && (
            <button
              className="ml-1 px-1.5 py-0.5 rounded border bg-destructive text-destructive-foreground"
              onClick={() => data.onDelete(data.nodeId)}
              title="Delete note"
            >×</button>
          )}
        </div>
      )}

      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => data?.onChange && data.onChange(data.nodeId, e.currentTarget.textContent || '')}
        ref={editorRef}
        className={`min-w-[140px] min-h-[24px] leading-snug outline-none ${sizeCls} ${customColor ? 'text-slate-900 dark:text-white/90' : p.text} ${isBold ? 'font-semibold' : ''} ${isItalic ? 'italic' : ''}`}
      >
        {data.text || 'Text'}
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: PlaygroundNode,
  text: TextNode,
};

const ArchitecturePlayground = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showServicePanel, setShowServicePanel] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('compute');
  // Pre-editable Text tool state
  const [textTool, setTextTool] = useState('Label');
  const [textPreset, setTextPreset] = useState('amber'); // amber | mint | sky | violet | gray
  const [textSize, setTextSize] = useState('m'); // s | m | l
  const [textBold, setTextBold] = useState(false);
  const [textItalic, setTextItalic] = useState(false);
  const [textColor, setTextColor] = useState('');
  // Map category tokens to stroke hex colors for edges
  const tokenToHex = useRef({
    orange: '#f97316',
    green: '#22c55e',
    blue: '#3b82f6',
    purple: '#8b5cf6',
    red: '#ef4444',
    yellow: '#eab308',
    pink: '#ec4899',
    cyan: '#06b6d4',
  });
  // Fallback parser for template node styles like 'border-blue-500'
  const styleToHex = (styleStr) => {
    if (!styleStr) return '#3b82f6';
    const map = tokenToHex.current;
    if (styleStr.includes('orange-500')) return map.orange;
    if (styleStr.includes('green-500')) return map.green;
    if (styleStr.includes('blue-500')) return map.blue;
    if (styleStr.includes('purple-500')) return map.purple;
    if (styleStr.includes('red-500')) return map.red;
    if (styleStr.includes('yellow-500')) return map.yellow;
    if (styleStr.includes('pink-500')) return map.pink;
    if (styleStr.includes('cyan-500')) return map.cyan;
    return '#3b82f6';
  };
  const getEdgeColorForNode = useCallback((node) => {
    if (!node) return '#3b82f6';
    if (node.data?.edgeColor) return node.data.edgeColor;
    if (node.data?.colorToken && tokenToHex.current[node.data.colorToken]) {
      return tokenToHex.current[node.data.colorToken];
    }
    return styleToHex(node.data?.style);
  }, []);

  // Export diagram as JSON (nodes + edges with styles)
  const exportToJson = useCallback(() => {
    const payload = {
      nodes: nodes.map(({ id, type, position, data }) => ({ id, type, position, data })),
      edges: edges.map(({ id, source, target, sourceHandle, targetHandle, type, label, animated, markerEnd, style }) => ({ id, source, target, sourceHandle, targetHandle, type, label, animated, markerEnd, style })),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture-diagram.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);
  const updateTextNode = useCallback((nodeId, text) => {
    setNodes((nds) => nds.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, text } } : n)));
  }, [setNodes]);
  const updateTextStyle = useCallback((nodeId, partial) => {
    setNodes((nds) => nds.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, ...partial } } : n)));
  }, [setNodes]);
  // Edge color rotation palette
  const edgeColors = useRef([
    '#ef4444', // red-500
    '#f59e0b', // amber-500
    '#10b981', // emerald-500
    '#22c55e', // green-500
    '#06b6d4', // cyan-500
    '#3b82f6', // blue-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
  ]);
  const edgeColorIndexRef = useRef(0);
  const nextEdgeColor = useCallback(() => {
    const color = edgeColors.current[edgeColorIndexRef.current % edgeColors.current.length];
    edgeColorIndexRef.current += 1;
    return color;
  }, []);

  // Handle drag and drop from service library
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const serviceData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (serviceData.id === 'text') {
        const id = `text-${Date.now()}`;
        const node = {
          id,
          type: 'text',
          position,
          data: { 
            text: serviceData.text || 'Text', 
            preset: serviceData.preset || textPreset,
            size: serviceData.size || textSize,
            bold: serviceData.bold ?? textBold,
            italic: serviceData.italic ?? textItalic,
            color: (serviceData.color ?? textColor) || undefined,
            rotate: 0,
            width: 160,
            onChange: updateTextNode, 
            onStyle: updateTextStyle,
            onDelete: deleteTextNode,
            nodeId: id 
          },
        };
        setNodes((nds) => nds.concat(node));
      } else {
        const newNode = {
          id: `node-${Date.now()}`,
          type: 'custom',
          position,
          data: {
            label: serviceData.label,
            icon: serviceData.icon,
            subtitle: serviceData.description.split(' ').slice(0, 2).join(' '),
            style: colorStyles[serviceData.color],
            colorToken: serviceData.color,
            edgeColor: tokenToHex.current[serviceData.color] || '#3b82f6',
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const color = getEdgeColorForNode(sourceNode);
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed },
            style: { stroke: color, strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [nodes, getEdgeColorForNode, setEdges]
  );

  // Export diagram as PNG
  const exportToPng = useCallback(() => {
    if (reactFlowWrapper.current === null) {
      return;
    }

    toPng(reactFlowWrapper.current, {
      cacheBust: true,
      backgroundColor: '#0a0a0a',
      pixelRatio: 2,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'architecture-diagram.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error exporting diagram:', err);
      });
  }, []);

  // Clear diagram
  const clearDiagram = () => {
    setNodes([]);
    setEdges([]);
  };

  // Delete a single text node by id
  const deleteTextNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
  }, [setNodes]);

  // Load template
  const loadTemplate = (templateKey) => {
    const template = templates[templateKey];
    // Enrich nodes with derived edge colors for templates
    const enrichedNodes = template.nodes.map((n) => ({
      ...n,
      data: {
        ...n.data,
        edgeColor: n.data?.edgeColor || styleToHex(n.data?.style),
      },
    }));
    setNodes(enrichedNodes);
    // Color edges based on source node category/style
    const colored = template.edges.map((e) => {
      const src = enrichedNodes.find((n) => n.id === e.source);
      const color = getEdgeColorForNode(src);
      return {
        ...e,
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: color, strokeWidth: 2 },
      };
    });
    setEdges(colored);
  };

  // Start dragging service
  const onDragStart = (event, service, category) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ ...service, color: serviceCategories[category].color })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  // Handle delete key press
  const onNodesDelete = useCallback(
    (deleted) => {
      setNodes((nds) => nds.filter((node) => !deleted.find((d) => d.id === node.id)));
    },
    [setNodes]
  );

  const onEdgesDelete = useCallback(
    (deleted) => {
      setEdges((eds) => eds.filter((edge) => !deleted.find((d) => d.id === edge.id)));
    },
    [setEdges]
  );

  const deleteSelected = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => !edge.selected));
  }, [setNodes, setEdges]);

  // Keyboard event handler for delete
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Do not handle Delete/Backspace if user is typing in an input/textarea/contentEditable
      const target = event.target;
      const isEditable =
        (target && (target.closest('input, textarea'))) ||
        (target && target.isContentEditable) ||
        (target && target.getAttribute && target.getAttribute('role') === 'textbox');
      if (isEditable) return;

      if (event.key === 'Delete' || event.key === 'Backspace') {
        // Get selected nodes and edges
        const selectedNodes = nodes.filter((node) => node.selected);
        const selectedEdges = edges.filter((edge) => edge.selected);
        
        if (selectedNodes.length > 0) {
          setNodes((nds) => nds.filter((node) => !node.selected));
        }
        if (selectedEdges.length > 0) {
          setEdges((eds) => eds.filter((edge) => !edge.selected));
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, setNodes, setEdges]);

  // Detect touch-capable devices (covers iPad, tablets, touch laptops)
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showConnectionTip, setShowConnectionTip] = useState(true);

  useEffect(() => {
    const checkTouch = () => {
      try {
        const touch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
        setIsTouchDevice(Boolean(touch));
      } catch {
        setIsTouchDevice(false);
      }
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Touch devices: Tap canvas to place selected service
  const onCanvasClick = useCallback(
    (event) => {
      if (isTouchDevice && selectedService && reactFlowInstance) {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        if (selectedService.id === 'text') {
          const id = `text-${Date.now()}`;
          const node = {
            id,
            type: 'text',
            position,
            data: { 
              text: selectedService.text || 'Text', 
              preset: selectedService.preset || textPreset,
              size: selectedService.size || textSize,
              bold: selectedService.bold ?? textBold,
              italic: selectedService.italic ?? textItalic,
              color: (selectedService.color ?? textColor) || undefined,
              rotate: 0,
              width: 160,
              onChange: updateTextNode, 
              onStyle: updateTextStyle,
              onDelete: deleteTextNode,
              nodeId: id 
            },
          };
          setNodes((nds) => nds.concat(node));
        } else {
          const node = {
            id: `node-${Date.now()}`,
            type: 'custom',
            position,
            data: {
              label: selectedService.label,
              icon: selectedService.icon,
              subtitle: selectedService.description.split(' ').slice(0, 2).join(' '),
              style: selectedService.style,
              colorToken: selectedService.colorToken,
              edgeColor: selectedService.edgeColor,
            },
          };
          setNodes((nds) => nds.concat(node));
        }
        setSelectedService(null); // Clear selection after adding
      }
    },
    [isTouchDevice, selectedService, reactFlowInstance, setNodes]
  );

  // Touch devices: Use pointer down for more reliable placement on iPad/Android
  const onCanvasPointerDown = useCallback(
    (event) => {
      if (event.pointerType !== 'touch') return;
      if (!(isTouchDevice && selectedService && reactFlowInstance)) return;
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (selectedService.id === 'text') {
        const id = `text-${Date.now()}`;
        const node = {
          id,
          type: 'text',
          position,
          data: { text: selectedService.text || 'Text', onChange: updateTextNode, nodeId: id },
        };
        setNodes((nds) => nds.concat(node));
      } else {
        const node = {
          id: `node-${Date.now()}`,
          type: 'custom',
          position,
          data: {
            label: selectedService.label,
            icon: selectedService.icon,
            subtitle: selectedService.description.split(' ').slice(0, 2).join(' '),
            style: selectedService.style,
            colorToken: selectedService.colorToken,
            edgeColor: selectedService.edgeColor,
          },
        };
        setNodes((nds) => nds.concat(node));
      }
      setSelectedService(null);
    },
    [isTouchDevice, selectedService, reactFlowInstance, setNodes]
  );

  // Touch devices: Select service to add
  const onServiceClick = (service, category) => {
    if (isTouchDevice) {
      setSelectedService({
        ...service,
        style: colorStyles[serviceCategories[category].color],
        colorToken: serviceCategories[category].color,
        edgeColor: tokenToHex.current[serviceCategories[category].color] || '#3b82f6',
      });
    }
  };

  return (
    <div className="w-full h-[600px] flex gap-4">
      {/* Service Library Panel */}
      <AnimatePresence>
        {showServicePanel && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-80 bg-card border-2 border-border rounded-xl p-4 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Service Library
              </h3>
              <button
                onClick={() => setShowServicePanel(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Templates */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2 font-semibold">QUICK START</p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                {Object.entries(templates).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => loadTemplate(key)}
                    className="p-2 bg-background border border-border rounded-lg hover:border-primary transition-colors text-xs text-left"
                  >
                    <div className="font-semibold">{template.name}</div>
                    <div className="text-muted-foreground text-xs">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Tool */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2 font-semibold">TEXT TOOL</p>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={textTool}
                  onChange={(e) => setTextTool(e.target.value)}
                  className="flex-1 min-w-[140px] px-2 py-1 text-xs rounded-md border bg-background"
                  placeholder="Type label..."
                />
                {/* Preset */}
                <select
                  value={textPreset}
                  onChange={(e) => setTextPreset(e.target.value)}
                  className="px-2 py-1 text-xs rounded-md border bg-background"
                >
                  <option value="amber">Sticky</option>
                  <option value="mint">Mint</option>
                  <option value="sky">Sky</option>
                  <option value="violet">Violet</option>
                  <option value="gray">Gray</option>
                </select>
                {/* Size */}
                <select
                  value={textSize}
                  onChange={(e) => setTextSize(e.target.value)}
                  className="px-2 py-1 text-xs rounded-md border bg-background"
                >
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                </select>
                {/* Color (optional) */}
                <input
                  type="color"
                  value={textColor || '#f59e0b'}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-8 h-6 border rounded"
                  title="Custom color"
                />
                {/* Bold/Italic */}
                <button
                  type="button"
                  className={`px-2 py-1 text-xs rounded-md border bg-background hover:bg-muted ${textBold ? 'bg-muted font-semibold' : ''}`}
                  onClick={() => setTextBold((v) => !v)}
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  className={`px-2 py-1 text-xs rounded-md border bg-background hover:bg-muted ${textItalic ? 'bg-muted italic' : ''}`}
                  onClick={() => setTextItalic((v) => !v)}
                  title="Italic"
                >
                  I
                </button>
                {isTouchDevice ? (
                  <button
                    className="px-2 py-1 text-xs rounded-md border bg-background hover:bg-muted"
                    onClick={() => setSelectedService({ id: 'text', text: textTool, preset: textPreset, size: textSize, bold: textBold, italic: textItalic, color: textColor })}
                  >
                    Select
                  </button>
                ) : (
                  <button
                    className="px-2 py-1 text-xs rounded-md border bg-background hover:bg-muted"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', JSON.stringify({ id: 'text', text: textTool, preset: textPreset, size: textSize, bold: textBold, italic: textItalic, color: textColor }));
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                  >
                    Drag
                  </button>
                )}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2 font-semibold">CATEGORIES</p>
              <div className="flex flex-wrap gap-1">
                {Object.entries(serviceCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === key
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-border hover:border-primary'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-2">
              {serviceCategories[selectedCategory].services.map((service) => (
                <div
                  key={service.id}
                  draggable={!isTouchDevice}
                  onDragStart={(e) => !isTouchDevice && onDragStart(e, service, selectedCategory)}
                  onClick={() => onServiceClick(service, selectedCategory)}
                  className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                    isTouchDevice ? 'cursor-pointer' : 'cursor-move'
                  } ${colorStyles[serviceCategories[selectedCategory].color]} ${
                    selectedService?.id === service.id ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{service.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{service.label}</div>
                      <div className="text-xs text-muted-foreground">{service.description}</div>
                    </div>
                    {selectedService?.id === service.id && isTouchDevice && (
                      <span className="text-primary text-xs font-bold">Selected ✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Toolbar */}
        <div className="flex items-center justify-between bg-card border border-border rounded-lg p-3">
          <div className="flex gap-2">
            {!showServicePanel && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowServicePanel(true)}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Show Services
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={deleteSelected} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </Button>
            <Button variant="outline" size="sm" onClick={clearDiagram} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Clear
            </Button>
          </div>
          <Button onClick={exportToPng} size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export PNG
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-sm">
          <p className="font-semibold text-primary mb-2">💡 How to use:</p>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              {isTouchDevice ? (
                <span>
                  <strong>Tap a service</strong> in the library, then <strong>tap on the canvas</strong> to place it
                </span>
              ) : (
                <span>
                  <strong>Drag services</strong> from the library onto the canvas
                </span>
              )}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span><strong>Connect:</strong> Click & drag from a colored dot <span className="inline-block w-2 h-2 bg-primary rounded-full"></span> on one node to a dot on another node</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span><strong>Move nodes</strong> by dragging them around</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">4.</span>
              <span><strong>Delete:</strong> Click node → Press Delete/Backspace</span>
            </li>
          </ul>
        </div>

        {/* React Flow Canvas */}
        <div 
          ref={reactFlowWrapper} 
          className="flex-1 rounded-xl border-2 border-border bg-background overflow-hidden relative touch-none overscroll-contain"
          onClick={onCanvasClick}
          onPointerDown={onCanvasPointerDown}
        >
          {/* Connection Tip Overlay */}
          {showConnectionTip && nodes.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground px-6 py-4 rounded-lg shadow-2xl max-w-md"
            >
              <button
                onClick={() => setShowConnectionTip(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-background text-foreground rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                <span>How to Connect Nodes with Arrows</span>
              </p>
              <ol className="text-sm space-y-1.5">
                <li><strong>1.</strong> See the colored dots on each node? Those are connection points!</li>
                <li><strong>2.</strong> Click & hold on ANY dot</li>
                <li><strong>3.</strong> Drag to ANY dot on another node</li>
                <li><strong>4.</strong> Release → Arrow appears! 🎉</li>
              </ol>
              <button
                onClick={() => setShowConnectionTip(false)}
                className="mt-3 w-full bg-background text-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-muted transition-colors"
              >
                Got it!
              </button>
            </motion.div>
          )}
          
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            nodesDraggable={true}
            nodesConnectable={true}
            elementsSelectable={true}
            selectNodesOnDrag={false}
            panOnDrag={[1, 2]}
            zoomOnScroll={!isTouchDevice}
            panOnScroll={!isTouchDevice}
            zoomOnPinch={!isTouchDevice}
            connectionMode="loose"
            connectionLineStyle={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            defaultEdgeOptions={{
              animated: true,
              style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }
            }}
            fitView
            attributionPosition="bottom-right"
            deleteKeyCode="Delete"
          >
            <Controls className="bg-card border border-border rounded-lg" />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePlayground;
