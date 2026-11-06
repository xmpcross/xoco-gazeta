# Customization Guide

Use this guide when adapting Gazeta for a real publication.

## Site Settings

Edit [src/config/site.ts](./src/config/site.ts) first. It controls the site name, tagline, default metadata, canonical domain, contact email, locale, social links, and newsletter form settings.

Update `siteConfig.siteUrl` before building for production. Canonical URLs, social image URLs, RSS, robots, sitemap, and JSON-LD all depend on it.

## Categories

Categories live in one place: [src/config/categories.ts](./src/config/categories.ts). Add, remove, or rename categories there, then update posts so every `category` frontmatter value still matches the allowed list.

Header, mobile, and footer navigation are generated from that list. The front page picks its section blocks by name in [src/pages/index.astro](./src/pages/index.astro) (Business, Science, Sport, Culture, and the World, Politics, and Technology lists); change those names there if you rename a section.

## Header and Date

The masthead in [src/components/SiteHeader.astro](./src/components/SiteHeader.astro) shows the reader's current date next to the tagline on desktop and under the wordmark on mobile. The date is written in the browser when the page loads, so a static build never shows a stale day. It is formatted with `siteConfig.locale`.

The Layouts menu at the end of the section links lists one live example of each story layout (see below). Below 1024px the section links become a row of pills that scrolls sideways, and the menu button opens a full-screen panel with search, sections, and page links.

## Post Frontmatter

Posts live in [src/content/posts](./src/content/posts), one folder per story with an `index.md` and its images:

```yaml
title: "Story title"
excerpt: "Short summary for cards and metadata."
category: "World"
date: 2026-11-04
readMinutes: 4
author:
  name: "Luc Moreau"
  role: "Foreign correspondent"
tags:
  - "climate"
cover:
  src: ./cover.jpg
  alt: "Useful image description"
  creditName: "Photographer on Unsplash"
  creditUrl: "https://unsplash.com/photos/..."
heroLayout: "standard"
trending: false
draft: false
```

- `tags` defaults to an empty list.
- `heroLayout` defaults to `"standard"`; see Story Layouts.
- `trending` defaults to `false`; trending stories lead the Top stories list on the front page.
- `draft` defaults to `false`; set it to `true` to hide a post from every page, RSS, and search.

## Story Layouts

Each story picks its opening with `heroLayout`:

| Layout      | Shape                                                 |
| ----------- | ----------------------------------------------------- |
| `standard`  | Centered headline, then a wide photo (the default)    |
| `banner`    | Wide photo first, then the headline below it          |
| `cover`     | Framed photo with the headline and byline set on it   |
| `immersive` | Full-screen photo running behind a transparent header |

All four render from [src/components/PostHero.astro](./src/components/PostHero.astro) and share [src/components/PostHeroHead.astro](./src/components/PostHeroHead.astro), so a change to the headline, standfirst, or byline applies to every layout. For `immersive`, the article page passes `overlay` to [src/components/SiteHeader.astro](./src/components/SiteHeader.astro), which lays the header over the photo with light text. `cover` and `immersive` set white text on a dark gradient, so pick photos with a calm lower half.

The header's Layouts menu and the mobile menu link to the newest story using each layout. Layouts no story uses are left out, so there is nothing to maintain by hand.

## In-Article Photos

Put the image in the post folder and reference it on its own line. An italic line straight after it is styled as the caption:

```md
![Pack ice around a cargo ship](./scene.jpg)

_Pack ice can close around a ship within hours. Photo: Name / Unsplash_
```

Astro optimizes the image at build time. On wide screens the photo runs slightly wider than the text column.

The cover and every in-article photo open full size in a lightbox from [src/components/Lightbox.astro](./src/components/Lightbox.astro) when clicked, or with Enter when focused. Click anywhere, press Esc, or use the close button to dismiss it.

## Authors and Photos

Bylines are plain frontmatter; there is no author collection. Author photos come from [src/assets/authors](./src/assets/authors): a photo named after the byline's slug, such as `amara-okoye.jpg` for "Amara Okoye", appears on cards, the article byline, the author card under the story, and the masthead on the about page. Square images of at least 240px work best. Anyone without a photo gets their initial in a circle.

The bundled portraits are demo images from Pexels, credited in the folder's `CREDITS.md`. Replace them with your own contributors.

## Sharing

