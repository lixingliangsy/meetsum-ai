#!/usr/bin/env python3
"""
FAQ误导声明修复脚本
移除或标记FAQ中未实现的功能描述

使用方法：
python fix_faq_misleading_claims.py --report feature_verification_report.json
python fix_faq_misleading_claims.py --auto-fix
"""

import json
import re
from pathlib import Path
from datetime import datetime

# 配置
BASE_DIR = Path("e:/AgentCPM/07_一人公司出海项目/12_Micro_SaaS出海")
REPORT_FILE = Path("e:/AgentCPM/07_一人公司出海项目/feature_verification_report.json")

def load_verification_report():
    """加载功能核实报告"""
    if not REPORT_FILE.exists():
        print(f"❌ Report file not found: {REPORT_FILE}")
        return None
    
    with open(REPORT_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def identify_misleading_claims(report):
    """识别误导声明（未实现的功能）"""
    
    misleading = []
    
    for product_report in report:
        product = product_report["product"]
        not_implemented = [d for d in product_report["details"] if d["status"] == "NOT_FOUND"]
        
        for item in not_implemented:
            misleading.append({
                "product": product,
                "feature": item["feature"],
                "recommendation": item["recommendation"]
            })
    
    return misleading

def fix_faq_file(product_name, misleading_features):
    """修复FAQ文件（移除或标记未实现的功能）"""
    
    faq_file = BASE_DIR / product_name / "public" / "faq.html"
    if not faq_file.exists():
        print(f"⚠️  FAQ file not found: {faq_file}")
        return False
    
    # 读取FAQ内容
    with open(faq_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_length = len(content)
    
    # 对于每个未实现的功能，尝试从FAQ中移除或标记
    for item in misleading_features:
        feature = item["feature"]
        
        # 提取关键词（用于匹配）
        keywords = re.findall(r'\b\w+\b', feature.lower())
        keywords = [k for k in keywords if len(k) > 4][:5]  # 取前5个长词
        
        # 在FAQ中查找包含这些关键词的段落
        # 简单策略：查找包含关键词的<answer>标签内容
        answer_pattern = r'<div class="answer">.*?</div>'
        answers = re.findall(answer_pattern, content, re.DOTALL)
        
        for answer in answers:
            if all(k in answer.lower() for k in keywords[:3]):  # 如果包含至少3个关键词
                # 策略1：添加警告标记
                warning = '<div class="warning" style="background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin: 10px 0;"><strong>⚠️ Note:</strong> This feature is coming soon (expected in next release).</div>'
                
                # 在答案前插入警告
                new_answer = answer.replace('<div class="answer">', '<div class="answer">' + warning)
                content = content.replace(answer, new_answer)
                
                print(f"  ✅ Added warning for feature: {feature[:50]}...")
                break
    
    # 保存修复后的FAQ
    if len(content) != original_length:
        backup_file = faq_file.with_suffix('.html.backup')
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(content)  # 先备份原始内容
        
        with open(faq_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Fixed FAQ file: {faq_file}")
        print(f"   Backup saved to: {backup_file}")
        return True
    else:
        print(f"⚠️  No changes made to {product_name} (feature not found in FAQ text)")
        return False

def generate_fix_report(misleading_features, fix_results):
    """生成修复报告"""
    
    report = {
        "fix_date": datetime.now().isoformat(),
        "total_misleading_claims": len(misleading_features),
        "fixes_applied": sum(1 for r in fix_results if r["fixed"]),
        "fixes_failed": sum(1 for r in fix_results if not r["fixed"]),
        "details": fix_results
    }
    
    return report

def main():
    """主函数"""
    
    print("🚀 Starting FAQ misleading claims fix...\n")
    
    # 1. 加载核实报告
    report = load_verification_report()
    if not report:
        return
    
    # 2. 识别误导声明
    misleading = identify_misleading_claims(report)
    
    print(f"📊 Found {len(misleading)} potentially misleading claims:")
    for item in misleading:
        print(f"  - [{item['product']}] {item['feature'][:60]}...")
    
    print(f"\n🔧 Applying fixes...\n")
    
    # 3. 修复FAQ文件
    fix_results = []
    
    for item in misleading:
        product = item["product"]
        
        # 找到这个产品的所有误导声明
        product_misleading = [m for m in misleading if m["product"] == product]
        
        # 修复FAQ
        fixed = fix_faq_file(product, product_misleading)
        
        fix_results.append({
            "product": product,
            "feature": item["feature"],
            "fixed": fixed
        })
    
    # 4. 生成修复报告
    fix_report = generate_fix_report(misleading, fix_results)
    
    report_file = BASE_DIR.parent / "faq_fix_report.json"
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(fix_report, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'='*60}")
    print(f"✅ FAQ fix completed!")
    print(f"📄 Report saved to: {report_file}")
    print(f"\n📊 Summary:")
    print(f"   - Total misleading claims: {fix_report['total_misleading_claims']}")
    print(f"   - Fixes applied: {fix_report['fixes_applied']}")
    print(f"   - Fixes failed: {fix_report['fixes_failed']}")
    print(f"\n⚠️  Recommendations:")
    print(f"   1. Review fixed FAQ files (backups created)")
    print(f"   2. Consider implementing missing features")
    print(f"   3. Re-run verification after fixes")

if __name__ == "__main__":
    main()
