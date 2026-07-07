#!/usr/bin/env python3
"""批量生成新产品推广内容"""

import os

# 已部署产品列表（新产品）
PRODUCTS = [
    {
        "name": "ai-changelog",
        "title": "AI Changelog Generator",
        "tagline": "Automatically generate beautiful changelogs from your git commits",
        "description": "AI Changelog is an AI-powered tool that automatically generates professional changelogs from your Git commit history. Simply connect your repository, and our AI will analyze your commits, categorize changes, and produce a clean, user-friendly changelog in seconds.",
        "url": "https://ai-changelog-gjidty30r-lixingliangs-projects.vercel.app",
        "tags": ["developer tools", "AI", "automation", "changelog"],
        "category": "Developer Tools",
    },
    {
        "name": "ai-fitness-plan-generator",
        "title": "AI Fitness Plan Generator",
        "tagline": "Personalized fitness plans powered by AI",
        "description": "Get a customized fitness plan tailored to your goals, fitness level, and schedule. Our AI analyzes your inputs and creates a science-backed workout plan that adapts as you progress.",
        "url": "https://ai-fitness-plan-generator-lb3wi8hg4-lixingliangs-projects.vercel.app",
        "tags": ["fitness", "AI", "health", "personalization"],
        "category": "Health & Fitness",
    },
    {
        "name": "articlesumm-pro",
        "title": "ArticleSumm Pro",
        "tagline": "Summarize any article instantly with AI",
        "description": "ArticleSumm Pro uses advanced AI to condense long articles into clear, accurate summaries. Perfect for researchers, students, and busy professionals who need to process information quickly.",
        "url": "https://articlesumm-c4bixz3y2-lixingliangs-projects.vercel.app",
        "tags": ["AI", "productivity", "reading", "summarization"],
        "category": "Productivity",
    },
    {
        "name": "resumeforge",
        "title": "ResumeForge",
        "tagline": "Build a professional resume in minutes",
        "description": "ResumeForge helps you create a polished, ATS-friendly resume with AI-powered suggestions. Choose from multiple templates, get real-time feedback, and download in multiple formats.",
        "url": "https://resumeforge-ga4kdlmda-lixingliangs-projects.vercel.app",
        "tags": ["career", "resume", "AI", "job search"],
        "category": "Career",
    },
    {
        "name": "promptgen-pro",
        "title": "PromptGen Pro",
        "tagline": "Generate optimized AI prompts effortlessly",
        "description": "PromptGen Pro is a tool for creating, testing, and optimizing AI prompts. Get better results from ChatGPT, Claude, and other AI models with our prompt engineering toolkit.",
        "url": "https://promptgen-29sk6mhm6-lixingliangs-projects.vercel.app",
        "tags": ["AI", "prompt engineering", "productivity", "developer tools"],
        "category": "AI Tools",
    },
    {
        "name": "screenshot-to-demo",
        "title": "Screenshot to Demo",
        "tagline": "Turn screenshots into interactive demos",
        "description": "Transform static screenshots into interactive, clickable demos. Perfect for product demos, tutorials, and onboarding flows without writing a single line of code.",
        "url": "https://screenshot-to-demo-ebp6fuuya-lixingliangs-projects.vercel.app",
        "tags": ["productivity", "demo", "screenshots", "no-code"],
        "category": "Productivity",
    },
    {
        "name": "freelancer-portal",
        "title": "Freelancer Portal",
        "tagline": "All-in-one platform for freelance management",
        "description": "Manage clients, projects, invoices, and time tracking in one place. Freelancer Portal streamlines your freelance business so you can focus on what matters — delivering great work.",
        "url": "https://freelancer-portal-lt2hexu7j-lixingliangs-projects.vercel.app",
        "tags": ["freelance", "productivity", "project management", "invoicing"],
        "category": "Business",
    },
    {
        "name": "async-standup-tool",
        "title": "Async Standup Tool",
        "tagline": "Run effective async standups for remote teams",
        "description": "Replace time-wasting daily meetings with quick async check-ins. Team members post updates on their schedule, and you get a clean summary every morning.",
        "url": "https://async-standup-tool-4kjsm59pt-lixingliangs-projects.vercel.app",
        "tags": ["remote work", "team productivity", "standup", "async"],
        "category": "Team Productivity",
    },
    {
        "name": "snippetvault",
        "title": "SnippetVault",
        "tagline": "Your personal code snippet library",
        "description": "Save, organize, and search your code snippets with SnippetVault. Tag by language, project, or category. Find exactly what you need in seconds.",
        "url": "https://snippetvault-o2uvgf5dp-lixingliangs-projects.vercel.app",
        "tags": ["developer tools", "code snippets", "productivity"],
        "category": "Developer Tools",
    },
    {
        "name": "calorie-tracker",
        "title": "Calorie Tracker",
        "tagline": "Simple, effective calorie and nutrition tracking",
        "description": "Track your daily food intake and monitor your nutrition goals. Log meals by type, track macros, and stay on top of your health journey.",
        "url": "https://calorie-tracker-m9krgi6ja-lixingliangs-projects.vercel.app",
        "tags": ["health", "fitness", "nutrition", "tracking"],
        "category": "Health & Fitness",
    },
    {
        "name": "chartmind-ai",
        "title": "ChartMind AI",
        "tagline": "Create stunning charts with AI",
        "description": "ChartMind AI turns your data into beautiful, publication-ready charts. Just describe what you want, and our AI generates the perfect visualization.",
        "url": "https://chartmind-m9sm0wvql-lixingliangs-projects.vercel.app",
        "tags": ["AI", "data visualization", "charts", "productivity"],
        "category": "Data & Analytics",
    },
    {
        "name": "scifigure-pro",
        "title": "SciFigure Pro",
        "tagline": "Professional scientific figure creation",
        "description": "SciFigure Pro helps researchers create publication-quality scientific figures with ease. Templates for every field, export in multiple formats.",
        "url": "https://scifigure-b2vblkqdu-lixingliangs-projects.vercel.app",
        "tags": ["research", "science", "figures", "publication"],
        "category": "Research Tools",
    },
    {
        "name": "meeting-mind-mvp",
        "title": "Meeting Mind",
        "tagline": "AI-powered meeting notes and action items",
        "description": "Meeting Mind automatically transcribes your meetings, extracts key points, and generates actionable next steps. Never miss a detail again.",
        "url": "https://meeting-mind-jx8wfrclo-lixingliangs-projects.vercel.app",
        "tags": ["productivity", "AI", "meetings", "transcription"],
        "category": "Productivity",
    },
    {
        "name": "fitness-community-platform",
        "title": "Fitness Community Platform",
        "tagline": "Build your fitness community online",
        "description": "A platform for fitness coaches and communities to connect, share workouts, and track progress together. Features include group challenges, leaderboards, and member management.",
        "url": "https://fitness-community-platform-qkgpi5wkx-lixingliangs-projects.vercel.app",
        "tags": ["fitness", "community", "social", "health"],
        "category": "Health & Fitness",
    },
    {
        "name": "fitalliance-pro",
        "title": "FitAlliance Pro",
        "tagline": "Premium fitness alliance platform",
        "description": "Connect with fitness professionals, access exclusive workouts, and join challenges. FitAlliance Pro brings the fitness ecosystem together.",
        "url": "https://fitalliance-i0psyi7fd-lixingliangs-projects.vercel.app",
        "tags": ["fitness", "premium", "community", "health"],
        "category": "Health & Fitness",
    },
    {
        "name": "ai-fitness-planner",
        "title": "AI Fitness Planner",
        "tagline": "Your AI-powered personal fitness planner",
        "description": "Get AI-generated workout plans adapted to your fitness level, available equipment, and schedule. Track progress and adjust plans dynamically.",
        "url": "https://ai-fitness-planner-8bg46x67z-lixingliangs-projects.vercel.app",
        "tags": ["fitness", "AI", "planning", "health"],
        "category": "Health & Fitness",
    },
    {
        "name": "fitness-challenge-tracker",
        "title": "Fitness Challenge Tracker",
        "tagline": "Track and conquer fitness challenges",
        "description": "Create, join, and track fitness challenges with friends and communities. Leaderboards, progress tracking, and social features keep you motivated.",
        "url": "https://fitness-challenge-tracker-ebx4atf65-lixingliangs-projects.vercel.app",
        "tags": ["fitness", "challenges", "social", "health"],
        "category": "Health & Fitness",
    },
]

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "marketing_content")

