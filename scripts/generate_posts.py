import os
import json
import random
import datetime
import time
import urllib.request
import urllib.parse

CATEGORIES = [
    "Micro-Investing Guide",
    "Budgeting Framework",
    "Reward Optimization",
    "2026 Financial Tech",
    "AI Money Management",
    "Passive Income Systems"
]

TRENDING_TOPICS = [
    "How to Build an AI-Automated Micro-Savings Pipeline in 2026",
    "High-Yield Money Market Accounts vs. Micro-Investing: Where to Put $50 a Week",
    "How Fractional Real Estate Investing Works for Gen Z with $100 Initial Capital",
    "Maximizing Cash Back and Crypto Rewards on Daily Contactless Payments",
    "The Beginner's Guide to Automated Index Fund Dollar-Cost Averaging",
    "Top 5 Zero-Fee Credit Cards for Free Global Airport Lounge Access in 2026",
    "AI Portfolio Rebalancing: How Smart Algorithms Protect Your Savings"
]

def get_matching_images(title, category):
    t = title.lower()
    if "emergency" in t or "10,000" in t or "10000" in t:
        return "assets/emergency_vault.svg", "assets/emergency_vault.svg"
    elif "70/20/10" in t or "70-20-10" in t:
        return "assets/rule_702010.svg", "assets/rule_702010.svg"
    elif "50/30/20" in t or "budgeting rule" in t:
        return "assets/saving.png", "assets/saving_infographic.png"
    elif "credit" in t or "card" in t or "lounge" in t or "reward" in t:
        return "assets/credit.png", "assets/card_perks.png"
    elif "bank" in t or "fee" in t or "audit" in t:
        return "assets/audit.png", "assets/bank_audit_chart.png"
    else:
        return "assets/micro.png", "assets/compound_chart.png"

def generate_post_with_gemini(api_key, topic_hint):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    
    prompt = f"""
You are an elite personal finance practitioner writing for smart 18-30 year-old professionals.
The current year is 2026. You MUST write all your content from the perspective of the year 2026.
DO NOT write generic advice like "save money" or "cut coffee".
Write an ultra-niche, extremely detailed and comprehensive insider financial masterclass on: "{topic_hint}".
Ensure the article is very long, detailed, and comprehensive (800-1000+ words total).

CRITICAL INSTRUCTIONS:
1. Current Year: Explicitly reference the year 2026. Do NOT treat 2023 or 2024 as the current year. Any tables, dates, policies, or guidelines should be updated for 2026.
2. In-Article Graphic Placement: You must embed the article's infographic graphic. Insert this exact HTML tag where appropriate in the body of contentPart1 (preferably after the first or second paragraph):
   <img src="[INLINE_IMAGE_PATH]" alt="Descriptive infographic illustration" class="article-content-img">
3. Insiders details: Include specific real-world hacks, exact product names (Fidelity SPAXX, T-Bill 31 U.S.C. § 3124 state tax exemptions, Hyatt 1:1 point transfers, CFPB phone scripts, ACH direct deposit bypass tricks), tax loopholes, and exact numbers that basic AI prompts skip.

Respond ONLY with a valid raw JSON object (without markdown codeblock backticks ```json ... ```) matching this exact schema:
{{
  "id": "slug-style-unique-id",
  "title": "Compelling Title Here",
  "category": "Choose one from: Micro-Investing Guide, Budgeting Framework, Reward Optimization, 2026 Financial Tech, AI Money Management",
  "readTime": "22 min read",
  "excerpt": "High-CTR summary explaining the specific insider hacks.",
  "contentPart1": "<h2>Part 1: What Basic Advice Misses</h2><p>Deep paragraph (200+ words) detailing real-world friction and tax drag...</p><img src=\\"[INLINE_IMAGE_PATH]\\u0022 alt=\\u0022Descriptive infographic illustration\\u0022 class=\\u0022article-content-img\\u0022><h2>Part 2: Insider Hack 1</h2><p>Detailed explanation...</p><ul><li><strong>Key Hack:</strong> Details...</li></ul>",
  "contentPart2": "<h2>Part 3: Insider Hack 2</h2><p>Detailed breakdown...</p><div class=\\"table-responsive\\"><table class=\\"finance-table\\"><thead><tr><th>Methodology</th><th>Standard Approach</th><th>Insider Arbitrage</th><th>1-Year Gain</th></tr></thead><tbody><tr><td>Tier 1</td><td>Standard</td><td>Optimized</td><td>+$520</td></tr></tbody></table></div><h2>Part 4: Step-by-Step Execution Playbook</h2><p>Closing actionable masterclass takeaway.</p>"
}}
"""
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                text_response = res_data['candidates'][0]['content']['parts'][0]['text'].strip()
                
                if text_response.startswith("```"):
                    text_response = text_response.split("\n", 1)[1]
                if text_response.endswith("```"):
                    text_response = text_response.rsplit("```", 1)[0]
                if text_response.startswith("json"):
                    text_response = text_response[4:].strip()
                    
                post_obj = json.loads(text_response)
                return post_obj
        except urllib.error.HTTPError as e:
            if e.code == 429:
                print(f"Rate limited (429). Retrying attempt {attempt + 1}/3 after 5 seconds...")
                time.sleep(5)
            else:
                print(f"HTTP Error calling Gemini API: {e.code}")
                break
        except Exception as e:
            print(f"Error calling Gemini API for '{topic_hint}': {e}")
            break
            
    return None

