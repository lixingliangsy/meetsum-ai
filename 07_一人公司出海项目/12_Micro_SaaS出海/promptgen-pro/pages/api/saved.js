// pages/api/saved.js
// 保存的提示词管理 API - 用户可以保存、编辑、分享提示词

let savedPrompts = [
  {
    id: 'saved_001',
    name: '高质量文章写作',
    prompt: '请写一篇关于人工智能在医疗领域应用的文章，要求：\n1. 字数：1500字\n2. 风格：专业但易懂\n3. 目标读者：医疗行业从业者\n4. 包含引言、主体和结论\n5. 使用清晰的语言和生动的例子',
    category: 'writing',
    tags: ['文章', 'AI', '医疗'],
    isPublic: false,
    usageCount: 5,
    rating: 4.5,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-05T14:30:00Z'
  },
  {
    id: 'saved_002',
    name: 'Python数据分析代码',
    prompt: '请生成 Python 代码来分析 CSV 文件中的销售数据。要求：\n1. 使用 pandas 读取数据\n2. 计算基本统计信息\n3. 生成可视化图表\n4. 包含详细的代码注释\n5. 处理可能的异常',
    category: 'programming',
    tags: ['Python', '数据分析', '可视化'],
    isPublic: true,
    usageCount: 12,
    rating: 4.8,
    createdAt: '2026-02-02T09:15:00Z',
    updatedAt: '2026-02-02T09:15:00Z'
  }
];

export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  
  switch (method) {
    case 'GET':
      if (id) {
        // 获取单个保存的提示词
        const saved = savedPrompts.find(s => s.id === id);
        if (!saved) {
          return res.status(404).json({ success: false, error: 'Saved prompt not found' });
        }
        return res.status(200).json({ success: true, savedPrompt: saved });
      } else {
        // 获取所有保存的提示词（支持筛选）
        const { category, tag, search, isPublic } = req.query;
        let filtered = savedPrompts;
        
        if (category) {
          filtered = filtered.filter(s => s.category === category);
        }
        
        if (tag) {
          filtered = filtered.filter(s => s.tags.includes(tag));
        }
        
        if (search) {
          const searchLower = search.toLowerCase();
          filtered = filtered.filter(s =>
            s.name.toLowerCase().includes(searchLower) ||
            s.prompt.toLowerCase().includes(searchLower)
          );
        }
        
        if (isPublic !== undefined) {
          const publicFilter = isPublic === 'true';
          filtered = filtered.filter(s => s.isPublic === publicFilter);
        }
        
        return res.status(200).json({
          success: true,
          savedPrompts: filtered,
          total: filtered.length
        });
      }
      
    case 'POST':
      // 创建新保存的提示词
      const { name, prompt, category, tags, isPublic } = req.body;
      
      if (!name || !prompt) {
        return res.status(400).json({
          success: false,
          error: 'Name and prompt are required'
        });
      }
      
      const newSaved = {
        id: `saved_${Date.now()}`,
        name,
        prompt,
        category: category || 'general',
        tags: tags || [],
        isPublic: isPublic || false,
        usageCount: 0,
        rating: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      savedPrompts.push(newSaved);
      
      return res.status(201).json({
        success: true,
        savedPrompt: newSaved,
        message: 'Prompt saved successfully'
      });
      
    case 'PUT':
      // 更新保存的提示词
      if (!id) {
        return res.status(400).json({ success: false, error: 'Saved prompt ID required' });
      }
      
      const updateIndex = savedPrompts.findIndex(s => s.id === id);
      if (updateIndex === -1) {
        return res.status(404).json({ success: false, error: 'Saved prompt not found' });
      }
      
      savedPrompts[updateIndex] = {
        ...savedPrompts[updateIndex],
        ...req.body,
        updatedAt: new Date().toISOString()
      };
      
      return res.status(200).json({
        success: true,
        savedPrompt: savedPrompts[updateIndex],
        message: 'Prompt updated successfully'
      });
      
    case 'DELETE':
      // 删除保存的提示词
      if (!id) {
        return res.status(400).json({ success: false, error: 'Saved prompt ID required' });
      }
      
      const deleteIndex = savedPrompts.findIndex(s => s.id === id);
      if (deleteIndex === -1) {
        return res.status(404).json({ success: false, error: 'Saved prompt not found' });
      }
      
      savedPrompts.splice(deleteIndex, 1);
      
      return res.status(200).json({
        success: true,
        message: 'Prompt deleted successfully'
      });
      
    case 'POST':
      // 分享提示词（创建分享链接）
      if (id && req.url.includes('/share')) {
        const saved = savedPrompts.find(s => s.id === id);
        if (!saved) {
          return res.status(404).json({ success: false, error: 'Saved prompt not found' });
        }
        
        // 生成分享链接（简化版）
        const shareId = `share_${Date.now()}`;
        const shareUrl = `${req.headers.origin || 'https://promptgen.pro'}/shared/${shareId}`;
        
        return res.status(200).json({
          success: true,
          shareUrl,
          shareId,
          message: 'Prompt shared successfully'
        });
      }
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
