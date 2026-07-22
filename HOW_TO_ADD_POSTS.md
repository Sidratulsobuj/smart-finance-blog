# 📖 SmartlyEarn - Complete Guide to Adding New Posts Without Breaking the Site

Follow these simple rules whenever you or any AI tool generates a new post for SmartlyEarn.

---

## ⚠️ 4 Golden Rules (Must Follow)

### Rule 1: Use Unique Kebab-Case IDs
Each post must have a unique `id` in lowercase separated by hyphens (e.g., `"id": "how-to-save-5000-in-2026"`). 
* **Never** use spaces or special characters in the `id`.

### Rule 2: Valid Categories Only
Choose one of these 3 exact categories so filters work seamlessly:
- `Budgeting Framework`
- `Micro-Investing Guide`
- `Reward Optimization`
- `2026 Financial Tech`
- `Passive Income Systems`

### Rule 3: Valid Image Paths
Use existing vector/image assets or valid image URLs:
- `assets/emergency_vault.svg`
- `assets/micro.png`
- `assets/credit.png`
- `assets/audit.png`
- `assets/saving.png`
- `assets/rule_702010.svg`

### Rule 4: Split Content Into `contentPart1` and `contentPart2`
Splitting the article into two parts ensures that the **Adsterra 300x250 Native Banner Ad** displays perfectly in the middle of the article without breaking text flow!

---

## 🛠️ Step-by-Step Instructions to Add a New Post

1. Open `posts/posts.json`.
2. Copy the template structure from `POST_TEMPLATE.json`.
3. Paste the new post object at the **top** of the array in `posts/posts.json`.
4. Save the file.
5. Deploy to GitHub/Vercel using:
   ```bash
   python scratch/deploy_to_client.py
   python scratch/deploy_files_to_vercel.py
   ```

---

## 🤖 Prompt Template for AI Tools (ChatGPT / Gemini / Antigravity)

Copy and paste this prompt to generate new posts safely:

> "Generate a 1,000-word deep masterclass finance post for SmartlyEarn in JSON format following this exact JSON structure:
> 
> ```json
> {
>   "id": "kebab-case-unique-id",
>   "title": "Engaging 2026 Masterclass Title",
>   "category": "Budgeting Framework",
>   "readTime": "30 min read",
>   "excerpt": "Compelling 25-word summary.",
>   "image": "assets/emergency_vault.svg",
>   "date": "2026-07-22",
>   "contentPart1": "<h2>Section 1</h2><p>HTML formatted content...</p>",
>   "contentPart2": "<h2>Section 2</h2><p>HTML formatted content...</p>"
> }
> ```
> Ensure all HTML uses valid <h2>, <p>, <ul>, <ol>, <strong>, and <div class='table-responsive'><table class='finance-table'> tags."
