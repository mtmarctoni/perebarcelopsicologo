# Technical SEO Implementation Plan

> **For agentic workers:** Use executing-plans to implement this plan task-by-task. Track progress below.

**Goal:** Correct the confirmed technical SEO findings without touching Catalan navigation (owned by another branch) or tracking.

**Architecture:** Keep Next.js metadata routes and existing JSON-LD components. Share normalized page URL generation between metadata and sitemap; publish accurate online-practice entity data instead of physical-business claims. Check rendered production-build HTML, not only helper outputs.

**Tech Stack:** Next.js 16, next-intl, TypeScript, Vitest, Playwright, pnpm, GitHub Actions.

**Spec:** The approved audit and implementation request in this conversation; scope and decisions are recorded here so execution can resume without that context.

## Global Constraints

- Do not modify navigation, Button, CTAButton, Footer, or language switching, including tests for issue 2.
- Do not modify GTM, consent, measurement, client-facing copy, dependencies, or release version.
- Keep work on the existing feature branch. Initial implementation was local-only; user subsequently approved the five-commit plan, feature-branch push and PR against main, including the known dependency-audit warning. No merge is authorized.
- Remove unsupported physical address, coordinates, price range and opening hours. Model the named professional as Person, retaining existing name and profile links; do not invent credentials or a separate legal organization.
- Keep homepage URL spelling consistent: bare origin for Spanish, `/ca` for Catalan, no trailing slash on subpages.
- Omit sitemap lastmod until real per-page modification dates are maintained.
- A sitemap includes all five routes in both locales; every entry carries the same reciprocal alternates as its translated counterpart.

## Review Focus

- Catalan homepage canonical must not point to the `/ca/` redirect.
- Each sitemap language alternate must have its own URL entry.
- No physical-location fields or LocalBusiness entity may survive rendered JSON-LD.
- Preview/staging must retain noindex and empty sitemap behavior.
- Post-deployment auditing must use a successful production deployment event and its URL, not race a main-branch push.

## Tasks

### Task 1: Accurate professional structured data

Files: `src/components/seo/SchemaMarkup.tsx`, `src/app/layout.tsx`, new schema regression test.

- [x] Add a failing render test proving Person identity and absence of LocalBusiness/address/geo/opening hours.
- [x] Run the test and confirm assertion failure.
- [x] Replace LocalBusinessSchema with PersonSchema; use stable `#person` identity and the existing professional name/profile links.
- [x] Run the schema test; check exports with Knip.

### Task 2: Canonical and sitemap consistency

Files: `src/app/metadata.ts`, `src/app/sitemap.ts`, new `src/lib/seo-urls.ts`, existing metadata/sitemap tests.

Interface: `getLocalizedPageUrl(baseUrl: string, path: string, locale: string): string` and `getPageAlternates(baseUrl: string, path: string): Record<string, string>`.

- [x] Change/add tests for `/ca`, all ten sitemap entries, reciprocal alternates, no fabricated lastmod, and canonical/sitemap agreement across all routes/locales.
- [x] Run focused tests and confirm failures.
- [x] Introduce URL helpers; use them in default/per-page metadata and all localized sitemap entries; omit lastmod.
- [x] Re-run metadata, sitemap and robots tests.

### Task 3: Verification coverage and deployment audit

Files: new SEO Playwright spec; `.github/workflows/seo-deploy.yml`; existing `scripts/seo-check.sh`.

- [x] Add rendered-HTML checks across all routes/locales for canonical, hreflang, indexability, titles, headings, accurate schema and sitemap membership. Do not assert localized navigation.
- [x] Keep local Lighthouse as a complementary diagnostic; enforce failure on SEO score regression rather than warning only. Canonical validation belongs in rendered-HTML tests because local Lighthouse targets localhost.
- [x] Trigger hosted Lighthouse on successful production `deployment_status`; validate the event's `environment_url` against this project/team, then audit the verified public production root. Report the triggering SHA, explicitly not proof of the alias's served SHA. Unsuccessful/nonproduction events must skip.
- [x] Run browser tests against a local production-mode build; validate workflow syntax/config by inspection. Actual Vercel/GitHub deployment delivery cannot be proven locally.

### Task 4: Final verification and handoff

