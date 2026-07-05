// src/app/api/recognize/route.ts
// 图表识别 API - 处理图片上传并识别图表类型

import { NextRequest, NextResponse } from 'next/server';
import { chartRecognitionService } from '@/lib/chart-recognition';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }
    
    // 验证图片
    const validation = chartRecognitionService.validateImage(file);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }
    
    // 识别图表类型
    const recognitionResult = await chartRecognitionService.recognizeChart(file);
    
    // 提取数据
    const extractedData = await chartRecognitionService.extractData(
      file,
      recognitionResult.chartType
    );
    
    return NextResponse.json({
      success: true,
      recognition: {
        chartType: recognitionResult.chartType,
        confidence: recognitionResult.confidence,
        detectedFeatures: recognitionResult.detectedFeatures
      },
      data: extractedData,
      message: `Successfully recognized ${recognitionResult.chartType} chart`
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process image' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Chart Recognition API',
    supportedTypes: chartRecognitionService.getSupportedChartTypes(),
    usage: {
      method: 'POST',
      contentType: 'multipart/form-data',
      fieldName: 'image',
      maxFileSize: '10MB',
      supportedFormats: ['JPEG', 'PNG', 'GIF', 'WebP']
    }
  });
}
