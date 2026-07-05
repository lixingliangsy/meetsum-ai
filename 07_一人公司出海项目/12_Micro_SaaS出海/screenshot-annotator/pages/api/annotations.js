const annotations = [];

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET') {
    // Get annotations for an image
    const { imageId } = req.query;
    
    if (!imageId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Image ID is required' 
      });
    }
    
    const imageAnnotations = annotations.filter(a => a.imageId === imageId);
    
    res.status(200).json({ 
      success: true, 
      annotations: imageAnnotations,
      count: imageAnnotations.length 
    });
  } else if (req.method === 'POST') {
    // Create a new annotation
    const { 
      imageId,
      type, 
      x, 
      y, 
      width, 
      height, 
      color, 
      text 
    } = req.body;
    
    if (!imageId || !type || x === undefined || y === undefined) {
      return res.status(400).json({ 
        success: false, 
        error: 'Image ID, type, x, and y are required' 
      });
    }
    
    const annotation = {
      id: annotations.length + 1,
      imageId,
      type, // arrow, rectangle, circle, text, mosaic, graffiti
      x,
      y,
      width: width || 0,
      height: height || 0,
      color: color || '#ff0000',
      text: text || '',
      createdAt: new Date().toISOString()
    };
    
    annotations.push(annotation);
    
    res.status(201).json({ 
      success: true, 
      annotation,
      message: 'Annotation created successfully' 
    });
  } else if (req.method === 'PUT') {
    // Update an annotation
    const { id, type, x, y, width, height, color, text } = req.body;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Annotation ID is required' 
      });
    }
    
    const index = annotations.findIndex(a => a.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Annotation not found' 
      });
    }
    
    if (type) annotations[index].type = type;
    if (x !== undefined) annotations[index].x = x;
    if (y !== undefined) annotations[index].y = y;
    if (width !== undefined) annotations[index].width = width;
    if (height !== undefined) annotations[index].height = height;
    if (color) annotations[index].color = color;
    if (text !== undefined) annotations[index].text = text;
    
    res.status(200).json({ 
      success: true, 
      annotation: annotations[index],
      message: 'Annotation updated successfully' 
    });
  } else if (req.method === 'DELETE') {
    // Delete an annotation
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Annotation ID is required' 
      });
    }
    
    const index = annotations.findIndex(a => a.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Annotation not found' 
      });
    }
    
    annotations.splice(index, 1);
    
    res.status(200).json({ 
      success: true, 
      message: 'Annotation deleted successfully' 
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}