- [x] Run frozen-lockfile install, lint, type-check, all unit tests, Knip, dependency-cruiser, production build, dependency audit, React Doctor and relevant browser tests. Results and the dependency-audit failure are recorded below.
- [x] Check tracked files against forbidden secret-file patterns; do not inspect ignored environment files as committed secrets.
- [x] Review the complete diff, verify excluded files are untouched, record results/limitations here.
- [x] Leave changes uncommitted for user review before publication. Subsequent commit/push/PR approval is recorded below; no merge.

## Execution record

- Initial audit: metadata/robots/sitemap tests passed 23/23; working tree clean.
- User explicitly requested implementation after writing the plan and excluded issue 2. Execute inline, retaining this plan as the checklist.
- Existing linked worktree verified on `fix/best-practices`; baseline full unit suite passed 56/56.
- RED: five expected assertion failures reproduced physical schema, trailing-slash canonical, missing Catalan sitemap entries and generated lastmod.
- Tasks 1–2: GREEN; unit suite now passes 59/59. Lint, TypeScript, Knip and dependency-cruiser pass. React Doctor changed-scope score: 100/100.
- Task 3: `pnpm exec playwright test --config=playwright.seo.config.ts` built the production-mode site and passed 11/11 tests. New repeatable command: `pnpm test:seo`. Regular browser configuration excludes these production-only tests.
- Workflow YAML parses with Ruby YAML; `bash -n scripts/seo-check.sh` passes. Independent review checked a real successful `Production` deployment payload. The updated hosted workflow itself has not run.
- Ruling (superseded after review): initially permitted all Vercel hosts. Review demonstrated the immutable deployment is authentication-protected and the wildcard too broad. The final implementation accepts only the production domain or the observed project/team's immutable hostname pattern, then audits the public production root; it explicitly does not claim exact-SHA verification.
- Ruling: sitemap enumerates the two currently supported locales without importing `src/i18n/routing.ts`, whose navigation exports pull Next client-router modules into the metadata-route unit tests. Existing routing files remain untouched to avoid the other branch's work; adding a new locale must update the SEO helper and sitemap too.
- Frozen-lockfile installation passes. Dependency audit is NOT clean: 3 low, 2 moderate, 1 high; high advisory GHSA-mrhx-c7xc-m3w5 is transitive `lighthouse > puppeteer-core > chromium-bidi > zod`. No dependency or lockfile changes made.
- Tracked secret-file pattern check passes. Excluded navigation and tracking files have no diff.
- Existing nonblocking tool warnings: Vitest CommonJS/native-loader warning and build warning about Tailwind config module type.
- Ruling: store this plan at repository root as `TECHNICAL_SEO_PLAN.md`, because `/docs` and `.agents/` are intentionally ignored. This keeps the execution record visible in the eventual PR without changing ignore rules.
- Independent review: two Important workflow findings fixed in one pass. Regression tests first reproduced accepting unrelated Vercel hosts, selecting the protected URL, and allowing authentication redirects; all 11 deployment-target tests now pass. Target verifier also passes against the live public site. Entire unit suite now passes 70/70; lint, Knip and dependency-cruiser rechecked green.
- Final review minor (deferred): rendered checks require a nonempty title and exactly one H1 but do not pin exact translated title strings or assert nonempty H1 text. Existing tests cover metadata values; further editorial assertions are not required for the identified fixes.
- Default dev-server full browser run: 72 passed, 2 failed (`mobile` light/dark lower-footer hover tests). Traces show the Next development overlay intercepting pointer events. Footer tests and components are unchanged.
- Full production-server rerun: **74/74 passed**, including both footer tests. No test suppression or footer changes required. Separate production-mode SEO suite: **11/11 passed**. Final unit suite: **70/70 passed**. Fresh production build and type-check passed.
- Remaining external gates: hosted workflow execution on the next successful production deployment; post-deployment Search Console URL inspections; real-user Core Web Vitals when sufficient traffic exists. No assertion of full CI parity or exact-SHA public-alias measurements.
- Publication approval: user approved five focused commits (schema, canonical/sitemap, SEO verification, deployment CI, documentation), pushing the feature branch, and opening a PR against main with the documented dependency-audit warning. No merge authorized.
