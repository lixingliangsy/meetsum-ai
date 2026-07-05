// pages/api/features.js
// Feature list API for screenshot-annotator

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json({
    product: 'screenshot-annotator',
    version: '1.0.0',
    features: [
      {
        id: 'feature_001',
        name: 'Image Upload',
        status: 'implemented',
        description: 'Upload screenshots from device or paste image URLs. Supports PNG, JPG, WebP formats.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_002',
        name: 'Annotation Tools',
        status: 'implemented',
        description: '7 annotation tools: Text, Arrow, Rectangle, Circle, Freehand, Callout. Each tool is fully functional with Canvas-based drawing.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_003',
        name: 'Style Customization',
        status: 'implemented',
        description: 'Customize annotation color and stroke width. Color picker and preset sizes (thin, medium, thick).',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_004',
        name: 'Undo/Redo',
        status: 'implemented',
        description: 'Unlimited undo/redo history. Revert mistakes easily.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_005',
        name: 'Export',
        status: 'implemented',
        description: 'Export annotated screenshots as PNG files. High-quality output preserving all annotations.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_006',
        name: 'Privacy-First',
        status: 'implemented',
        description: 'All processing happens in the browser. Images are not uploaded to servers, ensuring complete privacy.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_007',
        name: 'Responsive Canvas',
        status: 'implemented',
        description: 'Canvas automatically resizes to fit the image. Supports scrolling for large screenshots.',
        implementedIn: 'v1.0.0',
      },
    ],
    upcoming: [
      {
        id: 'upcoming_001',
        name: 'Cloud Storage',
        status: 'planned',
        description: 'Save and load annotations from cloud storage',
        expectedRelease: '2026-Q3',
      },
      {
        id: 'upcoming_002',
        name: 'Team Collaboration',
        status: 'planned',
        description: 'Share annotations with team members and collaborate in real-time',
        expectedRelease: '2026-Q3',
      },
      {
        id: 'upcoming_003',
        name: 'More Export Formats',
        status: 'planned',
        description: 'Export as JPG, PDF, SVG formats',
        expectedRelease: '2026-Q3',
      },
      {
        id: 'upcoming_004',
        name: 'Templates',
        status: 'planned',
        description: 'Pre-built annotation templates for common use cases',
        expectedRelease: '2026-Q4',
      },
      {
        id: 'upcoming_005',
        name: 'Blur Tool',
        status: 'planned',
        description: 'Blur sensitive information in screenshots',
        expectedRelease: '2026-Q4',
      },
    ],
    limitations: [
      {
        note: 'Currently export is limited to PNG format (JPG and PDF coming soon).',
      },
      {
        note: 'Annotations are not automatically saved. Users must export manually.',
      },
      {
        note: 'Team collaboration features are not yet implemented.',
      },
    ],
  });
}
