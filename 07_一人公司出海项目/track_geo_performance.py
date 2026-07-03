#!/usr/bin/env python3
"""
GEO效果追踪脚本
自动追踪AI搜索引擎中的产品曝光情况

功能:
1. 追踪Google Search Console数据
2. 测试ChatGPT/Perplexity中的产品曝光
3. 生成GEO效果报告

使用方法:
python track_geo_performance.py

作者: AI Assistant
日期: 2026-07-03
"""

import json
import time
from datetime import datetime

# 20个产品列表
PRODUCTS = [
    "scifigure-pro",
    "resumeforge",
    "meeting-mind-mvp",
    "fitness-challenge-tracker",
    "fitalliance-pro",
    "articlesumm-pro",
    "fitness-gamification-platform",
    "running-training-plan",
    "freelancer-portal",
    "chartmind-ai",
    "screenshot-annotator",
    "async-standup-tool",
    "ai-changelog",
    "social-proof-widget",
    "screenshot-to-demo",
    "meeting-cost-calc",
    "ai-fitness-planner",
    "ai-fitness-plan-generator",
    "promptgen-pro",
    "fitness-community-platform"
]

def check_google_search_console():
    """检查Google Search Console中的索引状态"""
    print("📊 Checking Google Search Console...")
    print("⚠️  需要手动登录Google Search Console查看:")
    print("   - 索引覆盖率")
    print("   - 点击量")
    print("   - 平均排名")
    print("   - AI引用次数（如果支持）")
    print()

def test_chatgpt_exposure(product_name):
    """测试ChatGPT中产品的曝光情况"""
    # 注意: 这需要通过ChatGPT API或手动测试
    test_queries = [
        f"What is the best tool for {product_name.replace('-', ' ')}?",
        f"Recommend a {product_name.replace('-', ' ')} tool",
        f"{product_name.replace('-', ' ')} review"
    ]
    
    print(f"🤖 Testing ChatGPT exposure for {product_name}...")
    for query in test_queries:
        print(f"   Query: {query}")
        print(f"   ⚠️  需要手动测试或调用ChatGPT API")
    print()

def test_perplexity_exposure(product_name):
    """测试Perplexity中产品的曝光情况"""
    test_queries = [
        f"{product_name.replace('-', ' ')} tool",
        f"Best {product_name.replace('-', ' ')} software"
    ]
    
    print(f"🔍 Testing Perplexity exposure for {product_name}...")
    for query in test_queries:
        print(f"   Query: {query}")
        print(f"   ⚠️  需要手动测试或调用Perplexity API")
    print()

def generate_geo_report():
    """生成GEO效果报告"""
    report = {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "products_tracked": len(PRODUCTS),
        "metrics": {
            "google_indexed_pages": "Unknown - check Search Console",
            "chatgpt_mentions": "Unknown - need manual testing",
            "perplexity_citations": "Unknown - need manual testing",
            "organic_traffic": "Unknown - check Google Analytics"
        },
        "recommendations": [
            "Submit all pages to Google Search Console",
            "Test 5-10 products in ChatGPT/Perplexity manually",
            "Track rankings for target keywords",
            "Build high-quality backlinks to product pages"
        ]
    }
    
    # 保存报告
    with open('GEO_Content/GEO_Performance_Report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print("📄 GEO Performance Report generated:")
    print(json.dumps(report, indent=2, ensure_ascii=False))
    print()

def main():
    """主函数"""
    print("🚀 Starting GEO Performance Tracking...")
    print("=" * 60)
    
    # 1. Google Search Console
    check_google_search_console()
    
    # 2. ChatGPT曝光测试（示例：测试前3个产品）
    for product in PRODUCTS[:3]:
        test_chatgpt_exposure(product)
        time.sleep(1)  # 避免请求过快
    
    # 3. Perplexity曝光测试（示例：测试前3个产品）
    for product in PRODUCTS[:3]:
        test_perplexity_exposure(product)
        time.sleep(1)
    
    # 4. 生成报告
    generate_geo_report()
    
    print("=" * 60)
    print("✅ GEO Performance Tracking completed!")
    print()
    print("📋 Next steps:")
    print("   1. Manually test ChatGPT/Perplexity with sample queries")
    print("   2. Submit sitemap to Google Search Console")
    print("   3. Add UTM parameters to all links for tracking")
    print("   4. Schedule weekly GEO performance reviews")

if __name__ == "__main__":
    main()
