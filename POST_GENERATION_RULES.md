# 📜 SMARTLYEARN - AUTOMATED POST GENERATION RULES (2000+ WORDS & WEBP ASSETS)

This document enforces the **3 Strict Mandatory Rules** for creating any future article on SmartlyEarn. These rules are now hardcoded into the project workflow.

---

## ⚡ RULE 1: MANDATORY 2,000+ WORD ARTICLE LENGTH
Every single post must contain **at least 2,000 to 2,500 words** of deep, highly detailed, professional financial content split into 10+ sections:
- **Section 1-3:** Problem breakdown, market reality, mechanisms.
- **Section 4-6:** Strategy breakdown, step-by-step execution, math formulas.
- **Section 7:** Financial Growth Matrix comparative table.
- **Section 8-10:** Tax shields, risk management, real-world case study, platform comparisons, and FAQ.

---

## 🎨 RULE 2: MANDATORY BRAND NEW CUSTOM IMAGE PER POST
Never reuse old images! For **EVERY new post**:
1. Run `generate_image` tool to create a unique 16:9 glassmorphism vector graphic matching the post topic.
2. Style directive: *Futuristic 16:9 fintech glassmorphism vector illustration, neon cyan & gold palette, glowing digital vault/chart iconography, dark mode.*

---

## ⚡ RULE 3: MANDATORY WEBP COMPRESSION (BANDWIDTH PROTECTION)
Every newly generated image must immediately be converted to lossless **WebP format** (`quality=85`) before saving to `assets/<post_id_image>.webp`.
- Never reference raw `.png` or `.jpg` files in `posts.json` or `index.html`.
- Always use `.webp` to protect Vercel's 100GB monthly bandwidth limit.

---

## 🤖 COMPREHENSIVE AI GENERATION PROMPT

```json
{
  "rule_1_length": "Must be 2,000+ words across 10 detailed sections",
  "rule_2_image": "Generate a brand-new custom 16:9 asset per post",
  "rule_3_webp": "Compress image to WebP format before linking in posts.json",
  "content_split": "Split into contentPart1 and contentPart2 for mid-article Adsterra banner"
}
```
