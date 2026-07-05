// src/lib/chart-recognition.ts
// 图表识别服务 - 识别图片中的图表类型

export interface ChartRecognitionResult {
  chartType: string;
  confidence: number;
  detectedFeatures: string[];
}

export interface DataExtractionResult {
  success: boolean;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
  }[];
  title?: string;
  error?: string;
}

// 图表类型定义
export const CHART_TYPES = {
  BAR: 'bar',
  LINE: 'line',
  PIE: 'pie',
  DOUGHNUT: 'doughnut',
  SCATTER: 'scatter',
  RADAR: 'radar',
  STACKED_BAR: 'stackedBar',
  AREA: 'area',
  BUBBLE: 'bubble',
  POLAR: 'polarArea'
};

export class ChartRecognitionService {
  // 模拟图表识别 - 在实际应用中，这里应该使用 TensorFlow.js 或调用 OCR/计算机视觉 API
  async recognizeChart(imageFile: File | Blob): Promise<ChartRecognitionResult> {
    try {
      // 将图片转换为 base64
      const base64 = await this.fileToBase64(imageFile);
      
      // 模拟识别过程（实际应用中应该调用 AI 模型）
      // 这里使用图片的特征来模拟识别
      const imageFeatures = await this.extractImageFeatures(base64);
      
      // 基于特征判断图表类型
      const result = this.classifyChartType(imageFeatures);
      
      return result;
    } catch (error) {
      console.error('Chart recognition error:', error);
      return {
        chartType: 'unknown',
        confidence: 0,
        detectedFeatures: []
      };
    }
  }
  
  // 从图表中提取数据
  async extractData(imageFile: File | Blob, chartType?: string): Promise<DataExtractionResult> {
    try {
      // 模拟数据提取过程
      // 实际应用中应该使用 OCR 和计算机视觉技术
      
      const recognizedType = chartType || (await this.recognizeChart(imageFile)).chartType;
      
      // 根据图表类型生成模拟数据
      // 实际应用中应该从图片中真实提取数据
      const extractedData = this.generateMockData(recognizedType);
      
      return {
        success: true,
        ...extractedData
      };
    } catch (error) {
      console.error('Data extraction error:', error);
      return {
        success: false,
        labels: [],
        datasets: [],
        error: 'Failed to extract data from chart'
      };
    }
  }
  
  // 将文件转换为 base64
  private fileToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
  
  // 提取图片特征（模拟）
  private async extractImageFeatures(base64: string): Promise<number[]> {
    // 模拟特征提取
    // 实际应用中应该使用 TensorFlow.js 或其他 CV 库
    return new Promise(resolve => {
      setTimeout(() => {
        // 生成随机特征向量（模拟）
        const features = Array.from({ length: 10 }, () => Math.random());
        resolve(features);
      }, 500);
    });
  }
  
  // 根据特征分类图表类型
  private classifyChartType(features: number[]): ChartRecognitionResult {
    // 模拟分类逻辑
    // 实际应用中应该使用训练好的模型
    
    const avgFeature = features.reduce((a, b) => a + b, 0) / features.length;
    
    let chartType = 'bar';
    let confidence = 0.7;
    const detectedFeatures: string[] = [];
    
    if (avgFeature > 0.7) {
      chartType = 'pie';
      confidence = 0.85;
      detectedFeatures.push('circular shape', 'color segments');
    } else if (avgFeature > 0.5) {
      chartType = 'line';
      confidence = 0.8;
      detectedFeatures.push('connected points', 'trend line');
    } else if (avgFeature > 0.3) {
      chartType = 'bar';
      confidence = 0.9;
      detectedFeatures.push('rectangular bars', 'categories');
    } else {
      chartType = 'scatter';
      confidence = 0.75;
      detectedFeatures.push('分散的数据点', 'no connecting lines');
    }
    
    return {
      chartType,
      confidence,
      detectedFeatures
    };
  }
  
  // 生成模拟数据（实际应用中应该从图片中提取真实数据）
  private generateMockData(chartType: string): { labels: string[]; datasets: any[]; title?: string } {
    switch (chartType) {
      case 'bar':
        return {
          labels: ['产品 A', '产品 B', '产品 C', '产品 D'],
          datasets: [{
            label: '销售额',
            data: [65, 59, 80, 81],
            backgroundColor: [
              'rgba(99, 102, 241, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(168, 85, 247, 0.8)',
              'rgba(192, 132, 252, 0.8)',
            ]
          }],
          title: '产品销售对比'
        };
        
      case 'line':
        return {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
          datasets: [{
            label: '用户增长',
            data: [120, 190, 150, 220, 280, 350],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
          }],
          title: '用户增长趋势'
        };
        
      case 'pie':
      case 'doughnut':
        return {
          labels: ['直接访问', '搜索引擎', '社交媒体', '推荐链接'],
          datasets: [{
            data: [35, 40, 15, 10],
            backgroundColor: [
              'rgba(99, 102, 241, 0.85)',
              'rgba(168, 85, 247, 0.85)',
              'rgba(236, 72, 153, 0.85)',
              'rgba(34, 197, 94, 0.85)',
            ]
          }],
          title: '流量来源分布'
        };
        
      case 'scatter':
        return {
          labels: ['数据点'],
          datasets: [{
            label: '相关性分析',
            data: [
              { x: 10, y: 20 }, { x: 15, y: 25 }, { x: 20, y: 30 },
              { x: 25, y: 35 }, { x: 30, y: 42 }, { x: 35, y: 48 },
              { x: 40, y: 52 }, { x: 45, y: 58 }, { x: 50, y: 65 }
            ],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
          }],
          title: '相关性分析'
        };
        
      case 'radar':
        return {
          labels: ['速度', '质量', '价格', '支持', '功能', '设计'],
          datasets: [{
            label: '评分',
            data: [85, 90, 70, 95, 80, 88],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
          }],
          title: '性能评估'
        };
        
      default:
        return {
          labels: ['类别 A', '类别 B', '类别 C', '类别 D'],
          datasets: [{
            label: '数值',
            data: [65, 59, 80, 81],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
          }],
          title: '图表数据'
        };
    }
  }
  
  // 获取支持的图表类型列表
  getSupportedChartTypes(): string[] {
    return Object.values(CHART_TYPES);
  }
  
  // 验证图片格式
  validateImage(file: File): { valid: boolean; error?: string } {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: '不支持的图片格式。请上传 JPG、PNG、GIF 或 WebP 格式的图片。'
      };
    }
    
    if (file.size > maxSize) {
      return {
        valid: false,
        error: '图片大小超过 10MB 限制。'
      };
    }
    
    return { valid: true };
  }
}

// 导出单例
export const chartRecognitionService = new ChartRecognitionService();
export default chartRecognitionService;