def fallback_post_generator(topic_hint):
    slug = topic_hint.lower().replace(" ", "-").replace(":", "").replace("?", "").replace("'", "").replace(",", "")[:40]
    category = random.choice(CATEGORIES)
    today_str = datetime.date.today().strftime("%Y-%m-%d")
    
    cover_img, inline_img = get_matching_images(topic_hint, category)
    
    return {
        "id": f"{slug}-{random.randint(100,999)}",
        "title": topic_hint,
        "category": category,
        "readTime": f"{random.randint(10, 15)} min read",
        "excerpt": f"Discover how young adults in 2026 are mastering {topic_hint.lower()} to accelerate their wealth accumulation.",
        "image": cover_img,
        "date": today_str,
        "contentPart1": f"""
            <p>Navigating personal finance in 2026 requires smart, automated strategies. When looking at <strong>{topic_hint}</strong>, young professionals between 18 and 30 are finding innovative ways to optimize their cash flows without sacrificing lifestyle quality.</p>
            <img src="{inline_img}" alt="{topic_hint} Infographic" class="article-content-img">
            <p>By leveraging automated micro-savings, digital banking tools, and disciplined budgeting algorithms, you can turn small daily spare change into substantial long-term reserves.</p>
            <ul>
                <li><strong>Automated Execution:</strong> Remove emotion by letting smart apps transfer savings automatically.</li>
                <li><strong>High Yield Focus:</strong> Ensure your money earns market-beating interest rates rather than sitting idle.</li>
                <li><strong>Compounding Acceleration:</strong> Reinvest payouts immediately to maximize annual gains.</li>
            </ul>
        """,
        "contentPart2": f"""
            <h2>3 Practical Steps to Master {topic_hint} in 2026</h2>
            <h3>1. Set Up Daily Micro-Transfers</h3>
            <p>Start small with automated round-ups or $5 daily transfers to your high-yield savings account.</p>
            <h3>2. Eliminate High-Fee Financial Accounts</h3>
            <p>Audit your monthly statements and switch to modern zero-fee accounts with high APY returns.</p>
            <h3>3. Rebalance Your Portfolio Regularly</h3>
            <p>Consistently allocate spare savings across index funds, fractional shares, and liquid emergency reserves.</p>
            <div class="table-responsive">
                <table class="finance-table">
                    <thead>
                        <tr><th>Strategy Phase</th><th>Monthly Capital</th><th>Annual Yield (Est)</th><th>5-Year Growth</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Phase 1 (Starter)</td><td>$50</td><td>$650</td><td>$3,500</td></tr>
                        <tr><td>Phase 2 (Growth)</td><td>$200</td><td>$2,600</td><td>$14,200</td></tr>
                        <tr><td>Phase 3 (Mastery)</td><td>$500</td><td>$6,500</td><td>$36,000</td></tr>
                    </tbody>
                </table>
            </div>
            <p>Consistency beats intensity every single time. Start implementing these principles today to secure your financial future!</p>
        """
    }

