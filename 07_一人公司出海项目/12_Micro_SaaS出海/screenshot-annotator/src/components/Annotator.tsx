// src/components/Annotator.tsx
// Main screenshot annotation component with Canvas-based drawing tools

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function Annotator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'select' | 'text' | 'arrow' | 'rect' | 'circle' | 'freehand' | 'callout'>('select');
  const [color, setColor] = useState('#ff0000');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [currentAnnotation, setCurrentAnnotation] = useState<any>(null);
  const [textInput, setTextInput] = useState('');
  const [textPosition, setTextPosition] = useState<{ x: number; y: number } | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.lineWidth = strokeWidth;
    contextRef.current = context;
  }, [color, strokeWidth]);

  // Redraw canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image if exists
    if (image) {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    // Draw all annotations
    annotations.forEach((annotation) => {
      drawAnnotation(context, annotation);
    });

    // Draw current annotation if exists
    if (currentAnnotation) {
      drawAnnotation(context, currentAnnotation);
    }
  }, [image, annotations, currentAnnotation]);

  // Draw a single annotation
  const drawAnnotation = (context: CanvasRenderingContext2D, annotation: any) => {
    context.strokeStyle = annotation.color || color;
    context.lineWidth = annotation.strokeWidth || strokeWidth;
    context.fillStyle = annotation.color || color;

    switch (annotation.type) {
      case 'arrow':
        drawArrow(context, annotation.startX, annotation.startY, annotation.endX, annotation.endY);
        break;
      case 'rect':
        context.strokeRect(
          annotation.startX,
          annotation.startY,
          annotation.endX - annotation.startX,
          annotation.endY - annotation.startY
        );
        break;
      case 'circle':
        const centerX = (annotation.startX + annotation.endX) / 2;
        const centerY = (annotation.startY + annotation.endY) / 2;
        const radiusX = Math.abs(annotation.endX - annotation.startX) / 2;
        const radiusY = Math.abs(annotation.endY - annotation.startY) / 2;
        context.beginPath();
        context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        context.stroke();
        break;
      case 'freehand':
        if (annotation.points && annotation.points.length > 0) {
          context.beginPath();
          context.moveTo(annotation.points[0].x, annotation.points[0].y);
          for (let i = 1; i < annotation.points.length; i++) {
            context.lineTo(annotation.points[i].x, annotation.points[i].y);
          }
          context.stroke();
        }
        break;
      case 'text':
        context.font = `${annotation.fontSize || 16}px Arial`;
        context.fillText(annotation.text || '', annotation.startX, annotation.startY);
        break;
      case 'callout':
        drawCallout(context, annotation);
        break;
    }
  };

  // Draw arrow
  const drawArrow = (
    context: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    const headLength = 15;
    const dx = endX - startX;
    const dy = endY - startY;
    const angle = Math.atan2(dy, dx);

    // Draw line
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();

    // Draw arrowhead
    context.beginPath();
    context.moveTo(endX, endY);
    context.lineTo(
      endX - headLength * Math.cos(angle - Math.PI / 6),
      endY - headLength * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(endX, endY);
    context.lineTo(
      endX - headLength * Math.cos(angle + Math.PI / 6),
      endY - headLength * Math.sin(angle + Math.PI / 6)
    );
    context.stroke();
  };

  // Draw callout (speech bubble)
  const drawCallout = (context: CanvasRenderingContext2D, annotation: any) => {
    const text = annotation.text || 'Callout';
    const x = annotation.startX;
    const y = annotation.startY;
    const padding = 10;
    
    context.font = `${annotation.fontSize || 16}px Arial`;
    const metrics = context.measureText(text);
    const textWidth = metrics.width;
    const textHeight = annotation.fontSize || 16;
    
    const boxWidth = textWidth + padding * 2;
    const boxHeight = textHeight + padding * 2;
    
    // Draw rounded rectangle
    context.fillStyle = 'white';
    context.strokeStyle = annotation.color || color;
    context.lineWidth = annotation.strokeWidth || strokeWidth;
    
    context.beginPath();
    context.roundRect(x, y, boxWidth, boxHeight, 8);
    context.fill();
    context.stroke();
    
    // Draw text
    context.fillStyle = '#333';
    context.fillText(text, x + padding, y + padding + textHeight * 0.8);
    
    // Draw pointer (small triangle at bottom-left)
    context.fillStyle = 'white';
    context.beginPath();
    context.moveTo(x + 20, y + boxHeight);
    context.lineTo(x + 30, y + boxHeight + 10);
    context.lineTo(x + 40, y + boxHeight);
    context.fill();
    context.stroke();
  };

  // Save to history
  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (!canvas || !context) return;

      const img = new Image();
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
      };
      img.src = history[historyIndex - 1];
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (!canvas || !context) return;

      const img = new Image();
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
      };
      img.src = history[historyIndex + 1];
    }
  };

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'text') {
      setTextPosition({ x, y });
      return;
    }

    setIsDrawing(true);

    if (tool === 'freehand') {
      setCurrentAnnotation({
        type: 'freehand',
        points: [{ x, y }],
        color,
        strokeWidth,
      });
    } else {
      setCurrentAnnotation({
        type: tool,
        startX: x,
        startY: y,
        endX: x,
        endY: y,
        color,
        strokeWidth,
      });
    }
  };

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentAnnotation) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'freehand') {
      setCurrentAnnotation((prev: any) => ({
        ...prev,
        points: [...prev.points, { x, y }],
      }));
    } else {
      setCurrentAnnotation((prev: any) => ({
        ...prev,
        endX: x,
        endY: y,
      }));
    }

    redrawCanvas();
  };

  // Handle mouse up
  const handleMouseUp = () => {
    if (!isDrawing || !currentAnnotation) return;

    setIsDrawing(false);

    if (tool === 'text') return;

    setAnnotations([...annotations, currentAnnotation]);
    setCurrentAnnotation(null);
    saveToHistory();
    redrawCanvas();
  };

  // Handle text input
  const handleTextSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && textPosition) {
      const newAnnotation = {
        type: 'text',
        text: textInput,
        startX: textPosition.x,
        startY: textPosition.y,
        color,
        fontSize: 16,
      };

      setAnnotations([...annotations, newAnnotation]);
      setTextInput('');
      setTextPosition(null);
      saveToHistory();
      redrawCanvas();
    }
  };

  // Upload image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        redrawCanvas();
        saveToHistory();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Load image from URL
  const handleUrlLoad = (url: string) => {
    if (!url) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImage(img);
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      redrawCanvas();
      saveToHistory();
    };
    img.onerror = () => {
      alert('Failed to load image from URL');
    };
    img.src = url;
  };

  // Export image
  const handleExport = (format: 'png' | 'jpg' = 'png') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `annotated-screenshot.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  };

  // Clear all annotations
  const handleClear = () => {
    setAnnotations([]);
    setCurrentAnnotation(null);
    redrawCanvas();
    saveToHistory();
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Toolbar */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        padding: '15px',
        background: '#f3f4f6',
        borderRadius: '8px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        {/* Tools */}
        {[
          { id: 'select', label: '↖️ Select' },
          { id: 'text', label: '💬 Text' },
          { id: 'arrow', label: '➡️ Arrow' },
          { id: 'rect', label: '⬜ Rect' },
          { id: 'circle', label: '🔴 Circle' },
          { id: 'freehand', label: '✏️ Freehand' },
          { id: 'callout', label: '🔖 Callout' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id as any)}
            style={{
              padding: '8px 12px',
              background: tool === t.id ? '#3b82f6' : 'white',
              color: tool === t.id ? 'white' : '#333',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {t.label}
          </button>
        ))}

        {/* Color Picker */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer' }}
        />

        {/* Stroke Width */}
        <select
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
        >
          <option value={1}>Thin</option>
          <option value={3}>Medium</option>
          <option value={5}>Thick</option>
        </select>

        {/* Undo/Redo */}
        <button onClick={undo} disabled={historyIndex <= 0} style={{ padding: '8px 12px', ...buttonStyle(historyIndex > 0) }}>
          ↩️ Undo
        </button>
        <button onClick={redo} disabled={historyIndex >= history.length - 1} style={{ padding: '8px 12px', ...buttonStyle(historyIndex < history.length - 1) }}>
          ↪️ Redo
        </button>

        {/* Clear */}
        <button onClick={handleClear} style={{ padding: '8px 12px', ...buttonStyle(true), background: '#ef4444', color: 'white' }}>
          🗑️ Clear
        </button>

        {/* Export */}
        <button onClick={() => handleExport('png')} style={{ padding: '8px 12px', ...buttonStyle(true), background: '#10b981', color: 'white' }}>
          📥 Export PNG
        </button>
      </div>

      {/* Canvas */}
      <div style={{ 
        border: '2px solid #d1d5db',
        borderRadius: '8px',
        overflow: 'auto',
        maxHeight: '70vh',
        background: '#f9fafb',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ 
            cursor: tool === 'select' ? 'default' : 'crosshair',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>

      {/* Text Input */}
      {textPosition && (
        <div style={{ marginTop: '10px' }}>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={handleTextSubmit}
            placeholder="Type text and press Enter"
            autoFocus
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid #d1d5db', 
              borderRadius: '8px',
              fontSize: '14px',
            }}
          />
        </div>
      )}

      {/* Upload Controls */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => document.getElementById('file-input')?.click()}
          style={{ padding: '12px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
        >
          📁 Upload Image
        </button>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        
        <input
          type="text"
          placeholder="Or paste image URL and press Enter"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUrlLoad((e.target as HTMLInputElement).value);
            }
          }}
          style={{ 
            flex: 1, 
            padding: '12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '8px',
            fontSize: '14px',
          }}
        />
      </div>
    </div>
  );
}

// Button style helper
function buttonStyle(enabled: boolean) {
  return {
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: enabled ? 'pointer' : 'not-allowed',
    opacity: enabled ? 1 : 0.5,
  };
}
