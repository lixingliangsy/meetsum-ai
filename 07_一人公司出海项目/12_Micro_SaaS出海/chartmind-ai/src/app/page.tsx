// src/app/page.tsx
// 主页面 - 图表识别、数据提取和生成

'use client';

import { useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  registerables,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, Scatter, Radar } from 'react-chartjs-2';
import { chartRecognitionService } from '@/lib/chart-recognition';
import { aiService } from '@/lib/ai-service';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<any>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [generatedChart, setGeneratedChart] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证图片
    const validation = chartRecognitionService.validateImage(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid image');
      return;
    }

    // 显示预览
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // 处理图片
    processImage(file);
  };

  // 处理图片识别和数据提取
  const processImage = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setRecognitionResult(null);
    setExtractedData(null);
    setGeneratedChart(null);

    try {
      // 创建 FormData
      const formData = new FormData();
      formData.append('image', file);

      // 调用识别 API
      const response = await fetch('/api/recognize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to recognize chart');
      }

      const result = await response.json();

      if (result.success) {
        setRecognitionResult(result.recognition);
        setExtractedData(result.data);

        // 生成新图表
        await generateChart(result.data);
      } else {
        setError(result.error || 'Recognition failed');
      }
    } catch (err) {
      console.error('Processing error:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 根据提取的数据生成图表
  const generateChart = async (data: any) => {
    try {
      const chartConfig = await aiService.generateChartConfig(
        JSON.stringify(data),
        data.title || 'Extracted Chart',
        recognitionResult?.chartType
      );

      if (chartConfig.success && chartConfig.config) {
        setGeneratedChart(chartConfig.config);
      }
    } catch (err) {
      console.error('Chart generation error:', err);
    }
  };

  // 渲染生成的图表
  const renderGeneratedChart = () => {
    if (!generatedChart) return null;

    const chartType = generatedChart.type;

    const chartComponents: any = {
      line: Line,
      bar: Bar,
      pie: Pie,
      doughnut: Doughnut,
      scatter: Scatter,
      radar: Radar,
    };

    const ChartComponent = chartComponents[chartType];

    if (!ChartComponent) {
      return <div className="text-gray-400">Unsupported chart type: {chartType}</div>;
    }

    return (
      <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Generated Chart</h3>
        <div className="h-96">
          <ChartComponent data={generatedChart.data} options={generatedChart.options} />
        </div>
      </div>
    );
  };

  // 渲染识别结果
  const renderRecognitionResult = () => {
    if (!recognitionResult) return null;

    return (
      <div className="mt-6 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recognition Result</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Chart Type:</span>
            <span className="font-medium text-blue-600">{recognitionResult.chartType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Confidence:</span>
            <span className="font-medium">{(recognitionResult.confidence * 100).toFixed(1)}%</span>
          </div>
          <div className="mt-2">
            <div className="text-gray-600 mb-1">Detected Features:</div>
            <div className="flex flex-wrap gap-2">
              {recognitionResult.detectedFeatures.map((feature: string, index: number) => (
                <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 渲染提取的数据
  const renderExtractedData = () => {
    if (!extractedData || !extractedData.success) return null;

    return (
      <div className="mt-6 bg-green-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Extracted Data</h3>
        <div className="space-y-4">
          {extractedData.title && (
            <div>
              <span className="text-gray-600">Title: </span>
              <span className="font-medium">{extractedData.title}</span>
            </div>
          )}
          <div>
            <div className="text-gray-600 mb-2">Labels:</div>
            <div className="flex flex-wrap gap-2">
              {extractedData.labels.map((label: string, index: number) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded">
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-gray-600 mb-2">Datasets:</div>
            {extractedData.datasets.map((dataset: any, index: number) => (
              <div key={index} className="mt-2 p-3 bg-white rounded-lg">
                <div className="font-medium">{dataset.label}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Data: {JSON.stringify(dataset.data)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <span className="font-bold text-xl">ChartMind AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </a>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI-Powered Chart Recognition
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload any chart image and let AI recognize the chart type, extract the data,
            and generate a new interactive chart.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Chart Image</h2>
            
            {/* Upload Area */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-500 transition cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadedImage ? (
                <div>
                  <img
                    src={uploadedImage}
                    alt="Uploaded chart"
                    className="max-w-full h-auto rounded-lg"
                  />
                  <p className="mt-4 text-sm text-gray-500">Click to upload a different image</p>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Processing Indicator */}
            {isProcessing && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-2 text-gray-600">Processing image...</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div>
            {/* Recognition Result */}
            {renderRecognitionResult()}

            {/* Extracted Data */}
            {renderExtractedData()}

            {/* Generated Chart */}
            {renderGeneratedChart()}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🔍',
              title: 'Chart Recognition',
              description: 'Automatically identify chart types including bar, line, pie, scatter, radar, and more.',
            },
            {
              icon: '📈',
              title: 'Data Extraction',
              description: 'Extract data points, labels, and values from chart images with high accuracy.',
            },
            {
              icon: '🎨',
              title: 'Chart Generation',
              description: 'Generate interactive charts from extracted data. Export to Python, JavaScript, or R.',
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="/terms.html" className="text-gray-600 hover:text-primary-600">Terms</a>
            <a href="/privacy.html" className="text-gray-600 hover:text-primary-600">Privacy</a>
            <a href="/pricing.html" className="text-gray-600 hover:text-primary-600">Pricing</a>
            <a href="/support.html" className="text-gray-600 hover:text-primary-600">Support</a>
            <a href="/refund-policy.html" className="text-gray-600 hover:text-primary-600">Refund Policy</a>
          </div>
          <p>© 2026 ChartMind AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
