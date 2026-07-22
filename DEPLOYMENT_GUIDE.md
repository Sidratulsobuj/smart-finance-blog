# 🚀 Vercel Deployment & Automated 2-Post/Day Gemini Pipeline Guide

This guide explains how to connect your **SmartFinance Blog** repository to **GitHub** and **Vercel**, enabling **2 automated 2026 trending posts per day** generated using Google's Gemini AI API.

---

## 🛠️ Step 1: Push Code to GitHub

Open terminal in `C:\Users\user\.gemini\antigravity\scratch\smart_finance_blog\` and run:

```bash
git init
git add .
git commit -m "Initial commit: SmartFinance Automated Blog"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/smart-finance-blog.git
git push -u origin main
```

---

## 🔑 Step 2: Add `GEMINI_API_KEY` to GitHub Secrets

1. Go to your repository on **GitHub**.
2. Click **Settings** -> **Secrets and variables** -> **Actions**.
3. Click **New repository secret**.
4. Name: `GEMINI_API_KEY`
5. Value: Your Gemini API Key from Google AI Studio.
6. Click **Add secret**.

---

## 🌐 Step 3: Deploy to Vercel (Automatic Deployment)

1. Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New...** -> **Project**.
3. Import your `smart-finance-blog` repository from GitHub.
4. Keep framework preset as **Other** / **Static Site**.
5. Click **Deploy**.

Vercel will build and publish your site with a free custom SSL URL (e.g. `https://smart-finance-blog.vercel.app`)!

---

## 🤖 How the 2-Post/Day Automation Works

- **GitHub Actions Workflow** (`.github/workflows/auto_post.yml`) triggers automatically twice every day at 12:00 AM & 12:00 PM UTC.
- It calls `scripts/generate_posts.py` which asks Gemini API to write 2 fresh, human-like 2026 trending articles on micro-investing, credit card hacks, or AI money management.
- The workflow automatically commits the updated `posts/posts.json` back to your main branch.
- **Vercel instantly detects the push** and auto-deploys the updated live site in under 15 seconds!

### Manual Trigger Option:
You can also generate 2 posts immediately anytime by going to **GitHub** -> **Actions** -> **Auto Generate 2026 Trending Posts** -> Click **Run workflow**.
