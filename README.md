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
1. `npm run lint` — ESLint checks
2. `npm run type-check` — TypeScript type checking
3. `npm run build` — Next.js production build

You can see the status of these checks in the PR checks section on GitHub.

### Vercel Deployment
- **Production**: Auto-deploys when `main` branch changes
- **Preview**: Auto-deploys for every Pull Request
- This is handled by the native GitHub ↔ Vercel integration (free plan)

### Environment Variables
Environment variables are managed in **one place**: GitHub Secrets.

#### Required GitHub Secrets
| Secret | Description |
|--------|-------------|
| `RESEND_API_KEY` | Resend API key for email sending |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification code |
| `NEXT_PUBLIC_CALENDLY_URL` | Public Calendly scheduling URL |

#### Optional GitHub Secrets (for Vercel sync)
| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Your Vercel organization ID |
| `VERCEL_PROJECT_ID` | Your Vercel project ID |

> 💡 **Tip:** You can find your Vercel Org ID and Project ID in `.vercel/project.json` after running `vercel link` locally, or in your Vercel project settings.

#### Syncing env vars to Vercel
Instead of manually copying variables into the Vercel dashboard, use the GitHub Action:

1. Go to **Actions → Sync Env to Vercel**
2. Click **Run workflow**
3. Choose the target environment (`production`, `preview`, or `development`)
4. Click **Run**

The workflow will push all secrets from GitHub to Vercel automatically.

> ⚠️ **Important:** `NEXT_PUBLIC_*` variables are baked into the client bundle at build time. After syncing them, trigger a new deploy so Vercel picks up the changes:
> ```bash
> git commit --allow-empty -m "chore: trigger rebuild after env sync" && git push
> ```

## 📝 License

This project is proprietary and confidential. All rights reserved.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the styling solution
- Framer Motion for the smooth animations
- Resend for the email service
