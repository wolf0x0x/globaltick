# GlobalTick

GlobalTick is a static, multilingual global holidays and events calendar for `globaltick.xyz`.

## Features

- 2026 global holiday calendar, country explorer, monthly pages, holiday detail pages, marketing calendar, countdowns, sports, movies, technology events, horoscope, today-in-history, comparison, about, and privacy/newsletter pages.
- Seven UI languages: English, Español, Português, Français, Deutsch, 日本語, 中文.
- SEO/GEO support: canonical URLs, hreflang alternates, Open Graph, JSON-LD, sitemap, robots.txt, and localized metadata.
- Google Analytics tag `G-7D6SE08345` and AdSense `ads.txt`.
- Static build output in `dist/`, deployable by GitHub Pages Actions.

## Build

```bash
npm run build
```

Preview:

```bash
npm run serve
```

## Data Sources

- Public holidays: Nager.Date API (`https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}`)
- Supplemental holiday/school holiday reference: OpenHolidays API (`https://www.openholidaysapi.org/`)
- Event entity and history reference: Wikidata (`https://www.wikidata.org/wiki/Wikidata:Data_access`)
- Movie page uses curated seed data; TMDB can be connected later with a private API key.
