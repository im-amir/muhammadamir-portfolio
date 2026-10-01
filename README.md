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
| `NEXT_PUBLIC_SITE_URL` | No | Your custom domain, e.g. `https://yourdomain.com`. Used for canonical URLs, sitemap, Open Graph and schema. If empty, Netlify's site address is used. |

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

## Deployment (Netlify)

The site is live at **https://muhammad-amir.netlify.app**. It is connected to the GitHub repo [im-amir/muhammadamir-portfolio](https://github.com/im-amir/muhammadamir-portfolio), so **every push to `main` deploys to production automatically**.

Build settings live in `netlify.toml` (`yarn build`, Node 24). Netlify detects Next.js and applies its Next.js runtime automatically, so the contact form's server action runs as a Netlify Function.

Environment variables are set in Netlify, never in files: **Project configuration → Environment variables**, or with the CLI:

```bash
netlify env:set RESEND_API_KEY "re_..." --secret
netlify env:list
```

Changing an environment variable only takes effect on the next deploy (**Deploys → Trigger deploy**).

## Connecting a custom domain

Do this once you've bought a domain (the example uses `yourdomain.com`).

1. **Add the domain in Netlify.** Go to **Domain management → Add a domain**, enter `yourdomain.com` and confirm. Netlify adds both `yourdomain.com` and `www.yourdomain.com`.
2. **Point DNS at Netlify.** Pick one of the two options.

   **Option A: Netlify DNS (simplest).** In Netlify choose **Set up Netlify DNS**, then at your registrar replace the domain's nameservers with the four Netlify shows you (e.g. `dns1.p0X.nsone.net`). Netlify then manages every record for you.

   **Option B: keep your registrar's DNS.** Add these records at your DNS provider:

   | Type | Host / Name | Value |
   | --- | --- | --- |
   | `ALIAS`, `ANAME` or flattened `CNAME` | `@` (or empty) | `apex-loadbalancer.netlify.com` |
   | `CNAME` | `www` | `muhammad-amir.netlify.app` |

   If your provider doesn't support ALIAS/ANAME/flattening, use an `A` record for `@` pointing to `75.2.60.5` instead. Remove any old `A`/`AAAA`/`CNAME` records for `@` and `www` that point elsewhere.

3. **Wait for DNS and HTTPS.** Propagation can take from a few minutes up to a day. Once the domain resolves, Netlify issues a free Let's Encrypt certificate automatically (**Domain management → HTTPS**). You can click **Verify DNS configuration** to check.
4. **Make it the primary domain.** In **Domain management**, set `yourdomain.com` (or `www`) as primary so the `.netlify.app` address redirects to it.
5. **Update the site URL.** Add the environment variable `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` and trigger a new deploy, so canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph tags and schema use your domain.
6. **Update Resend (optional but recommended).** Verify `yourdomain.com` in Resend (it gives you a few DNS records to add) and set `CONTACT_FROM_EMAIL`, e.g. `Portfolio <hello@yourdomain.com>`, so emails come from your own domain.

Netlify's reference: [Configure external DNS](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/).

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
- **Spam:** the form has a hidden honeypot field. If spam gets through, consider adding a CAPTCHA (e.g. Cloudflare Turnstile) or a rate limit.