The Share pill under the article headline and the share card at the end of the story open [src/components/ShareSheet.astro](./src/components/ShareSheet.astro): a dialog with X, Facebook, LinkedIn, WhatsApp, email, Bluesky, and Threads, a More reveal for Telegram, Reddit, and Pinterest, and a copy-link field. On phones and tablets the button opens the device's own share sheet instead. Both stay hidden until the script runs, so nothing renders that cannot work.

To change the networks, edit the `targets` and `extraTargets` lists in `ShareSheet.astro`.

## Contact Form

[src/pages/contact.astro](./src/pages/contact.astro) posts to `siteConfig.contact.action`. While that is empty, the form renders disabled with a note explaining why, so it never silently drops a message:

```ts
contact: {
  action: "https://example.com/contact",
  method: "post",
  topics: ["News tip", "Correction", "Advertising", "Newsletter", "Something else"],
  address: ["48 Fleet Row", "London EC4A 2BB, United Kingdom"],
  phone: "+44 20 7946 0123",
  responseTime: "We reply within two business days.",
}
```

`topics` fills the topic selector. The desks listed beside the form are plain markup in that page; edit them directly.

## Newsletter

The newsletter form is intentionally provider-neutral. Configure it in `siteConfig.newsletter`:

```ts
newsletter: {
  action: "https://example.com/newsletter",
  method: "post",
  emailFieldName: "email",
  title: "The morning edition, in your inbox.",
  description: "Five stories worth your time, picked by our editors every weekday before breakfast.",
}
```

Leave `action` empty while the form is only a visual starter. For production, connect it to your email provider or replace [src/components/NewsletterSignup.astro](./src/components/NewsletterSignup.astro) with provider-specific markup.

## Search

Search is a command palette in [src/components/SearchDialog.astro](./src/components/SearchDialog.astro), opened with the search icon, `Ctrl`/`Cmd + K`, or `/`. It fetches `/search-index.json` on first open and ranks title prefixes above titles, sections, tags, then excerpts and bylines. Arrow keys move through results, and Enter on the input opens the full results page.

[src/pages/search.astro](./src/pages/search.astro) is that results page. It inlines the whole index, so it works without JavaScript support for dialogs and doubles as a link target such as `/search/?q=climate`.

The index fields come from `searchItem()` in [src/lib/posts.ts](./src/lib/posts.ts), shared by the endpoint, the palette's fallback, and the search page.

## Ads

[src/components/AdSlot.astro](./src/components/AdSlot.astro) is a placeholder you can drop into any page. Replace its content with your ad provider, sponsorship copy, or house ads. Keep labels visible and avoid layout shifts from late-loading third-party scripts.

## Images

Covers and in-article photos sit next to each Markdown file. Each needs useful alt text, and each cover needs a credit. Astro optimizes them during build, but source images should still be reasonably sized; the demo photos are 2000px wide.

## Icons

Social and share icons are hosted locally in [src/icons/bootstrap](./src/icons/bootstrap) and rendered through [src/components/LocalIcon.astro](./src/components/LocalIcon.astro). To add a network, add its SVG to that folder, register it in `LocalIcon.astro`, then use it where the link is rendered.

The bundled SVGs come from Bootstrap Icons and include their MIT license notice in the icon folder.

## Pages

Core static pages live in [src/pages](./src/pages):

- `about.astro`, with a newsroom photo, counts taken from your content, and a masthead built from the bylines on your posts. The photo lives in [src/assets/pages](./src/assets/pages) with its credit.
- `contact.astro`, with the contact form and details
- `privacy.astro`

Replace the starter copy with publication-specific information.

## Fonts

Two variable fonts are self-hosted in [public/fonts](./public/fonts), each as latin and latin-ext `woff2` files with its SIL Open Font License notice alongside:

- **Source Serif 4** sets the wordmark, headlines, and article copy through `--font-display`. Its latin file is preloaded in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro).
- **Geist** sets the interface, meta lines, and excerpts through `--font-sans`.

To swap a typeface, replace its `@font-face` rules and the matching token at the top of [src/styles/global.css](./src/styles/global.css).

## Theme Tokens

Colors, the accent, radii, layout widths, focus styles, dark mode, and motion live at the top of [src/styles/global.css](./src/styles/global.css). Shared classes such as `.pill`, `.media`, `.headline`, and `.meta` sit below the tokens. Prefer editing tokens before changing individual components. The default color mode is set in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro).