def generate_product_desc(product):
    return f"""# {product['title']}

## Product Description

{product['description']}

### Key Features
- AI-powered automation
- Clean, intuitive interface
- Fast, reliable performance
- Works on any device

### Target Users
- Professionals looking to save time
- Teams that need efficient workflows
- Anyone who values simplicity and speed

### Category
{product['category']}

### Tags
{', '.join(product['tags'])}

### URL
{product['url']}
"""

def generate_linkedin(product):
    tags = ' '.join([f'#{t.replace(" ", "")}' for t in product['tags']])
    return f"""# LinkedIn Post — {product['title']}

---

I'm excited to share {product['title']} — {product['tagline']}! 🚀

{product['description']}

🎯 **Who is this for?**
Whether you're a professional, a team lead, or just someone who wants to get more done, {product['title']} is designed to make your life easier.

💡 **Why I built this**
I kept running into the same problem and couldn't find a simple, affordable solution. So I built one.

🔗 **Try it now:** {product['url']}

I'd love to hear your feedback! Drop a comment below. 👇

{tags}
"""

def generate_ph(product):
    return f"""# Product Hunt Launch — {product['title']}

## Tagline
{product['tagline']}

## Description
{product['description']}

## Topics
{', '.join(product['tags'])}

## Launch Comment
Hey Product Hunt! 👋

I built {product['title']} because I needed a simple, no-nonsense tool that just works.

{product['description']}

**Key features:**
✅ AI-powered automation
✅ Clean, intuitive interface  
✅ Works on any device
✅ Free to try

Try it here: {product['url']}

I'm here all day — ask me anything! Happy to discuss the tech stack, roadmap, or feature requests.

## Gallery Images Needed
1. Hero screenshot of the main interface
2. Action shot showing the product in use
3. Before/after or results comparison
"""

