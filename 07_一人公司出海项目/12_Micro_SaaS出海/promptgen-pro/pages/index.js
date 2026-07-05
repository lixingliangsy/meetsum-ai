// pages/index.js
// 主页面 - 提示词模板浏览、提示词生成界面

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [activeTab, setActiveTab] = useState('generate'); // 'generate', 'templates', 'saved', 'optimize'
  const [templates, setTemplates] = useState([]);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 生成相关状态
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [variants, setVariants] = useState([]);
  
  // 优化相关状态
  const [promptToOptimize, setPromptToOptimize] = useState('');
  const [optimizationLevel, setOptimizationLevel] = useState('standard');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [optimizationResult, setOptimizationResult] = useState(null);
  
  // 保存相关状态
  const [saveName, setSaveName] = useState('');
  const [saveCategory, setSaveCategory] = useState('general');
  const [saveTags, setSaveTags] = useState('');
  
  // 加载模板
  useEffect(() => {
    if (activeTab === 'templates') {
      fetchTemplates();
    } else if (activeTab === 'saved') {
      fetchSavedPrompts();
    }
  }, [activeTab]);
  
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (data.success) {
        setTemplates(data.templates);
      }
    } catch (err) {
      setError('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchSavedPrompts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/saved');
      const data = await res.json();
      if (data.success) {
        setSavedPrompts(data.savedPrompts);
      }
    } catch (err) {
      setError('Failed to load saved prompts');
    } finally {
      setLoading(false);
    }
  };
  
  // 生成提示词
  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          model: selectedModel,
          templateId: selectedTemplate || undefined
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setGeneratedPrompt(data.generatedPrompt);
        setVariants(data.variants || []);
      } else {
        setError(data.error || 'Failed to generate prompt');
      }
    } catch (err) {
      setError('Failed to generate prompt');
    } finally {
      setLoading(false);
    }
  };
  
  // 优化提示词
  const handleOptimize = async () => {
    if (!promptToOptimize.trim()) {
      setError('Please enter a prompt to optimize');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToOptimize,
          optimizationLevel,
          targetModel: selectedModel
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setOptimizedPrompt(data.optimizedPrompt);
        setOptimizationResult(data);
      } else {
        setError(data.error || 'Failed to optimize prompt');
      }
    } catch (err) {
      setError('Failed to optimize prompt');
    } finally {
      setLoading(false);
    }
  };
  
  // 保存提示词
  const handleSave = async () => {
    const promptToSave = generatedPrompt || optimizedPrompt;
    
    if (!promptToSave) {
      setError('No prompt to save');
      return;
    }
    
    try {
      const res = await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: saveName || 'Untitled Prompt',
          prompt: promptToSave,
          category: saveCategory,
          tags: saveTags.split(',').map(t => t.trim()).filter(t => t)
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert('Prompt saved successfully!');
        setSaveName('');
        setSaveTags('');
        fetchSavedPrompts();
      }
    } catch (err) {
      setError('Failed to save prompt');
    }
  };
  
  return (
    <>
      <Head>
        <title>PromptGen Pro - AI Prompt Generator</title>
        <meta name="description" content="Generate, optimize, and manage AI prompts with ease." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">PG</span>
              </div>
              <span className="font-bold text-xl">PromptGen Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</a>
              <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Prompt Engineering
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Generate optimized prompts, browse templates, and manage your prompt library.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm p-1 flex space-x-1">
              {[
                { id: 'generate', label: 'Generate' },
                { id: 'templates', label: 'Templates' },
                { id: 'optimize', label: 'Optimize' },
                { id: 'saved', label: 'Saved' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="max-w-3xl mx-auto mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Generate Tab */}
          {activeTab === 'generate' && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Generate Prompt</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe what you want to generate
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="4"
                      placeholder="e.g., Write a blog post about AI in healthcare..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Template (Optional)
                      </label>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="">No template</option>
                        <option value="tpl_001">Article Writing</option>
                        <option value="tpl_002">Code Generation</option>
                        <option value="tpl_003">Data Analysis</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AI Model
                      </label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="claude">Claude</option>
                        <option value="gemini">Gemini</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Generating...' : 'Generate Prompt'}
                  </button>
                </div>
                
                {/* Generated Result */}
                {generatedPrompt && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold mb-4">Generated Prompt</h3>
                    <div className="bg-gray-50 rounded-lg p-6 mb-4">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">{generatedPrompt}</pre>
                    </div>
                    
                    {variants.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Variants</h4>
                        {variants.map((variant, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4 mb-2">
                            <div className="font-medium text-purple-600">{variant.name}</div>
                            <div className="text-sm text-gray-600 mt-1">{variant.description}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Save Prompt
                      </button>
                      <button
                        onClick={() => {
                          setPromptToOptimize(generatedPrompt);
                          setActiveTab('optimize');
                        }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Optimize Further
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Prompt Templates</h2>
                <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                  Create Template
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-12">Loading templates...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map(template => (
                    <div key={template.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-4">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                          {template.category}
                        </span>
                        <span className="text-sm text-gray-500">{template.usageCount} uses</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                      <button
                        onClick={() => {
                          setSelectedTemplate(template.id);
                          setActiveTab('generate');
                        }}
                        className="w-full bg-purple-50 text-purple-700 py-2 rounded-lg hover:bg-purple-100 transition"
                      >
                        Use Template
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Optimize Tab */}
          {activeTab === 'optimize' && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Optimize Prompt</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paste your prompt here
                    </label>
                    <textarea
                      value={promptToOptimize}
                      onChange={(e) => setPromptToOptimize(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="6"
                      placeholder="Paste your prompt here to optimize..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Optimization Level
                    </label>
                    <div className="flex space-x-4">
                      {['basic', 'standard', 'advanced'].map(level => (
                        <button
                          key={level}
                          onClick={() => setOptimizationLevel(level)}
                          className={`flex-1 py-3 rounded-lg font-medium transition ${
                            optimizationLevel === level
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={handleOptimize}
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Optimizing...' : 'Optimize Prompt'}
                  </button>
                </div>
                
                {/* Optimization Result */}
                {optimizedPrompt && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold mb-4">Optimized Prompt</h3>
                    <div className="bg-gray-50 rounded-lg p-6 mb-4">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">{optimizedPrompt}</pre>
                    </div>
                    
                    {optimizationResult && (
                      <div className="bg-green-50 rounded-lg p-4 mb-4">
                        <div className="font-medium text-green-700 mb-2">Improvement Score</div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-gray-600">
                            Original: {optimizationResult.scores.original}/100
                          </div>
                          <div className="text-sm text-gray-600">
                            → Optimized: {optimizationResult.scores.optimized}/100
                          </div>
                          <div className="text-sm font-medium text-green-600">
                            +{optimizationResult.scores.improvement} points
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Save Optimized Prompt
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Saved Tab */}
          {activeTab === 'saved' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Saved Prompts</h2>
                <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                  Save New Prompt
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-12">Loading saved prompts...</div>
              ) : savedPrompts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No saved prompts yet. Generate and save your first prompt!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedPrompts.map(saved => (
                    <div key={saved.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {saved.category}
                        </span>
                        <div className="flex space-x-1">
                          {saved.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{saved.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {saved.prompt}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Used {saved.usageCount} times
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-purple-600 hover:text-purple-700">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-20 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center mb-4">
              <div className="flex justify-center gap-6 mb-4">
                <a href="/terms.html" className="text-gray-600 hover:text-gray-900">Terms</a>
                <a href="/privacy.html" className="text-gray-600 hover:text-gray-900">Privacy</a>
                <a href="/pricing.html" className="text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="/support.html" className="text-gray-600 hover:text-gray-900">Support</a>
                <a href="/refund-policy.html" className="text-gray-600 hover:text-gray-900">Refund Policy</a>
              </div>
            </div>
            <div className="text-center text-gray-500">
              © 2026 PromptGen Pro. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
