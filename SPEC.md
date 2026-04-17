# Buzz - AI Platform for Business

## Project Overview

**Project Name:** Buzz  
**Project Type:** Next.js 3D Agent Platform  
**Core Functionality:** AI-powered 3D platform for business lead generation with interactive 3D scenes  
**Target Users:** Businesses seeking AI-powered lead qualification and management

## Tech Stack

- **Frontend Framework:** Next.js 14.1.0 (App Router)
- **3D Rendering:** React Three Fiber + Three.js
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Deployment:** Render (3 environments)

## Repository

- **GitHub:** https://github.com/abhishek2025-glitch/Buzz
- **Default Branch:** main

## Environments

### 1. Development (`buzz-dev`)
- **Branch:** `dev`
- **URL:** https://buzz-dev.onrender.com
- **Purpose:** Feature testing and development
- **Auto-Deploy:** Yes (on dev branch push)
- **Plan:** Free

### 2. Staging (`buzz-staging`)
- **Branch:** `main`
- **URL:** https://buzz-staging.onrender.com
- **Purpose:** Pre-production testing
- **Auto-Deploy:** Yes (on main branch push)
- **Plan:** Free

### 3. Production (`buzz-prod`)
- **Branch:** `main`
- **URL:** https://buzz-prod.onrender.com
- **Purpose:** Live production environment
- **Auto-Deploy:** Yes (on main branch push, requires manual approval)
- **Plan:** Starter ($7/month)

### 4. Database (`buzz-db`)
- **Type:** PostgreSQL
- **Version:** 15
- **Purpose:** Lead data storage
- **Plan:** Starter ($7/month)

## Build & Start Commands

### All Environments
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Node Version:** 20.x

## Environment Variables

### Required Variables (All Environments)
| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment name | `production`, `development`, `staging` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGciOiJIUzI1...` |

### Optional Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Application URL (for CORS) | `https://buzz-prod.onrender.com` |

## Features

### Current Features
1. **3D Landing Page** - Interactive Three.js scene with geometric shapes
2. **Lead Capture Form** - Email collection with qualification scoring
3. **Lead Qualification Engine** - Scores leads based on company size, industry, email domain

### Database Schema

#### `leads` Table
```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  qualification_score INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Project Structure

```
Buzz/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── (3D and UI components)
│   └── lib/
│       ├── logicAlloy.ts    # Lead qualification logic
│       └── supabase.ts      # Supabase client
├── public/
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Deployment Guide

### Render Blueprint Setup

1. Connect your GitHub repo to Render
2. Create a new Blueprint with `render.yaml`
3. The blueprint will create:
   - 3 Web Services
   - 1 PostgreSQL Database
   - All required environment groups

### Manual Setup (Alternative)

If not using Blueprint:

1. **Create Database:**
   - Go to Render Dashboard → New → PostgreSQL
   - Name: `buzz-db`
   - Select Starter plan

2. **Create Web Services:**
   - For each environment (dev, staging, prod):
     - New → Web Service
     - Connect GitHub repo
     - Select branch
     - Set build/start commands
     - Add environment variables

## Health Check

- **Endpoint:** `GET /api/health` or root path `/`
- **Expected Response:** HTTP 200 with app loading

## CI/CD Pipeline

1. Developer pushes to `dev` → Auto-deploys to `buzz-dev`
2. Developer pushes to `main` → Auto-deploys to `buzz-staging`
3. After staging验证 → Manual promote to `buzz-prod`

## Notes

- Supabase is used for lead storage (not Render Postgres for main data)
- Render Postgres is provisioned for future caching/session storage needs
- All secrets should be stored in Render Environment Groups
