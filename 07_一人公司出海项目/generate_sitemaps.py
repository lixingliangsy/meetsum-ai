#!/usr/bin/env python3
"""
为所有20个产品生成sitemap.xml和robots.txt
帮助搜索引擎更好地索引GEO优化页面

功能:
1. 生成每个产品的sitemap.xml
2. 生成robots.txt
3. 生成统一的sitemap索引

使用方法:
python generate_sitemaps.py

作者: AI Assistant
日期: 2026-07-03
"""

import os
from datetime import datetime

# 20个产品配置
PRODUCTS = [
    {"name": "scifigure-pro", "url": "https://scifigure-pro.vercel.app"},
    {"name": "resumeforge", "url": "https://resumeforge.vercel.app"},
    {"name": "meeting-mind-mvp", "url": "https://meeting-mind-mvp.vercel.app"},
    {"name": "fitness-challenge-tracker", "url": "https://fitness-challenge-tracker.vercel.app"},
    {"name": "fitalliance-pro", "url": "https://fitalliance-pro.vercel.app"},
    {"name": "articlesumm-pro", "url": "https://articlesumm-pro.vercel.app"},
    {"name": "fitness-gamification-platform", "url": "https://fitness-gamification-platform.vercel.app"},
    {"name": "running-training-plan", "url": "https://running-training-plan.vercel.app"},
    {"name": "freelancer-portal", "url": "https://freelancer-portal.vercel.app"},
    {"name": "chartmind-ai", "url": "https://chartmind-ai.vercel.app"},
    {"name": "screenshot-annotator", "url": "https://screenshot-annotator.vercel.app"},
    {"name": "async-standup-tool", "url": "https://async-standup-tool.vercel.app"},
    {"name": "ai-changelog", "url": "https://ai-changelog.vercel.app"},
    {"name": "social-proof-widget", "url": "https://social-proof-widget.vercel.app"},
    {"name": "screenshot-to-demo", "url": "https://screenshot-to-demo.vercel.app"},
    {"name": "meeting-cost-calc", "url": "https://meeting-cost-calc.vercel.app"},
    {"name": "ai-fitness-planner", "url": "https://ai-fitness-planner.vercel.app"},
    {"name": "ai-fitness-plan-generator", "url": "https://ai-fitness-plan-generator.vercel.app"},
    {"name": "promptgen-pro", "url": "https://promptgen-pro.vercel.app"},
    {"name": "fitness-community-platform", "url": "https://fitness-community-platform.vercel.app"}
]

def generate_sitemap_for_product(product):
    """为单个产品生成sitemap.xml"""
    name = product["name"]
    base_url = product["url"]
    
    # sitemap内容
    sitemap = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- 主页 -->
  <url>
    <loc>''' + base_url + '''/</loc>
    <lastmod>''' + datetime.now().strftime("%Y-%m-%d") + '''</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- FAQ页面 -->
  <url>
    <loc>''' + base_url + '''/faq.html</loc>
    <lastmod>''' + datetime.now().strftime("%Y-%m-%d") + '''</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Blog文章页面 -->
  <url>
    <loc>''' + base_url + '''/blog/complete-guide-''' + name.replace('-', '-') + '''-2026.html</loc>
    <lastmod>''' + datetime.now().strftime("%Y-%m-%d") + '''</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- 定价页面 -->
  <url>
    <loc>''' + base_url + '''/pricing</loc>
    <lastmod>''' + datetime.now().strftime("%Y-%m-%d") + '''</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- 功能页面 -->
  <url>
    <loc>''' + base_url + '''/features</loc>
    <lastmod>''' + datetime.now().strftime("%Y-%m-%d") + '''</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
</urlset>'''
    
    # 保存sitemap
    product_dir = f"12_Micro_SaaS出海/{name}/public"
    os.makedirs(product_dir, exist_ok=True)
    
    sitemap_path = f"{product_dir}/sitemap.xml"
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(sitemap)
    
    print(f"✅ Generated sitemap for {name}")
    return sitemap_path

def generate_robots_txt(product):
    """为单个产品生成robots.txt"""
    base_url = product["url"]
    
    robots = f"""# robots.txt for {product['name']}
# Generated: {datetime.now().strftime("%Y-%m-%d")}

User-agent: *
Allow: /

# Sitemaps
Sitemap: {base_url}/sitemap.xml

# Disallow admin pages
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/

# Allow all AI bots (for GEO optimization)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
"""
    
    # 保存robots.txt
    product_dir = f"12_Micro_SaaS出海/{product['name']}/public"
    os.makedirs(product_dir, exist_ok=True)
    
    robots_path = f"{product_dir}/robots.txt"
    with open(robots_path, 'w', encoding='utf-8') as f:
        f.write(robots)
    
    print(f"✅ Generated robots.txt for {product['name']}")
    return robots_path

def generate_sitemap_index():
    """生成统一的sitemap索引（可选，如果需要集中管理）"""
    
    sitemap_index = '''<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
'''
    
    for product in PRODUCTS:
        sitemap_index += f'''  <sitemap>
    <loc>{product['url']}/sitemap.xml</loc>
    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>
  </sitemap>
'''
    
    sitemap_index += '</sitemapindex>'
    
    # 保存sitemap索引
    output_path = "GEO_Content/sitemap_index.xml"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(sitemap_index)
    
    print(f"✅ Generated sitemap index: {output_path}")
    return output_path

def main():
    """主函数"""
    print("🚀 Generating sitemaps and robots.txt for 20 products...")
    print("=" * 60)
    
    generated_files = []
    
    # 1. 为每个产品生成sitemap.xml和robots.txt
    for product in PRODUCTS:
        sitemap_path = generate_sitemap_for_product(product)
        robots_path = generate_robots_txt(product)
        generated_files.append(sitemap_path)
        generated_files.append(robots_path)
    
    # 2. 生成sitemap索引
    sitemap_index_path = generate_sitemap_index()
    generated_files.append(sitemap_index_path)
    
    print("=" * 60)
    print(f"✅ Successfully generated {len(generated_files)} files")
    print()
    print("📋 Next steps:")
    print("   1. Commit and push these files to GitHub")
    print("   2. Vercel will automatically deploy them")
    print("   3. Submit sitemap.xml to Google Search Console")
    print("   4. Test robots.txt: https://www.google.com/robots.txt?url=<your-url>")
    print()
    print("🎯 GEO Optimization Tips:")
    print("   - Allow AI bots (GPTBot, ChatGPT-User, PerplexityBot)")
    print("   - Submit sitemap to Google Search Console")
    print("   - Use 'lastmod' tag to indicate content freshness")
    print("   - Set appropriate 'changefreq' and 'priority'")

if __name__ == "__main__":
    main()
