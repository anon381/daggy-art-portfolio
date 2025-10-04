# Daggy Art Portfolio

A modern portfolio site for Dagil Arts showcasing custom murals and canvas paintings. The design takes inspiration from architectural materials and earth tones, with both light and dark themes supported.

Live demo: https://daggy-art-portfolio.vercel.app/

Key features:

- Elegant hero and portfolio gallery
- Centered navigation: Portfolio, About, Testimonials, Pricing, Contact
- Light/dark theme toggle in the header
- Tailwind CSS with custom global styles in `app/globals.css`

If you want screenshots, deployment steps, or contributing instructions added here, tell me what to include and I'll update the README.

# Daggy Art Portfolio

Modern architectural inspired portfolio for Dagil Arts — murals, canvases and custom commissions.

Live demo: https://daggy-art-portfolio.vercel.app/

## Quick start (Windows / PowerShell)

This project uses pnpm (the repository contains a `pnpm-lock.yaml`). If you don't have pnpm installed you can enable it via Corepack (recommended) or install it with npm.

1. Install/enable pnpm (Corepack):

```powershell
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
```

Or install pnpm via npm:

```powershell
npm install -g pnpm
pnpm -v
```

2. Install dependencies and run the dev server:

```powershell
pnpm install
pnpm dev
```

3. Build for production and start:

```powershell
pnpm build
pnpm start
```

## Project details

- Framework: Next.js 14
- Package manager: pnpm
- Styling: Tailwind CSS + custom global styles in `app/globals.css`
- Theme: `next-themes` is used. A theme toggle is available in the header to switch light/dark.

## Notes

- Header nav (Portfolio, About, Testimonials, Pricing, Contact) is centered. Links are black in light mode and white in dark mode.
- The header "Request a Quote" CTA was removed as requested.

If you want deployment help, a CI workflow, or additional documentation, tell me which and I will add it.
