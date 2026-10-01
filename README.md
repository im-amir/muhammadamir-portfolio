# Muhammad Amir — Portfolio

Personal portfolio site built with Next.js (App Router), TypeScript and Tailwind CSS. Every page is statically generated. The only server code is the contact form, which sends email through [Resend](https://resend.com).

## Run it locally

Requirements: Node.js 22.13+ (see `.nvmrc`) and Yarn 1.

```bash
nvm use            # picks up Node 24 from .nvmrc
yarn install
cp .env.example .env.local   # then fill in the values
yarn dev           # http://localhost:3000
```

Other scripts:

| Command          | What it does                         |
| ---------------- | ------------------------------------ |
| `yarn build`     | Production build                     |
| `yarn start`     | Serve the production build           |
| `yarn lint`      | ESLint                               |
| `yarn typecheck` | Generate route types, then run `tsc` |

## Environment variables

| Name                   | Required | Purpose                                                                                                   |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Yes      | Resend API key for the contact form.                                                                      |
| `CONTACT_TO_EMAIL`     | No       | Inbox that receives messages. Defaults to the email in `data/content.ts`.                                 |
| `CONTACT_FROM_EMAIL`   | No       | Sender, e.g. `Portfolio <hello@yourdomain.com>`. Must be on a domain verified in Resend.                  |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Your real domain, e.g. `https://yourdomain.com`. Used for canonical URLs, sitemap, Open Graph and schema. |

> Without `CONTACT_FROM_EMAIL`, Resend's test sender (`onboarding@resend.dev`) is used, which **only delivers to the email you signed up to Resend with**. Verify your domain in Resend before going live.

## Editing content

All text lives in **`data/content.ts`**. You don't need to touch any component to change:

- Profile, hero headline, trust badges, Upwork stats
- Projects (card text, case study sections, tags, links, images)
- Services, experience, skills, testimonials
- Contact copy and the budget dropdown options
- SEO title, description and keywords

The file is fully typed, so `yarn typecheck` will tell you if you miss a field.

### Adding or replacing project screenshots

Placeholder images live in `public/projects/`. Replace them with real screenshots using the **same file names**, or change `image.src` in `data/content.ts`. Best results: 1600×1000 (16:10) PNG/JPG. Next.js converts them to AVIF/WebP automatically. Update `image.alt` to describe the screenshot.

### Adding a project

Add an object to the `projects` array in `data/content.ts` with a unique `slug`. The card, the `/projects/<slug>` page, the sitemap entry and the schema markup are all generated from it.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, click **Add New → Project** and import the repository. The framework is detected automatically.
3. Under **Settings → Environment Variables**, add `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL` and (recommended) `CONTACT_FROM_EMAIL`.
4. Deploy. Add your custom domain under **Settings → Domains**, and make sure `NEXT_PUBLIC_SITE_URL` matches it, then redeploy.

Or deploy from the terminal with `npx vercel` (preview) and `npx vercel --prod`.

## Project structure

```
app/
  layout.tsx              Root layout, fonts, theme provider, global metadata
  page.tsx                Home page (all sections) + Person/ProfessionalService schema
  projects/[slug]/page.tsx  Case study pages + CreativeWork schema
  actions/contact.ts      Server action: validates and sends email with Resend
  opengraph-image.tsx     Generated social share image
  sitemap.ts, robots.ts   SEO files
components/
  layout/                 Header, Footer, ThemeProvider, ThemeToggle
  sections/               Hero, Work, Services, Experience, Skills, Testimonials, Contact
  contact/                ContactForm, Field
  ui/                     Small shared building blocks (Section, ButtonLink, Tag, Icon, ...)
data/content.ts           All site content
lib/                      Site URL, shared form validation, JSON-LD builders
public/projects/          Project screenshots
```

## Notes

- **Theme:** follows the system setting by default; the toggle remembers the choice in `localStorage`.
- **Animations:** sections fade/slide in using CSS scroll-driven animations — no JavaScript. They're skipped for users who prefer reduced motion and in browsers without support.
- **Spam:** the form has a hidden honeypot field. If spam gets through, consider adding Vercel BotID or a rate limit.
