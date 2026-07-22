# 💰 AdSense & Custom Ad Banner Setup Guide

This guide explains how to activate **Google AdSense** or insert custom **Ad Banners / Affiliate Links** on the SmartlyEarn blog.

---

## 🎯 Pre-configured Ad Placements Across the Website

The website comes with **5 strategic ad zones** pre-installed for maximum Click-Through Rate (CTR) and earnings:

1. **Header Leaderboard Banner**: Located at the top of the home feed.
2. **In-Feed Native Cards**: Rendered between blog posts on the homepage grid.
3. **Sidebar Sticky Banner**: Displayed inside the left navigation panel.
4. **In-Article Top & Mid Banners**: Embedded inside every single article masterclass.
5. **Footer Recommendation Widgets**: Grid of sponsored cards at the bottom of pages.

---

## ⚡ Option A: Google AdSense Setup (Automatic Ads)

If the client has a Google AdSense account (`ca-pub-XXXXXXXXXXXXXXXX`):

1. Open `index.html`.
2. Locate line 20 in the `<head>` section:
   ```html
   <!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script> -->
   ```
3. Remove `<!--` and `-->` to uncomment the script.
4. Replace `ca-pub-XXXXXXXXXXXXXXXX` with the Client's **Google AdSense Publisher ID**.
5. Save & push code. Google AdSense will automatically place high-paying ads across the site!

---

## 🎨 Option B: Custom Banner Ads / Affiliate Links

If the client wants to sell custom ad space or place affiliate links (e.g., Bank referral links, Amazon affiliates, Crypto affiliate links):

1. Open `index.html`.
2. Find the ad section (search for `ad-container-leaderboard`, `feed-ad-card`, or `inline-article-top-ad`).
3. Change the title, description, and link `href="#"` to point to the client's affiliate link:
   ```html
   <a href="https://client-affiliate-link.com" target="_blank" class="ad-btn">Claim Offer</a>
   ```

---

## 🔒 Personal Data Cleanliness Certification
- **No Personal API Keys**: The python generator uses `os.environ.get("GEMINI_API_KEY")` from GitHub Secrets.
- **No Personal Links / Names**: Author name set to `SmartlyEarn Editorial Team`.
- **100% Client Ready**: The codebase is completely sanitized and ready for production handover.
