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
- **Code Quality**: Biome + Zod env validation

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

> ⚠️ **Never commit `.env` files to git.** They are already gitignored.

### Setup

Install Vercel CLI **globally** (it ships with its own SSL certs, so it works behind corporate proxies):

```bash
npm install -g vercel
```

Then login and link:

```bash
vercel login
vercel link
```

### Daily workflow

```bash
# Pull current env vars from Vercel to your machine
npm run env:pull        # creates .env.local

# Edit .env.local (or create .env.production / .env.preview)
# Then push back to Vercel:
npm run env:push production .env.production
npm run env:push preview .env.preview
```

That's it. No dashboards, no GitHub Environments, no auto-sync workflows.

## 📝 License

This project is proprietary and confidential. All rights reserved.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the styling solution
- Framer Motion for the smooth animations
- Resend for the email service
