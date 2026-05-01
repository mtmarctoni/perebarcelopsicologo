# Pere Barceló - Psicólogo

A modern and responsive website for Pere Barceló, a professional psychologist, built with Next.js and TypeScript.

## 🚀 Features

- Modern and responsive design with Tailwind CSS
- Dark/Light theme support using next-themes
- Type-safe development with TypeScript
- Smooth animations using Framer Motion
- Email sending capabilities with Resend
- Optimized performance with Next.js features

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email Service**: Resend
- **Code Quality**: ESLint + Zod env validation

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/mtmarctoni/perebarcelopsicologo.git
cd perebarcelopsicologo
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file from the example
```bash
cp .env.example .env
```

4. Fill in the required values in `.env`:
   - `RESEND_API_KEY` — required for the contact form to send emails
   - `GOOGLE_SITE_VERIFICATION` — optional, for Google Search Console
   - `NEXT_PUBLIC_CALENDLY_URL` — optional, for the booking widget

## 🏃‍♂️ Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Building for Production

```bash
npm run build
npm run start
```

## 🧪 Code Quality

Run the linter:
```bash
npm run lint
```

Run TypeScript type checking (no emit):
```bash
npm run type-check
```

## 🔄 CI / CD

### GitHub Actions CI
Every Pull Request and every push to `main` automatically runs:
1. `npm run type-check` — TypeScript type checking
2. `npm run build` — Next.js production build

> **Note:** The lint step is temporarily disabled while we fix the ESLint flat-config issue.

You can see the status of these checks in the PR checks section on GitHub.

### Vercel Deployment
- **Production**: Auto-deploys when `main` branch changes
- **Preview**: Auto-deploys for every Pull Request
- This is handled by the native GitHub ↔ Vercel integration (free plan)

## 🔐 Environment Variables

We use a **single source of truth** workflow:

```
Your local .env files  →  GitHub Secrets  →  Vercel
        (source)            (vault)         (runtime)
```

You edit env vars locally, push them to GitHub, then sync GitHub → Vercel via a one-click Action.

### Local env files (per environment)

Run this once to generate your local env files:

```bash
npm run env:init
```

This creates three files from `.env.example`:

| File | Purpose |
|------|---------|
| `.env` | Local development |
| `.env.production` | Production values (kept locally, never committed) |
| `.env.preview` | Preview / staging values |

> 💡 All `.env*` files are gitignored. Only `.env.example` is tracked in git.

### Pushing local env vars to GitHub

```bash
# Push your local dev values
npm run env:push -- .env

# Push production values
npm run env:push -- .env.production

# Push preview values
npm run env:push -- .env.preview
```

> 💡 **Is this a good practice?** Yes — for a solo-maintained client project, keeping env files locally and syncing to GitHub via CLI is fast and safe. The `gh secret set -f` command is GitHub's official way to bulk-upload secrets. Just remember: **never commit `.env` files to git**, and keep your machine secure.

### Listing current GitHub secrets

```bash
npm run env:list
```

> ⚠️ GitHub never reveals secret values (not even to repo owners). This only shows the names of configured secrets.

### Syncing GitHub → Vercel (no dashboard!)

1. Go to **Actions → Sync Env to Vercel**
2. Click **Run workflow**
3. Choose the target environment (`production`, `preview`, or `development`)
4. Click **Run**

The workflow pushes all secrets from GitHub to Vercel automatically.

> ⚠️ **Important:** `NEXT_PUBLIC_*` variables are baked into the client bundle at build time. After syncing them, trigger a new deploy so Vercel picks up the changes:
> ```bash
> git commit --allow-empty -m "chore: trigger rebuild after env sync" && git push
> ```

### Required GitHub Secrets
| Secret | Description |
|--------|-------------|
| `RESEND_API_KEY` | Resend API key for email sending |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification code |
| `NEXT_PUBLIC_CALENDLY_URL` | Public Calendly scheduling URL |

### Optional GitHub Secrets (for Vercel sync)
| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Your Vercel organization ID |
| `VERCEL_PROJECT_ID` | Your Vercel project ID |

> 💡 **Tip:** You can find your Vercel Org ID and Project ID in `.vercel/project.json` after running `vercel link` locally, or in your Vercel project settings.

## 📝 License

This project is proprietary and confidential. All rights reserved.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the styling solution
- Framer Motion for the smooth animations
- Resend for the email service
