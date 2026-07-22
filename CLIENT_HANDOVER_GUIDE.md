# 🤝 Client Handover & Independent Vercel Setup Guide

This guide explains how to transfer the **SmartlyEarn Automated Blog** to a client so they have **100% full ownership**, their own free **Vercel account**, and their own **Gemini API Key**.

---

## 🔄 Method: Transfer Existing Vercel Project directly to Client Account

If you already created the project on your Vercel account and want to transfer the **exact same live Vercel website** directly to the client's Vercel account:

### Step 1: Client creates a Vercel Account
Ask the client to create a free account at [Vercel.com](https://vercel.com) and give you their **Vercel Username** or **Email**.

### Step 2: Transfer Project in Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click on your project (`smart-finance-blog`).
3. Go to **Settings** (top menu bar).
4. Scroll down to the bottom of the General settings page to the **Transfer Project** section.
5. Click **Transfer**.
6. Type the **Client's Vercel Username, Email, or Team Name**.
7. Click **Confirm Transfer**.

*Vercel will send a transfer request. Once the client accepts it, the project, domain, and live URL immediately belong to the client's Vercel account!*

---

## 📝 Step-by-Step Handover Checklist for Client

### 1. Get Client's Gemini API Key (Free)
- Ask the client to go to [Google AI Studio](https://aistudio.google.com/).
- Sign in with their Google/Gmail account.
- Click **Get API Key** -> **Create API Key**.
- Copy the generated API Key.

---

### 2. Client GitHub Setup (Repository Hosting)
Choose **Method A** or **Method B**:

#### **Method A: Create a New Repo on Client's GitHub (Easiest)**
1. Create a GitHub account for the client (or use their existing one).
2. Create a new repository (e.g., `smart-finance-blog`).
3. Push the project code to the client's repository:
   ```bash
   git remote set-url origin https://github.com/CLIENT_USERNAME/smart-finance-blog.git
   git push -u origin main
   ```

#### **Method B: Transfer Existing Repo to Client**
1. Go to your GitHub repository -> **Settings** -> **Danger Zone**.
2. Click **Transfer ownership**.
3. Type the client's GitHub username and confirm transfer.

---

### 3. Set Up GitHub Secret (For Auto 2-Post/Day Generator)
1. In the client's GitHub repo, go to **Settings** -> **Secrets and variables** -> **Actions**.
2. Click **New repository secret**.
3. Name: `GEMINI_API_KEY`
4. Value: *Paste the client's Gemini API Key*.
5. Click **Add secret**.

---

### 4. Client Vercel Setup (Free Hosting)
1. Ask the client to go to [Vercel.com](https://vercel.com) and click **Sign Up** using their **GitHub Account**.
2. In Vercel Dashboard, click **Add New...** -> **Project**.
3. Select and **Import** the `smart-finance-blog` repository.
4. Framework Preset: **Other** / **Static Site**.
5. Click **Deploy**.

Vercel will give them a live URL (e.g. `https://client-blog.vercel.app`).

---

### 5. Custom Domain Connection (Optional)
If the client owns a domain (e.g., `www.smartfinance.com`):
1. In Vercel, go to **Project Settings** -> **Domains**.
2. Type the custom domain name and click **Add**.
3. Update the DNS CNAME / A records in the client's domain provider (Namecheap, GoDaddy, Cloudflare, etc.) as instructed by Vercel.

---

## 🚀 Summary of What the Client Owns
- **Website Hosting**: Free on Vercel
- **Automated AI Post Generation**: Free via Google Gemini API (2 posts/day auto-committed by GitHub Actions)
- **Domain**: Free Vercel subdomain or Client's Custom Domain
