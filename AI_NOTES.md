# 🤖 AI Notes

## Which LLM and Provider

**Provider:** Groq  
**Model:** `llama-3.3-70b-versatile`

**Why Groq?**  
Groq offers a free API tier with very fast inference speeds. For a project like this where the LLM is called on every brief generation, speed and cost matter. Groq's free tier was sufficient to build and demo the full app without any paid plan.

---

## What I Used AI For

- Scaffolding the initial Next.js project structure and file layout
- Writing the Groq prompt to return structured JSON for the research brief
- Boilerplate for MongoDB Mongoose schema and connection utility
- Writing Tailwind component markup for UI components (Navbar, BriefResult, StatusCard)
- Debugging a Tailwind v4 CSS issue (`@import "tailwindcss"` vs `@tailwind base`)

---

## What I Checked and Did Myself

- Understood every file and code block before using it — did not blindly copy-paste
- Tested all API routes manually using Thunder Client (fetch-links, generate-brief, briefs GET/POST, health)
- Verified the LLM JSON response parsing works and handles malformed responses
- Confirmed the 5-brief limit logic deletes the oldest correctly in MongoDB Atlas
- Chose Groq over OpenAI specifically because of the free tier — evaluated this myself
- Checked unused npm packages (`cheerio`, `react-markdown`, `clsx`, `tailwind-merge`) and removed them
- Reviewed the Groq prompt output and adjusted temperature to `0.3` for more consistent JSON
