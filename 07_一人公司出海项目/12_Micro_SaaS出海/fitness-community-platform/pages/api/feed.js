const posts = [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    
    let filtered = posts;
    if (userId) {
      filtered = filtered.filter(p => p.userId === userId);
    }
    
    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.status(200).json({ 
      success: true, 
      posts: filtered,
      count: filtered.length 
    });
  } else if (req.method === 'POST') {
    const { 
      userId,
      content, 
      imageUrl 
    } = req.body;
    
    if (!userId || !content) {
      return res.status(400).json({ 
        success: false, 
        error: 'User ID and content are required' 
      });
    }
    
    const post = {
      id: posts.length + 1,
      userId,
      content,
      imageUrl: imageUrl || null,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };
    
    posts.push(post);
    
    res.status(201).json({ 
      success: true, 
      post,
      message: 'Post created successfully' 
    });
  } else if (req.method === 'PUT') {
    const { id, action, userId } = req.body;
    
    if (!id || !action) {
      return res.status(400).json({ 
        success: false, 
        error: 'Post ID and action are required' 
      });
    }
    
    const index = posts.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Post not found' 
      });
    }
    
    if (action === 'like') {
      posts[index].likes += 1;
    } else if (action === 'comment') {
      const { comment } = req.body;
      if (!comment) {
        return res.status(400).json({ 
          success: false, 
          error: 'Comment content is required' 
        });
      }
      posts[index].comments.push({
        userId,
        comment,
        createdAt: new Date().toISOString()
      });
    }
    
    res.status(200).json({ 
      success: true, 
      post: posts[index],
      message: 'Post updated successfully' 
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}