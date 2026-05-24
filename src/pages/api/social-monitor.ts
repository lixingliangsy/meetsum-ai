import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// 初始化Supabase客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * 社交媒体监控API
 * 从Twitter/Reddit等平台抓取提及"MeetSum AI"的内容
 * 
 * 调用方式：
 * - GET /api/social-monitor?platform=twitter&limit=20
 * - GET /api/social-monitor?platform=reddit&limit=20
 * 
 * 自动化：
 * - 可以使用Vercel Cron（每天定时执行）
 * - 或外部Cron服务调用此API
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { platform = 'all', limit = '50' } = req.query;

    console.log(`🔍 Monitoring social media: platform=${platform}, limit=${limit}`);

    const results: any = {
      twitter: [],
      reddit: [],
      timestamp: new Date().toISOString(),
    };

    // 1. 监控Twitter (X)
    if (platform === 'all' || platform === 'twitter') {
      try {
        const twitterData = await monitorTwitter();
        results.twitter = twitterData;

        // 存入数据库
        if (twitterData.length > 0) {
          const { error } = await supabase
            .from('communications')
            .insert(
              twitterData.map((t: any) => ({
                user_id: null, // Twitter用户可能不在系统中
                channel: 'twitter',
                direction: 'inbound',
                content: t.text,
                ai_handled: false,
                sentiment_score: t.sentiment_score,
                intent: categorizeTweet(t.text),
              }))
            );

          if (error) {
            console.error('❌ Error inserting Twitter data:', error);
          } else {
            console.log(`✅ Saved ${twitterData.length} Twitter mentions to database`);
          }
        }
      } catch (error) {
        console.error('❌ Twitter monitoring error:', error);
        results.twitter_error = (error as Error).message;
      }
    }

    // 2. 监控Reddit
    if (platform === 'all' || platform === 'reddit') {
      try {
        const redditData = await monitorReddit();
        results.reddit = redditData;

        // 存入数据库
        if (redditData.length > 0) {
          const { error } = await supabase
            .from('communications')
            .insert(
              redditData.map((r: any) => ({
                user_id: null, // Reddit用户可能不在系统中
                channel: 'reddit',
                direction: 'inbound',
                content: r.text,
                ai_handled: false,
                sentiment_score: r.sentiment_score,
                intent: categorizeRedditPost(r.text, r.title),
              }))
            );

          if (error) {
            console.error('❌ Error inserting Reddit data:', error);
          } else {
            console.log(`✅ Saved ${redditData.length} Reddit mentions to database`);
          }
        }
      } catch (error) {
        console.error('❌ Reddit monitoring error:', error);
        results.reddit_error = (error as Error).message;
      }
    }

    // 3. 返回结果
    return res.status(200).json({
      success: true,
      results,
      summary: {
        twitter_mentions: results.twitter.length || 0,
        reddit_mentions: results.reddit.length || 0,
        total: (results.twitter.length || 0) + (results.reddit.length || 0),
      },
    });

  } catch (error) {
    console.error('❌ Error in social monitor:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * 监控Twitter (X)
 * TODO: 集成Twitter API v2
 * 
 * 当前实现：模拟数据（用于测试）
 * 后续替换：真实Twitter API调用
 */
async function monitorTwitter(): Promise<any[]> {
  const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!twitterBearerToken) {
    console.log('⚠️ Twitter Bearer Token not configured, using mock data');
    return getMockTwitterData();
  }

  // TODO: 真实Twitter API调用
  // const response = await fetch(
  //   'https://api.twitter.com/2/tweets/search/recent?query=MeetSum AI OR @meetsumai&max_results=100',
  //   {
  //     headers: {
  //       'Authorization': `Bearer ${twitterBearerToken}`,
  //     },
  //   }
  // );
  // const data = await response.json();
  // return data.data || [];

  return getMockTwitterData();
}

/**
 * 监控Reddit
 * TODO: 集成Reddit API
 * 
 * 当前实现：模拟数据（用于测试）
 * 后续替换：真实Reddit API调用
 */
async function monitorReddit(): Promise<any[]> {
  const redditClientId = process.env.REDDIT_CLIENT_ID;
  const redditClientSecret = process.env.REDDIT_CLIENT_SECRET;

  if (!redditClientId || !redditClientSecret) {
    console.log('⚠️ Reddit API credentials not configured, using mock data');
    return getMockRedditData();
  }

  // TODO: 真实Reddit API调用
  // const response = await fetch(
  //   'https://www.reddit.com/search.json?q=MeetSum AI&sort=new&limit=100',
  //   {
  //     headers: {
  //       'User-Agent': 'MeetSumAI/1.0',
  //     },
  //   }
  // );
  // const data = await response.json();
  // return data.data.children.map((child: any) => child.data) || [];

  return getMockRedditData();
}

/**
 * 分类Tweet意图
 */
function categorizeTweet(text: string): string {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('how to') || lowerText.includes('help') || lowerText.includes('question')) {
    return 'question';
  }
  if (lowerText.includes('bug') || lowerText.includes('error') || lowerText.includes('issue') || lowerText.includes('problem')) {
    return 'complaint';
  }
  if (lowerText.includes('great') || lowerText.includes('love') || lowerText.includes('awesome') || lowerText.includes('thanks')) {
    return 'praise';
  }
  if (lowerText.includes('feature') || lowerText.includes('suggestion') || lowerText.includes('idea')) {
    return 'feature_request';
  }
  
  return 'other';
}

/**
 * 分类Reddit帖子意图
 */
function categorizeRedditPost(text: string, title: string): string {
  return categorizeTweet(text + ' ' + title);
}

/**
 * 模拟Twitter数据（测试用）
 */
function getMockTwitterData(): any[] {
  return [
    {
      id: '1',
      text: 'Just tried MeetSum AI - amazing tool for meeting minutes! @meetsumai',
      username: 'user1',
      created_at: new Date().toISOString(),
      sentiment_score: 0.8,
    },
    {
      id: '2',
      text: 'How to use MeetSum AI for my team? Any tutorials?',
      username: 'user2',
      created_at: new Date().toISOString(),
      sentiment_score: 0.5,
    },
    {
      id: '3',
      text: 'MeetSum AI is broken, cant upload my file 😡',
      username: 'user3',
      created_at: new Date().toISOString(),
      sentiment_score: -0.6,
    },
  ];
}

/**
 * 模拟Reddit数据（测试用）
 */
function getMockRedditData(): any[] {
  return [
    {
      id: '1',
      title: 'MeetSum AI review - pretty good so far',
      text: 'Ive been using MeetSum AI for a week now. The summaries are quite accurate.',
      author: 'reddit_user1',
      subreddit: 'SideProject',
      created_at: new Date().toISOString(),
      sentiment_score: 0.7,
    },
    {
      id: '2',
      title: '[Feature Request] Support for more languages',
      text: 'Would love to see MeetSum AI support Spanish and French. Currently only English?',
      author: 'reddit_user2',
      subreddit: 'SaaS',
      created_at: new Date().toISOString(),
      sentiment_score: 0.3,
    },
  ];
}
