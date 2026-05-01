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

We use a **three-environment** workflow aligned with your GitHub Environments:

| GitHub Environment | Branch | Vercel Target | Local File |
|-------------------|--------|--------------|------------|
| `Production` | `main` | Production | `.env.production` |
| `Preview` | PRs | Preview | `.env.preview` |
| `Development` | `Development` | Preview (dev branch) | `.env.develop` |

The flow is always:

```
Your local .env.<env>  →  GitHub Environment Secrets  →  Vercel
        (source)              (vault)                 (runtime)
```

### Local env files (per environment)

Run this once to generate all local env files:

```bash
npm run env:init
```

This creates four files from `.env.example`:

| File | Purpose |
|------|---------|
| `.env` | Local development (fallback / personal values) |
| `.env.production` | Production values |
| `.env.preview` | Preview / PR values |
| `.env.develop` | Development branch values |

> 💡 All `.env*` files are gitignored. Only `.env.example` is tracked in git.

### Pushing local env vars to GitHub (per environment)

```bash
# Push to the Production environment
npm run env:push -- --env Production .env.production

# Push to the Preview environment
npm run env:push -- --env Preview .env.preview

# Push to the Development environment
npm run env:push -- --env Development .env.develop

# Push to repository-level secrets (fallback, all environments)
npm run env:push -- .env
```

### Pushing local env vars directly to Vercel (skip GitHub)

If you want to bypass GitHub and push straight to Vercel (useful for quick local iteration):

```bash
# Push to Vercel Production
npm run env:push:vercel -- --env production .env.production

# Push to Vercel Preview
npm run env:push:vercel -- --env preview .env.preview

# Push to Vercel Development (for local vercel dev)
npm run env:push:vercel -- --env development .env.develop
```

> ⚠️ **Requires Vercel CLI:** `npm install -g vercel` and `vercel login`

#### Troubleshooting: SSL certificate errors

If you see `unable to get local issuer certificate`, you are likely behind a corporate proxy or VPN. Use the `--insecure` flag:

```bash
# Single environment
npm run env:push:vercel -- --env production .env.production --insecure

# All environments to Vercel
npm run env:push:all -- --vercel --insecure

# Both GitHub and Vercel
npm run env:push:all -- --both --insecure
```

> ⚠️ `--insecure` disables SSL certificate validation. Only use this on trusted networks.

### Push ALL environments at once

```bash
# Push to GitHub Environments only (default)
npm run env:push:all

# Push to Vercel only
npm run env:push:all -- --vercel

# Push to BOTH GitHub AND Vercel
npm run env:push:all -- --both

# Preview what would be pushed (dry run)
npm run env:push:all -- --dry-run
npm run env:push:all -- --both --dry-run
```

> 🔒 **Safety guarantee:** All scripts only create/update keys **present in your file**. Existing secrets that are **not** in the file are **left untouched** (never deleted).
>
> Example: if `RESEND_API_KEY` already exists and you only want to add `NEXT_PUBLIC_CALENDLY_URL`:
> ```bash
> echo "NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-name/30min" > /tmp/calendly-only.env
> npm run env:push -- --env Production /tmp/calendly-only.env
> npm run env:push:vercel -- --env production /tmp/calendly-only.env
> ```
> `RESEND_API_KEY` will remain exactly as it was.

> 💡 **Is this a good practice?** Yes — for a solo-maintained client project, keeping env files locally and syncing via CLI is fast and safe. Just remember: **never commit `.env` files to git**, and keep your machine secure.

### Listing current GitHub secrets

```bash
npm run env:list
```

This lists secrets for every environment you have configured. GitHub never reveals values (not even to repo owners).

### Syncing GitHub → Vercel (no dashboard!)

1. Go to **Actions → Sync Env to Vercel**
2. Click **Run workflow**
3. Choose the target environment (`Production`, `Preview`, or `Development`)
4. Click **Run**

The workflow reads secrets from the selected **GitHub Environment** and pushes them to the matching **Vercel environment**.

> ⚠️ **Important:** `NEXT_PUBLIC_*` variables are baked into the client bundle at build time. After syncing them, trigger a new deploy so Vercel picks up the changes:
> ```bash
> git commit --allow-empty -m "chore: trigger rebuild after env sync" && git push
> ```

### Required GitHub Secrets (per environment)

Store these in each GitHub Environment (Settings → Environments → `<env>` → Environment secrets):

| Secret | Description |
|--------|-------------|
| `RESEND_API_KEY` | Resend API key for email sending |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification code |
| `NEXT_PUBLIC_CALENDLY_URL` | Public Calendly scheduling URL |

### Optional GitHub Secrets (for Vercel sync)

These can live at the **repository level** (all environments share the same Vercel project):

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