def update_sitemap(all_posts):
    sitemap_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "sitemap.xml"))
    robots_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "robots.txt"))
    today_str = datetime.date.today().strftime("%Y-%m-%d")

    urls_xml = f"""  <url>
    <loc>https://smartlyearn.vercel.app/</loc>
    <lastmod>{today_str}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>\n"""

    for post in all_posts:
        post_id = post.get("id")
        urls_xml += f"""  <url>
    <loc>https://smartlyearn.vercel.app/#{post_id}</loc>
    <lastmod>{post.get("date", today_str)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n"""

    sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{urls_xml}</urlset>"""

    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(sitemap_content)

    robots_content = """User-agent: *
Allow: /
Sitemap: https://smartlyearn.vercel.app/sitemap.xml
"""
    with open(robots_path, "w", encoding="utf-8") as f:
        f.write(robots_content)

    print(f"Updated sitemap.xml ({len(all_posts) + 1} URLs) and robots.txt successfully!")

def main():
    api_key = os.environ.get("GEMINI_API_KEY", "")
    posts_file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "posts", "posts.json"))

    print(f"Loading posts from {posts_file_path}...")
    existing_posts = []
    if os.path.exists(posts_file_path):
        try:
            with open(posts_file_path, "r", encoding="utf-8") as f:
                existing_posts = json.load(f)
        except Exception as e:
            print(f"Error loading existing posts: {e}")
            existing_posts = []

    existing_ids = set(p.get("id") for p in existing_posts)
    existing_titles = set(p.get("title", "").lower() for p in existing_posts)

    available_topics = [t for t in TRENDING_TOPICS if t.lower() not in existing_titles]

    if not available_topics:
        print("All predefined topics have been published.")
        update_sitemap(existing_posts)
        return

    selected_topics = random.sample(available_topics, 1)
    new_posts = []
    today_str = datetime.date.today().strftime("%Y-%m-%d")

    for topic in selected_topics:
        print(f"Generating article for topic: '{topic}'...")
        post = None
        if api_key:
            post = generate_post_with_gemini(api_key, topic)
            
        if not post or "id" not in post:
            print("Using topic-specific fallback generator with matching graphics...")
            post = fallback_post_generator(topic)

        if post["id"] in existing_ids:
            post["id"] = f"{post['id']}-{random.randint(100, 999)}"

        cover_img, inline_img = get_matching_images(topic, post.get("category", ""))
        
        if "contentPart1" in post:
            post["contentPart1"] = post["contentPart1"].replace("[INLINE_IMAGE_PATH]", inline_img)
        if "contentPart2" in post:
            post["contentPart2"] = post["contentPart2"].replace("[INLINE_IMAGE_PATH]", inline_img)
            
        post["image"] = cover_img
        post["date"] = today_str
        new_posts.append(post)

    all_posts = new_posts + existing_posts

    with open(posts_file_path, "w", encoding="utf-8") as f:
        json.dump(all_posts, f, indent=2, ensure_ascii=False)

    print(f"Successfully added {len(new_posts)} new unique post to posts.json! Total posts now: {len(all_posts)}")
    update_sitemap(all_posts)

if __name__ == "__main__":
    main()
