#!/usr/bin/env python3
"""
产品功能核实系统
检查产品是否真正实现了FAQ/文章中宣传的功能

使用方法：
python verify_product_features.py --product scifigure-pro
python verify_product_features.py --all
"""

import json
import os
import re
from pathlib import Path
from datetime import datetime

# 配置
BASE_DIR = Path("e:/AgentCPM/07_一人公司出海项目/12_Micro_SaaS出海")
GEO_CONTENT_DIR = Path("e:/AgentCPM/07_一人公司出海项目/GEO_Content")

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

def extract_features_from_faq(product_name, product_index):
    """从FAQ文件中提取功能描述"""
    
    # 读取FAQ文件
    faq_file = BASE_DIR / product_name / "public" / "faq.html"
    if not faq_file.exists():
        print(f"⚠️  FAQ file not found: {faq_file}")
        return []
    
    with open(faq_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取所有答案文本
    features_mentioned = []
    
    # 简单提取：查找常见的功能关键词
    feature_keywords = [
        "generate", "create", "export", "download", "upload", "import", "share",
        "integrate", "connect", "sync", "track", "monitor", "analyze", "visualize",
        "AI-powered", "machine learning", "real-time", "custom", "template",
        "support", "integrate with", "export to", "import from"
    ]
    
    for keyword in feature_keywords:
        if keyword.lower() in content.lower():
            # 提取包含关键词的句子
            sentences = re.split(r'[.!?]', content)
            for sentence in sentences:
                if keyword.lower() in sentence.lower():
                    features_mentioned.append(sentence.strip())
    
    return list(set(features_mentioned))  # 去重

def check_implementation_status(product_name, features):
    """检查功能是否真正实现（通过检查代码）"""
    
    product_dir = BASE_DIR / product_name
    if not product_dir.exists():
        return {feature: "UNKNOWN" for feature in features}
    
    # 读取所有源代码文件
    source_files = []
    for ext in ["*.js", "*.jsx", "*.ts", "*.tsx", "*.vue", "*.py"]:
        source_files.extend(product_dir.rglob(ext))
    
    # 限制文件数量（避免处理太多文件）
    source_files = source_files[:50]
    
    implementation_status = {}
    
    for feature in features[:10]:  # 只检查前10个功能（避免太慢）
        # 提取功能关键词
        keywords = re.findall(r'\b\w+\b', feature.lower())
        keywords = [k for k in keywords if len(k) > 3]  # 只保留长度>3的关键词
        
        found = False
        for source_file in source_files:
            try:
                with open(source_file, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read().lower()
                    # 检查是否有关键词出现
                    if sum(1 for k in keywords if k in content) >= 2:
                        found = True
                        break
            except:
                continue
        
        implementation_status[feature] = "IMPLEMENTED" if found else "NOT_FOUND"
    
    return implementation_status

def generate_feature_verification_report(product_name, features, status):
    """生成功能核实报告"""
    
    report = {
        "product": product_name,
        "verification_date": datetime.now().isoformat(),
        "total_features_mentioned": len(features),
        "features_checked": len(status),
        "implemented": sum(1 for v in status.values() if v == "IMPLEMENTED"),
        "not_found": sum(1 for v in status.values() if v == "NOT_FOUND"),
        "details": []
    }
    
    for feature, impl_status in status.items():
        report["details"].append({
            "feature": feature,
            "status": impl_status,
            "recommendation": "REMOVE_FROM_FAQ" if impl_status == "NOT_FOUND" else "KEEP"
        })
    
    return report

def main():
    """主函数"""
    
    import sys
    
    # 解析命令行参数
    product = None
    check_all = False
    
    if "--product" in sys.argv:
        idx = sys.argv.index("--product")
        if idx + 1 < len(sys.argv):
            product = sys.argv[idx + 1]
    
    if "--all" in sys.argv:
        check_all = True
    
    if not product and not check_all:
        print("Usage:")
        print("  python verify_product_features.py --product <product-name>")
        print("  python verify_product_features.py --all")
        return
    
    # 确定要检查的产品
    products_to_check = [product] if product else PRODUCTS  # 检查所有20个产品
    
    print(f"🚀 Starting feature verification for {len(products_to_check)} product(s)...")
    
    all_reports = []
    
    for product_name in products_to_check:
        print(f"\n{'='*60}")
        print(f"Checking: {product_name}")
        print(f"{'='*60}")
        
        # 1. 从FAQ提取功能描述
        features = extract_features_from_faq(product_name, PRODUCTS.index(product_name) + 1)
        print(f"✅ Extracted {len(features)} feature mentions from FAQ")
        
        if not features:
            print(f"⚠️  No features found, skipping...")
            continue
        
        # 2. 检查实现状态
        status = check_implementation_status(product_name, features)
        print(f"✅ Checked implementation status")
        
        # 3. 生成报告
        report = generate_feature_verification_report(product_name, features, status)
        all_reports.append(report)
        
        print(f"📊 Results:")
        print(f"   - Features mentioned: {report['total_features_mentioned']}")
        print(f"   - Features checked: {report['features_checked']}")
        print(f"   - Implemented: {report['implemented']}")
        print(f"   - Not found: {report['not_found']}")
    
    # 保存总报告
    report_file = BASE_DIR.parent / "feature_verification_report.json"
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(all_reports, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'='*60}")
    print(f"✅ Feature verification completed!")
    print(f"📄 Report saved to: {report_file}")
    print(f"\n⚠️  Recommendations:")
    print(f"   1. Review the report and identify 'NOT_FOUND' features")
    print(f"   2. Either implement those features, or remove from FAQ/content")
    print(f"   3. Re-run verification after fixes")

if __name__ == "__main__":
    main()
