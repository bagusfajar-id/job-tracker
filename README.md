# 🎯 JobTracker — AI-Powered Job Application Tracker

Track your job applications smarter with the help of AI.

## ✨ Features

- 📋 **Kanban Board** — Visualize applications across Applied, Interview, Offer, and Rejected stages
- 🤖 **AI Job Analyzer** — Paste any job description and get key requirements, keywords, and tips to stand out
- ✍️ **Cover Letter Generator** — Generate a personalized cover letter in seconds using AI
- 🔐 **GitHub OAuth** — Secure login with your GitHub account
- 📊 **Stats Dashboard** — Track your application success rate at a glance

## 🛠️ Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **AI:** Google Gemini 2.5 Flash
- **Deploy:** Vercel

## 🚀 Getting Started

1. Clone the repo
```bash
   git clone https://github.com/bagusfajar-id/job-tracker.git
   cd job-tracker
```

2. Install dependencies
```bash
   npm install
```

3. Setup environment variables — copy `.env.example` and fill in your values
```bash
   cp .env.example .env.local
```

4. Push database schema
```bash
   npx prisma db push
```

5. Run the development server
```bash
   npm run dev
```

## 🌐 Live Demo

[job-tracker.vercel.app](https://job-tracker.vercel.app)

## 📸 Screenshots

> Dashboard with Kanban board and AI Tools

## 📄 License

MIT