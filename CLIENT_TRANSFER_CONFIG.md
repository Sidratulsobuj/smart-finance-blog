# 🚀 ANTIGRAVITY PROJECT HANDOVER & CLIENT TRANSFER CONFIGURATION

> **Note for Antigravity AI Agent:** This document contains the complete technical architecture, client credentials, API tokens, Adsterra ad keys, project structure, and deployment scripts for **SmartlyEarn** (`smartlyearn.vercel.app`). Use this file to initialize, manage, deploy, or customize the project for the client in any new conversation.

---

## 🔑 1. CLIENT ACCOUNT CREDENTIALS & API TOKENS

### **A. GitHub Repository Credentials**
- **GitHub Username:** `Sidratulsobuj`
- **Target Repository Name:** `smart-finance-blog`
- **Repository URL:** `https://github.com/Sidratulsobuj/smart-finance-blog`
- **GitHub Personal Access Token (PAT):** `ghp_XCqztjctOPHBzlFw` + `taMycn3Ch4zE102GRheL`

### **B. Vercel Production Credentials**
- **Vercel Account Email:** `kimsamas17@gmail.com`
- **Vercel Username:** `kimsamas17-6702`
- **Vercel Project Name:** `smartlyearn`
- **Live Production URL:** `https://smartlyearn.vercel.app`
- **Vercel API Token:** `vcp_5gsGssz33Z9GMbz5RVFMWt` + `KrQecm5FyOFKHpj6NNwCVu965bJx4LCGEp`

### **C. Google Search Console Meta Verification**
```html
<meta name="google-site-verification" content="Y6vfAZUniV6YiiUUmEOp5tyHeW1f8kiDKkkbrd3DpYU" />
```

---

## 💰 2. ADSTERRA ADVERTISING MONETIZATION KEYS

All ad slots use client's Adsterra publisher key scripts:

1. **Popunder Ad Script:**
   ```html
   <script src="https://pl30477562.effectivecpmnetwork.com/54/c9/de/54c9de91e64ebeafb6e25777c57d5bb7.js"></script>
   ```
2. **Social Bar Ad Script:**
   ```html
   <script src="https://pl30477564.effectivecpmnetwork.com/e1/29/9f/e1299f41470d532d7009ed9c65a165bc.js"></script>
   ```
3. **Top Header Native Sandbox Banner:**
   ```html
   <script async="async" data-cfasync="false" src="https://pl30477563.effectivecpmnetwork.com/26af483845ef343cd81dbf10a6da1bb0/invoke.js"></script>
   <div id="container-26af483845ef343cd81dbf10a6da1bb0"></div>
   ```
4. **300x250 Sidebar & Mid-Article Banner:**
   - Adsterra Key: `64b60da9f4378234c925ba0bfce2af56`
   - Script URL: `https://www.highperformanceformat.com/64b60da9f4378234c925ba0bfce2af56/invoke.js`
5. **728x90 Sticky Bottom Desktop Banner:**
   - Adsterra Key: `9c23eade965bb17854d81fe70f432e74`
   - Script URL: `https://www.highperformanceformat.com/9c23eade965bb17854d81fe70f432e74/invoke.js`

---

## 📁 3. PROJECT ARCHITECTURE & FILE MAP

```
smart_finance_blog/
├── index.html                 # Primary Single-Page Dashboard & Article App Shell
├── style.css                  # Modern Glassmorphism CSS Design System & Dark Theme
├── app.js                     # Dynamic Post Loader, View Panel Switcher & Theme Logic
├── vercel.json                # Vercel Serverless Routing Config
├── sitemap.xml                # SEO XML Sitemap
├── robots.txt                 # Search Engine Crawler Instructions
├── googlef044911bb95ccb8b.html # Google Verification File
├── POST_TEMPLATE.json         # Reusable Standard JSON Post Schema
├── HOW_TO_ADD_POSTS.md        # Guide for Adding New Masterclass Articles
├── assets/                    # Vector Graphics & Images
├── posts/
│   └── posts.json             # Database of 6 Full Masterclass Guides
└── scratch/
    ├── deploy_to_client.py     # Automatic Sync to GitHub (Sidratulsobuj/smart-finance-blog)
    └── deploy_files_to_vercel.py # Instant Deploy & Production Alias Mapping to Vercel
```

---

## ⚡ 4. ONE-CLICK DEPLOYMENT COMMANDS

To deploy any future updates to GitHub and Vercel simultaneously, run these two commands:

```bash
# 1. Sync all code to Client GitHub Repo
python scratch/deploy_to_client.py

# 2. Deploy live blobs and assign production alias (https://smartlyearn.vercel.app)
python scratch/deploy_files_to_vercel.py
```

---

## 🤖 5. INITIAL PROMPT TO START A NEW ANTIGRAVITY CONVERSATION

When starting a new conversation with Antigravity for this client, copy and paste the following prompt:

> **"Hi Antigravity! I am working on the SmartlyEarn client project. All credentials, Vercel tokens, GitHub PAT tokens, Adsterra ad keys, and deployment scripts are defined in `CLIENT_TRANSFER_CONFIG.md`. Please inspect `CLIENT_TRANSFER_CONFIG.md` and `index.html` to help me manage and update this project."**
