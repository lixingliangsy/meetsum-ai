import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/feed');
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: 'user-' + Date.now(), 
          content 
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setContent('');
        fetchPosts();
      }
    } catch (err) {
      console.error('Failed to create post:', err);
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId) => {
    try {
      await fetch('/api/feed', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: postId, action: 'like' })
      });
      fetchPosts();
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  return (
    <div>
      <Head>
        <title>Community Feed - Fitness Community</title>
      </Head>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1>💬 Community Feed</h1>
        <p>Share your fitness journey with the community.</p>
        
        <div style={{ 
          padding: '20px', 
          background: 'white', 
          border: '1px solid #ddd',
          borderRadius: '5px',
          marginTop: '20px',
          marginBottom: '30px'
        }}>
          <h3>Create Post</h3>
          <form onSubmit={createPost}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your fitness update..."
              required
              rows={4}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '1px solid #ddd', 
                borderRadius: '5px',
                marginBottom: '10px',
                fontFamily: 'inherit'
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 20px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
        
        {posts.length > 0 ? (
          <div>
            {posts.map((post, index) => (
              <div key={index} style={{ 
                padding: '20px', 
                background: 'white', 
                border: '1px solid #ddd',
                borderRadius: '5px',
                marginBottom: '15px'
              }}>
                <p><strong>{post.userId}</strong></p>
                <p style={{ marginTop: '10px' }}>{post.content}</p>
                <div style={{ 
                  display: 'flex', 
                  gap: '15px',
                  marginTop: '15px',
                  paddingTop: '15px',
                  borderTop: '1px solid #ddd'
                }}>
                  <button
                    onClick={() => likePost(post.id)}
                    style={{
                      padding: '5px 10px',
                      background: '#f8f9fa',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    ❤️ {post.likes}
                  </button>
                  <span style={{ color: '#666', fontSize: '14px' }}>
                    💬 {post.comments.length} comments
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            background: '#f8f9fa',
            borderRadius: '5px'
          }}>
            <p>No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
}