# Changelog

All notable changes to Gazeta are documented here.

## 2.0.0 - 2026-11-05

- Design overhaul: a modern front page, article pages, archives, menus, and footer, with rounded photography and pill navigation and tags.
- Source Serif 4 and Geist fonts, self-hosted.
- The masthead shows the reader's current date.
- Smaller masthead wordmark.
- Removed the RSS and Subscribe links from the header.
- Removed eyebrow labels above section headings.
- Author photos on bylines, author cards, and the about page masthead.
- Share sheet for articles, with the device's native share sheet on phones.
- In-article photos with captions.
- Photo lightbox on article pages.
- Four story layouts (standard, banner, cover, and immersive), with a Layouts menu in the header.
- Search palette opened with the search icon, Ctrl/Cmd + K, or /, and a search results page.
- Contact form with a details column, and a redesigned about page with a newsroom photo.
- Sections are now World, Politics, Business, Technology, Science, Culture, and Sport.
- New demo stories with Unsplash and Pexels photography.
- Updated Astro to 7.4.5 and other dependencies.

## 1.1.1 - 2026-10-21

- Updated Astro to 7.4.1 and other dependencies.
- Updated `AGENTS.md` for Astro 7.
- Files check out with LF line endings on every platform.
- Added the build command to `wrangler.jsonc`.

## 1.1.0 - 2026-07-16

- Upgraded Astro and related tooling to the current Astro 7 release line, including Vite 8 support.
- Added lightweight header search powered by a generated `/search-index.json` endpoint and lazy-loaded client-side title filtering.
- Added an inline desktop search takeover in the masthead controls and a mobile search field above category navigation.
- Tightened sticky sidebar spacing on category and post pages so rails sit closer to the viewport while scrolling.
- Refined post page typography with bolder article section headings and a slightly wider, smaller article hero title.
- Updated Cloudflare Worker config formatting for the current project formatter.

## 1.0.0 - 2026-06-30

- Initial commercial release.
- Added Astro 7 magazine templates for home, posts, categories, tags, paginated archives, RSS, robots, sitemap, 404, about, contact, and privacy pages.
- Added typed content collections, centralized categories, SEO metadata, Open Graph, Twitter/X cards, and JSON-LD.
- Added light/dark color mode, accessible mobile navigation, newsletter configuration, ad slots, and responsive Astro images.
