# Case Comp HQ 🏆

87 B-school case competitions tracker with pre-loaded strategies, resources, and timelines.
Built for SPJIMR IM&A students.

## Features
- All 87 competitions with dates, formats, team sizes, and Unstop links
- 20 competitions pre-strategized with personalized notes and resources
- Filter by category, period, search, and "My Picks"
- Sort by priority, timeline, category, or company
- Grid and list views
- Add/edit strategies, teammates, resources for any competition
- LocalStorage persistence — your data survives page refreshes

## Deploy to Vercel

### Option A: Via GitHub (Recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New Project" → Import your repo
4. Vercel auto-detects Vite — just click "Deploy"
5. Done! You get a live URL in ~60 seconds

### Option B: Via Vercel CLI
```bash
npm install -g vercel
cd case-comp-hq
vercel
```
Follow the prompts. Done.

## Local Development
```bash
npm install
npm run dev
```

## Custom Domain
After deploying, go to your Vercel project → Settings → Domains → Add your custom domain.