def generate_reddit(product):
    return f"""# Reddit Post — {product['title']}

## Subreddit: r/SideProject

**Title:** I built {product['title']} — {product['tagline']}

**Body:**

Hey everyone! 👋

I've been working on {product['title']} and just launched it. Here's what it does:

{product['description']}

**Why I built it:** I needed this tool myself and couldn't find anything that was simple and affordable.

**Tech stack:** Next.js, React, Vercel

**Try it:** {product['url']}

I'd really appreciate any feedback — what works, what doesn't, what you'd add. Thanks for checking it out! 🙏

---

## Subreddit: r/SaaS

**Title:** {product['title']} — {product['tagline']}

**Body:**

Just launched {product['title']}. {product['description']}

Live demo: {product['url']}

Looking for feedback on the UX and pricing model. What would you pay for this?
"""

def generate_twitter(product):
    tags = ' '.join([f'#{t.replace(" ", "")}' for t in product['tags'][:3]])
    return f"""# Twitter/X Post — {product['title']}

---

🚀 Just launched {product['title']}!

{product['tagline']}

{product['description'][:100]}...

Try it free: {product['url']}

{tags}
"""

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    for product in PRODUCTS:
        name = product['name']
        files = {
            f"{name}_product-desc.md": generate_product_desc(product),
            f"{name}_linkedin.md": generate_linkedin(product),
            f"{name}_ph.md": generate_ph(product),
            f"{name}_reddit.md": generate_reddit(product),
            f"{name}_twitter.md": generate_twitter(product),
        }

        for filename, content in files.items():
            filepath = os.path.join(OUTPUT_DIR, filename)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✅ {filename}")

    print(f"\n✅ Generated marketing content for {len(PRODUCTS)} products!")
    print(f"   Total files: {len(PRODUCTS) * 5}")

if __name__ == '__main__':
    main()
