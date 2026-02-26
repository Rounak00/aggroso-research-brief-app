# 📚 ResearchBrief AI

> Paste 2–10 links and get an AI-powered research brief with summaries, key points, conflicting claims, citations, and source breakdowns — instantly.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)
![Groq](https://img.shields.io/badge/Groq-LLaMA%203.3-orange?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)

---

## ✨ Features

- 🔗 **Paste 2–10 URLs** — articles, blogs, docs, Wikipedia pages
- 🤖 **AI Research Brief** — generated using Groq's LLaMA 3.3 70B model
- 📝 **Summary** — combined overview of all sources
- 💡 **Key Points** — 5–8 insights with source citations and snippets
- ⚔️ **Conflicting Claims** — highlights where sources disagree
- ✅ **What to Verify** — checklist of claims to fact-check
- 📖 **Source Breakdown** — what was used from each source
- 🕓 **Last 5 Briefs** — saved to MongoDB, viewable on homepage
- 🩺 **Health Status** — live check of server, database, and LLM
- 🖱️ **Hover Cards** — Globe icon for health, Info icon for how-to guide

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), Tailwind CSS v4 |
| Backend | Next.js API Routes |
| LLM | Groq API — `llama-3.3-70b-versatile` (Free) |
| Database | MongoDB Atlas (via Mongoose) |
| Content Extraction | axios + jsdom + @mozilla/readability |
| Icons | lucide-react |
| Hosting | Vercel |

---

## 🚀 How to Run Locally

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)
- A [Groq API](https://console.groq.com/) key (free)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/research-brief-app.git
cd research-brief-app
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Set Up Environment Variables

Create a `.env.local` file in the root of the project:

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in your values:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

> **How to get these:**
> - `MONGODB_URI` → Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas), go to **Connect → Drivers**, copy the connection string
> - `GROQ_API_KEY` → Sign up at [console.groq.com](https://console.groq.com), go to **API Keys**, create a new key
> - `NEXT_PUBLIC_API_URL` → Keep as `http://localhost:3000` for local development

### Step 4 — Configure MongoDB Network Access

In MongoDB Atlas:
1. Go to **Network Access** in the left sidebar
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (fills `0.0.0.0/0`)
4. Click **Confirm**

### Step 5 — Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Returns health status of server, MongoDB, and Groq LLM |
| `POST` | `/api/fetch-links` | Accepts an array of URLs, fetches and extracts clean text content from each |
| `POST` | `/api/generate-brief` | Sends extracted source content to Groq LLM and returns a structured research brief |
| `GET` | `/api/briefs` | Returns the last 5 saved research briefs from MongoDB |
| `POST` | `/api/briefs` | Saves a new research brief to MongoDB (auto-deletes oldest if more than 5 exist) |

### API Request Body Examples for POST

**POST `/api/fetch-links`**
```json
{
  "links": [
    "https://en.wikipedia.org/wiki/Artificial_intelligence",
    "https://en.wikipedia.org/wiki/Machine_learning"
  ]
}
```

**POST `/api/generate-brief`**
```json
{
  "sources": [
    {
      "url": "https://example.com",
      "title": "Article Title",
      "content": "Cleaned article text...",
      "success": true
    }
  ]
}
```

**POST `/api/briefs`**
```json
{
  "links": ["https://..."],
  "sources": [...],
  "brief": {
    "summary": "...",
    "keyPoints": [...],
    "conflictingClaims": [...],
    "whatToVerify": [...],
    "sourceSummaries": [...]
  }
}
```

---

## 🖥️ How to Use the App

1. **Open the app** at `http://localhost:3000`
2. **Paste 2–10 URLs** into the input fields (click `+ Add link` for more)
3. **Click `Generate Brief`** — the app will:
   - Fetch and clean content from each URL
   - Send it to Groq AI for analysis
   - Save the brief to MongoDB
4. **Read your brief** — summary, key points, conflicts, and what to verify
5. **Check source breakdown** — see what each source contributed
6. **View past briefs** — scroll down to see your last 5 briefs, click any to reload it
7. **Check system health** — hover the 🌐 Globe icon in the top-right navbar
8. **How to use guide** — hover the ℹ️ Info icon in the top-right navbar

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── health/route.js          # Health check endpoint
│   │   ├── fetch-links/route.js     # URL fetching + content extraction
│   │   ├── generate-brief/route.js  # Groq LLM brief generation
│   │   └── briefs/route.js          # Save and retrieve briefs
│   ├── status/page.jsx              # Full status page UI
│   ├── layout.jsx
│   └── page.jsx                     # Homepage
├── components/
│   ├── Navbar.jsx                   # Top nav with health + info hover cards
│   ├── HealthCard.jsx               # Live health check card
│   ├── InfoCard.jsx                 # How to use card
│   ├── LinkInput.jsx                # URL input form
│   ├── BriefResult.jsx              # Brief display component
│   ├── BriefCard.jsx                # Past brief card
│   └── StatusCard.jsx               # Status page card
├── lib/
│   ├── mongodb.js                   # MongoDB connection utility
│   └── groq.js                      # Groq client instance
└── models/
    └── Brief.js                     # Mongoose schema for briefs
```

---

## ⚠️ What Is Not Done

- No user authentication — briefs are shared across all sessions
- No export to PDF or markdown
- No URL validation beyond basic format check (some paywalled sites may fail)
- No rate limiting on API routes
- Mobile UI is functional but not fully optimized

---

## 📦 Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add the environment variables in Vercel project settings:
   - `MONGODB_URI`
   - `GROQ_API_KEY`
   - `NEXT_PUBLIC_API_URL` → set to your Vercel URL e.g. `https://your-app.vercel.app`
4. Click **Deploy**

---

## 📄 License

MIT
