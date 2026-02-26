# 📝 Prompts Used

> These are the prompts I used during development with AI tools (Claude, Gemini). Responses are not included.

---

## 1. Project Analysis & DB Design

```
I am building a research brief web app where users paste 5-10 links and the app fetches content, sends it to an LLM, and returns a structured brief with summary, 
key points, conflicting claims, citations, and source breakdown. I want to use Next.js App Router, MongoDB, and Groq API as its free. 
Can you help me plan the overall architecture and folder structure? [Also give the project assignment data as context]
```

```
For this research brief app, how many MongoDB collections do I need? 
The app should save the last 5 briefs and each brief contains the original links, fetched source info, and the full LLM-generated brief object. 
Give me a simple schema design.
```

---
## 2. Package Selection & Comparison

```
I need to fetch content from URLs and extract clean readable text in a Next.js backend API route.
What is the best approach — should I use cheerio, jsdom with @mozilla/readability, or something else? 
Compare them for this use case.
```

```
What is the difference between cheerio and jsdom for HTML parsing in Node.js? 
Which one works better with @mozilla/readability for article text extraction?
```

```
Can I use @mozilla/readability with jsdom in a Next.js API route on the server side? 
Give me a simple example of fetching a URL with axios and extracting the main article text.
```

---

## 3. Backend Development

```
Write a Next.js App Router API route at /api/fetch-links that accepts a POST request with an array of URLs, 
fetches each one using axios, parses the HTML with jsdom and @mozilla/readability, and returns the cleaned text content, title, 
and url for each. Handle errors per URL using Promise.allSettled so one failed URL doesn't break the whole request.
```

```
Write a Next.js API route at /api/generate-brief that takes an array of source objects (each with url, title, content) and sends them to 
Groq using llama-3.3-70b-versatile. The prompt should return a strict JSON object with summary, keyPoints, conflictingClaims, whatToVerify, 
and sourceSummaries fields. Handle JSON parse errors gracefully.
```

```
Write a GET and POST handler in a single Next.js route file at /api/briefs using Mongoose. 
GET returns the last 5 briefs sorted by createdAt descending. POST saves a new brief and 
deletes the oldest if there are more than 5 documents in the collection. [Given Table Schema as a context]
```

```
Improve my /api/health route in Next.js that checks three things: server status ,
MongoDB connection using mongoose, and mostly for GROQ connection.
```

---

## 4. Frontend Development

```
Build a Navbar component in React with Tailwind CSS that has the app name on the left and two icon buttons on the right using lucide-react
— a Globe icon and an Info icon. On hover of each icon, show a dropdown card. The card should close when the mouse leaves the wrapper div.
[Gave a prototype and then Update]
```

```
Build a HealthCard React component that fetches /api/health on mount, shows a Loader2 spinner from lucide-react while loading, then displays the status of Server, Database, and LLM as rows with CheckCircle or XCircle icons colored green or red based on status.
```

```
Build a LinkInput React component with Tailwind CSS. It should have a dynamic list of URL inputs starting with 2,
allow adding up to 10 and removing down to 2. On submit it should call fetch-links, then generate-brief, then save to /api/briefs sequentially. 
Show a status message during each step. Show errors in a styled error box below.
```

```
Build a BriefResult React component that displays a research brief object. It should have sections for Summary, Key Points (with snippet and source link), Conflicting Claims (side by side), What to Verify (checklist style), and Sources Used. Use Tailwind CSS with white cards and gray borders.
```

---

## 5. Documentation & MD Files

```
Write a README.md in GitHub Flavored Markdown for a Next.js research brief app. Include: badges for tech stack, features list, tech stack table, 
step by step local setup guide, API routes table with method/route/description, how to use the app instructions, project folder structure, 
what is not done section, env variables reference table, and Vercel deployment steps. [give addiotional informations and postman API tested curls as a context]
```

```
Write a short AI_NOTES.md for a project submission. Include: which LLM and provider was used and why (Groq, free tier), what was used AI for during development,
and what was checked and verified manually. Keep it concise.
```

``` 
Write an ABOUTME.md for a developer named Rounak Mukherjee based on his resume.  Include education, experience, skills, projects, and achievements sections in clean markdown format. [Give the resume as context]
```

```
Write the PROMPT_USE.md file for all the prompts i have given to you till now. with ptoper structured and format.
```
