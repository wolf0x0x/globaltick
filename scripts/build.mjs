import { mkdir, rm, writeFile, cp } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const site = "https://globaltick.xyz";
const year = 2026;
const adsText = "google.com, pub-8695398658548679, DIRECT, f08c47fec0942fa0\n";

const languages = {
  en: { label: "English", flag: "🇺🇸", locale: "en-US", dir: "", nav: ["Home", "2026 Calendar", "Countries", "Marketing", "Countdowns", "Sports", "Movies", "Tech", "History", "About"], search: "Search holidays, countries, dates, and events", cta: "Add to calendar", share: "Share", all: "All" },
  es: { label: "Español", flag: "🇪🇸", locale: "es-ES", dir: "es", nav: ["Inicio", "Calendario 2026", "Países", "Marketing", "Cuenta atrás", "Deportes", "Películas", "Tecnología", "Historia", "Acerca de"], search: "Buscar festivos, países, fechas y eventos", cta: "Añadir al calendario", share: "Compartir", all: "Todo" },
  pt: { label: "Português", flag: "🇵🇹", locale: "pt-PT", dir: "pt", nav: ["Início", "Calendário 2026", "Países", "Marketing", "Contagens", "Esportes", "Filmes", "Tecnologia", "História", "Sobre"], search: "Buscar feriados, países, datas e eventos", cta: "Adicionar ao calendário", share: "Compartilhar", all: "Tudo" },
  fr: { label: "Français", flag: "🇫🇷", locale: "fr-FR", dir: "fr", nav: ["Accueil", "Calendrier 2026", "Pays", "Marketing", "Comptes à rebours", "Sports", "Films", "Tech", "Histoire", "À propos"], search: "Rechercher fêtes, pays, dates et événements", cta: "Ajouter au calendrier", share: "Partager", all: "Tout" },
  de: { label: "Deutsch", flag: "🇩🇪", locale: "de-DE", dir: "de", nav: ["Start", "Kalender 2026", "Länder", "Marketing", "Countdowns", "Sport", "Filme", "Tech", "Geschichte", "Über"], search: "Feiertage, Länder, Daten und Events suchen", cta: "Zum Kalender", share: "Teilen", all: "Alle" },
  ja: { label: "日本語", flag: "🇯🇵", locale: "ja-JP", dir: "ja", nav: ["ホーム", "2026年カレンダー", "国別祝日", "マーケティング", "カウントダウン", "スポーツ", "映画", "テック", "今日は何の日", "概要"], search: "祝日、国、日付、イベントを検索", cta: "カレンダーに追加", share: "共有", all: "すべて" },
  zh: { label: "中文", flag: "🇨🇳", locale: "zh-CN", dir: "zh", nav: ["首页", "2026日历", "国家节日", "营销日历", "倒计时", "赛事", "电影", "科技", "历史今日", "关于"], search: "搜索节日、国家、日期或事件", cta: "添加到日历", share: "分享", all: "全部" }
};

const pageDefs = [
  ["index", "", "home"],
  ["2026-calendar", "2026-calendar.html", "calendar"],
  ["countries", "countries.html", "countries"],
  ["marketing-calendar", "marketing-calendar.html", "marketing"],
  ["countdowns", "countdowns.html", "countdowns"],
  ["sports-events", "sports-events.html", "sports"],
  ["movie-releases", "movie-releases.html", "movies"],
  ["tech-events", "tech-events.html", "tech"],
  ["today-in-history", "today-in-history.html", "history"],
  ["horoscope", "horoscope.html", "horoscope"],
  ["compare", "compare.html", "compare"],
  ["about", "about.html", "about"],
  ["privacy", "privacy.html", "privacy"]
];

const countries = [
  { code: "US", flag: "🇺🇸", name: "United States", continent: "Americas", holidays: 11, next: "Juneteenth", date: "2026-06-19" },
  { code: "CN", flag: "🇨🇳", name: "China", continent: "Asia", holidays: 13, next: "Spring Festival", date: "2026-02-17" },
  { code: "IN", flag: "🇮🇳", name: "India", continent: "Asia", holidays: 18, next: "Diwali", date: "2026-11-08" },
  { code: "GB", flag: "🇬🇧", name: "United Kingdom", continent: "Europe", holidays: 8, next: "Summer Bank Holiday", date: "2026-08-31" },
  { code: "DE", flag: "🇩🇪", name: "Germany", continent: "Europe", holidays: 10, next: "German Unity Day", date: "2026-10-03" },
  { code: "FR", flag: "🇫🇷", name: "France", continent: "Europe", holidays: 11, next: "Bastille Day", date: "2026-07-14" },
  { code: "JP", flag: "🇯🇵", name: "Japan", continent: "Asia", holidays: 16, next: "Marine Day", date: "2026-07-20" },
  { code: "BR", flag: "🇧🇷", name: "Brazil", continent: "Americas", holidays: 12, next: "Independence Day", date: "2026-09-07" },
  { code: "CA", flag: "🇨🇦", name: "Canada", continent: "Americas", holidays: 10, next: "Canada Day", date: "2026-07-01" },
  { code: "AU", flag: "🇦🇺", name: "Australia", continent: "Oceania", holidays: 10, next: "King's Birthday", date: "2026-06-08" },
  { code: "MX", flag: "🇲🇽", name: "Mexico", continent: "Americas", holidays: 8, next: "Independence Day", date: "2026-09-16" },
  { code: "ZA", flag: "🇿🇦", name: "South Africa", continent: "Africa", holidays: 12, next: "Heritage Day", date: "2026-09-24" }
];

const holidays = [
  { slug: "new-years-day-2026", name: "New Year's Day", local: "Año Nuevo / 元旦", date: "2026-01-01", type: "Public", countries: "Global", icon: "🎆", summary: "A global start-of-year public holiday observed by businesses, schools, and governments in many countries." },
  { slug: "spring-festival-2026", name: "Spring Festival", local: "春节", date: "2026-02-17", type: "Cultural", countries: "China, Singapore, global Chinese communities", icon: "🧧", summary: "The Lunar New Year period centered on family reunions, travel, red envelopes, and seasonal commerce." },
  { slug: "easter-2026", name: "Easter Sunday", local: "Pascua / Pâques / Ostern", date: "2026-04-05", type: "Religious", countries: "Christian-majority regions", icon: "🌷", summary: "A major Christian observance with public holidays in many countries across Europe, the Americas, Oceania, and Africa." },
  { slug: "eid-al-adha-2026", name: "Eid al-Adha", local: "عيد الأضحى", date: "2026-05-27", type: "Religious", countries: "Muslim-majority countries", icon: "🕌", summary: "A major Islamic holiday connected with pilgrimage season, family gatherings, charity, and local public closures." },
  { slug: "fathers-day-2026", name: "Father's Day", local: "Día del Padre / 父亲节", date: "2026-06-21", type: "Cultural", countries: "US, UK, Canada, India and more", icon: "👔", summary: "A family and gifting observance that creates strong retail, restaurant, travel, and content planning demand." },
  { slug: "diwali-2026", name: "Diwali", local: "दीवाली", date: "2026-11-08", type: "Religious", countries: "India, Nepal, Singapore, diaspora communities", icon: "🪔", summary: "The festival of lights, an important religious, cultural, travel, gifting, and retail period." },
  { slug: "thanksgiving-2026", name: "Thanksgiving Day", local: "Thanksgiving", date: "2026-11-26", type: "Public", countries: "United States", icon: "🦃", summary: "A US public holiday that starts the peak holiday retail period before Black Friday and Cyber Monday." },
  { slug: "christmas-2026", name: "Christmas Day", local: "Navidad / Noël / Weihnachten", date: "2026-12-25", type: "Public", countries: "Global", icon: "🎄", summary: "A major global public holiday and one of the largest travel, retail, family, and religious periods of the year." }
];

const marketing = [
  ["Valentine's Day", "2026-02-14", "Holiday retail", "Gift, restaurant, floral, travel, and experience campaigns."],
  ["Ramadan begins", "2026-02-18", "Cultural planning", "Community, food, gifting, and evening commerce calendars."],
  ["Mother's Day", "2026-05-10", "Holiday retail", "A high-intent gifting and family dining period in many markets."],
  ["618 Shopping Festival", "2026-06-18", "Ecommerce", "China-centered mid-year ecommerce planning window."],
  ["Back to School", "2026-08-15", "Retail season", "Supplies, apparel, tech, and family purchase planning."],
  ["Singles' Day", "2026-11-11", "Ecommerce", "Large Asia-centered shopping festival with global spillover."],
  ["Black Friday", "2026-11-27", "Ecommerce", "Peak promotional event following US Thanksgiving."],
  ["Cyber Monday", "2026-11-30", "Ecommerce", "Digital commerce and subscription offer planning."],
  ["Christmas", "2026-12-25", "Holiday retail", "Global travel, gifting, hospitality, and faith calendars."]
];

const countdowns = [
  { name: "FIFA World Cup 2026", date: "2026-06-11", place: "United States, Canada, Mexico", category: "Sports", icon: "🏆" },
  { name: "Milan Cortina Winter Olympics", date: "2026-02-06", place: "Italy", category: "Sports", icon: "🥇" },
  { name: "Apple WWDC 2026", date: "2026-06-08", place: "Cupertino / online", category: "Tech", icon: "🍎" },
  { name: "US Midterm Elections", date: "2026-11-03", place: "United States", category: "Civic", icon: "🗳️" },
  { name: "Black Friday 2026", date: "2026-11-27", place: "Global retail", category: "Marketing", icon: "🛒" },
  { name: "Christmas 2026", date: "2026-12-25", place: "Global", category: "Holiday", icon: "🎄" }
];

const sports = [
  ["FIFA World Cup 2026", "2026-06-11", "2026-07-19", "United States, Canada, Mexico", "48 teams, 104 matches, 16 host cities"],
  ["Milan Cortina Winter Olympics", "2026-02-06", "2026-02-22", "Italy", "Winter sports, opening ceremony, medal schedule"],
  ["Australian Open", "2026-01-12", "2026-01-25", "Melbourne", "Tennis Grand Slam opening the season"],
  ["Monaco Grand Prix", "2026-05-24", "2026-05-24", "Monaco", "Formula 1 marquee street race"],
  ["Wimbledon", "2026-06-29", "2026-07-12", "London", "Grass-court tennis Grand Slam"]
];

const tech = [
  ["CES 2026", "2026-01-06", "Las Vegas", "Consumer electronics, mobility, smart home, AI hardware"],
  ["Google I/O 2026", "2026-05-12", "Mountain View / online", "Android, Gemini, cloud and developer tooling"],
  ["Microsoft Build 2026", "2026-05-19", "Seattle / online", "Windows, Azure, AI and developer platform updates"],
  ["Apple WWDC 2026", "2026-06-08", "Cupertino / online", "iOS, macOS, watchOS, visionOS and developer sessions"],
  ["Apple September Event", "2026-09-08", "Cupertino / online", "Expected iPhone, Watch and ecosystem launches"]
];

const movies = [
  ["Toy Story 5", "2026-06-19", "Animation", "Disney / Pixar"],
  ["The Odyssey", "2026-07-17", "Epic", "Universal"],
  ["Moana Live Action", "2026-07-10", "Adventure", "Disney"],
  ["Jumanji 4", "2026-12-11", "Adventure comedy", "Sony"],
  ["Untitled Star Wars Film", "2026-05-22", "Sci-fi", "Lucasfilm"]
];

const history = [
  ["1815", "Battle of Waterloo", "Napoleon was defeated near Waterloo, reshaping European politics."],
  ["1983", "Sally Ride in space", "Sally Ride became the first American woman in space aboard Challenger."],
  ["1940", "Appeal of 18 June", "Charles de Gaulle broadcast a call for French resistance from London."],
  ["1979", "SALT II signed", "The United States and Soviet Union signed the strategic arms limitation treaty."]
];

const zodiac = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

function fmt(date, lang = "en") {
  return new Intl.DateTimeFormat(languages[lang].locale, { year: "numeric", month: "short", day: "numeric" }).format(new Date(`${date}T12:00:00Z`));
}

function hrefFor(lang, route) {
  const dir = languages[lang].dir;
  const leaf = route || "index.html";
  if (!dir) return `/${leaf}`;
  return `/${dir}/${leaf}`;
}

function canonical(lang, route) {
  const h = hrefFor(lang, route);
  return `${site}${h === "/index.html" ? "/" : h}`;
}

function assetPrefix(lang, route) {
  const routeDepth = route ? route.split("/").length - 1 : 0;
  const langDepth = languages[lang].dir ? 1 : 0;
  return "../".repeat(routeDepth + langDepth);
}

function nav(lang, active, currentRoute) {
  const l = languages[lang];
  const links = [
    ["index", "", l.nav[0]], ["2026-calendar", "2026-calendar.html", l.nav[1]], ["countries", "countries.html", l.nav[2]],
    ["marketing-calendar", "marketing-calendar.html", l.nav[3]], ["countdowns", "countdowns.html", l.nav[4]], ["sports-events", "sports-events.html", l.nav[5]],
    ["movie-releases", "movie-releases.html", l.nav[6]], ["tech-events", "tech-events.html", l.nav[7]], ["today-in-history", "today-in-history.html", l.nav[8]], ["about", "about.html", l.nav[9]]
  ];
  return `<header class="topbar"><a class="brand" href="${hrefFor(lang, "")}"><span>◎</span><strong>GlobalTick</strong></a><button class="menu" aria-label="Menu">☰</button><nav class="nav">${links.map(([id, route, label]) => `<a class="${active === id ? "active" : ""}" href="${hrefFor(lang, route)}">${label}</a>`).join("")}</nav><select class="lang" aria-label="Language">${Object.entries(languages).map(([code, meta]) => `<option value="${canonical(code, currentRoute)}" ${code === lang ? "selected" : ""}>${meta.flag} ${code.toUpperCase()}</option>`).join("")}</select></header>`;
}

function layout({ lang, route, active, title, description, body, jsonLd = [] }) {
  const alternates = `${Object.keys(languages).map(code => `<link rel="alternate" hreflang="${code}" href="${canonical(code, route)}">`).join("\n")}\n<link rel="alternate" hreflang="x-default" href="${canonical("en", route)}">`;
  const data = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  const assets = assetPrefix(lang, route);
  return `<!doctype html>
<html lang="${lang === "ja" ? "ja" : lang}">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7D6SE08345"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-7D6SE08345');</script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="geo.region" content="001">
<meta name="geo.placename" content="Global">
<link rel="canonical" href="${canonical(lang, route)}">
${alternates}
<meta property="og:site_name" content="GlobalTick">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical(lang, route)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="${assets}assets/main.css">
${data.map(item => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n")}
</head>
<body>
${nav(lang, active, route)}
<main>${body}</main>
<footer><div><strong>GlobalTick</strong><p>Global holidays, marketing dates, sports, entertainment, tech events and countdowns for 2026.</p></div><div class="footer-links"><a href="${hrefFor(lang, "about.html")}">About</a><a href="${hrefFor(lang, "privacy.html")}">Privacy</a><a href="/sitemap.xml">Sitemap</a><a href="https://github.com/wolf0x0x/globaltick">GitHub</a></div><p class="fine">Data references: Nager.Date, OpenHolidays, Wikidata, curated public event calendars. © 2026 GlobalTick.</p></footer>
<script src="${assets}assets/app.js"></script>
</body>
</html>`;
}

function hero(title, text, lang) {
  return `<section class="hero"><div><p class="eyebrow">globaltick.xyz</p><h1>${title}</h1><p>${text}</p><form class="search" role="search"><span>⌕</span><input data-search placeholder="${languages[lang].search}"><div class="suggestions" data-suggestions></div></form></div><div class="hero-panel"><b>2026</b><span>Public holidays · Events · Countdown intelligence</span></div></section>`;
}

function cards(items) {
  return `<div class="grid cards">${items.map(x => `<article class="card ${x.class || ""}">${x.icon ? `<span class="icon">${x.icon}</span>` : ""}<h3>${x.title}</h3><p>${x.text}</p>${x.link ? `<a class="text-link" href="${x.link}">${x.label || "Open"}</a>` : ""}</article>`).join("")}</div>`;
}

function home(lang) {
  return `${hero("2026 Global Holidays & Events Calendar", "Explore public holidays in 100+ countries, ecommerce dates, sports tournaments, movie releases, tech launches, cultural observances and live countdowns.", lang)}
  <section class="today"><article><b>Today</b><span>June 18</span></article><article><b>Marketing</b><span>618 Shopping Festival</span></article><article><b>Countdown</b><span>World Cup 2026</span></article><article><b>History</b><span>Waterloo · Sally Ride</span></article></section>
  <section><h2>Quick Access</h2>${cards([
    { icon: "🗓️", title: "2026 Calendar", text: "Scan the full year with holiday dots and monthly drilldowns.", link: hrefFor(lang, "2026-calendar.html") },
    { icon: "🌍", title: "Country Holidays", text: "Browse country cards, continents and next public holidays.", link: hrefFor(lang, "countries.html") },
    { icon: "🛒", title: "Marketing Calendar", text: "Plan ecommerce, retail and cultural campaign windows.", link: hrefFor(lang, "marketing-calendar.html") },
    { icon: "⏳", title: "Countdown Center", text: "Live timers for major global moments.", link: hrefFor(lang, "countdowns.html") }
  ])}</section>
  <section><h2>Featured Countdowns</h2>${countdownGrid(lang, countdowns.slice(0, 4))}</section>
  <section><h2>This Month</h2>${eventList(holidays.filter(h => h.date.startsWith("2026-06")), lang)}</section>
  <section class="map-band"><h2>Global Signals</h2><p>Americas retail and civic calendars, Europe school and bank holiday coverage, Asia cultural festivals, Africa and Oceania public holiday planning.</p><div class="world-map" aria-label="World map">● ● ● ● ● ● ●</div></section>`;
}

function calendarPage(lang) {
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  return `${hero("2026 Full-Year Calendar", "A dense 12-month planning grid with public holiday, religious, cultural, sports, marketing and tech markers.", lang)}
  <section class="toolbar"><select><option>All countries</option>${countries.map(c => `<option>${c.name}</option>`)}</select><select><option>All types</option><option>Public</option><option>Religious</option><option>Cultural</option><option>Marketing</option></select></section>
  <section class="months">${months.map(d => monthBlock(d.getMonth(), lang)).join("")}</section>
  <section class="legend"><span><i class="dot public"></i>Public</span><span><i class="dot religious"></i>Religious</span><span><i class="dot cultural"></i>Cultural</span><span><i class="dot marketing"></i>Marketing</span><span><i class="dot sports"></i>Sports</span></section>`;
}

function monthBlock(month, lang) {
  const d = new Date(year, month, 1);
  const name = new Intl.DateTimeFormat(languages[lang].locale, { month: "long" }).format(d);
  const first = d.getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: first }, () => `<span></span>`).concat(Array.from({ length: days }, (_, idx) => {
    const day = idx + 1;
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const hit = holidays.find(h => h.date === iso) || marketing.find(m => m[1] === iso);
    return `<a href="${hrefFor(lang, `month/2026-${String(month + 1).padStart(2, "0")}.html`)}" class="${hit ? "has-event" : ""}" title="${hit?.name || hit?.[0] || ""}">${day}</a>`;
  }));
  return `<article class="month"><h3>${name}</h3><div class="week"><b>S</b><b>M</b><b>T</b><b>W</b><b>T</b><b>F</b><b>S</b></div><div class="days">${cells.join("")}</div></article>`;
}

function countriesPage(lang) {
  return `${hero("Country Holidays Explorer", "Explore public holidays and cultural observances by country, continent and month.", lang)}
  <section class="toolbar"><input data-country-filter placeholder="Search country"><select><option>All continents</option><option>Asia</option><option>Europe</option><option>Americas</option><option>Africa</option><option>Oceania</option></select></section>
  <section class="country-grid">${countries.map(c => `<article class="card country" data-country="${c.name} ${c.continent} ${c.code}"><span class="flag">${c.flag}</span><h3>${c.name}</h3><p>${c.next} · ${fmt(c.date, lang)}</p><b>${c.holidays} public holidays</b><a class="text-link" href="${hrefFor(lang, `country/${c.code.toLowerCase()}.html`)}">Open ${c.code}</a></article>`).join("")}</section>
  <section><h2>Popular Comparisons</h2>${cards([{ title: "Spring Festival vs Diwali vs Thanksgiving", text: "Compare dates, rituals, travel pressure and marketing impact.", link: hrefFor(lang, "compare.html") }])}</section>`;
}

function marketingPage(lang) {
  return `${hero("2026 Global Marketing Calendar", "Plan ecommerce, campaign launches, gifting windows and retail operations around global demand peaks.", lang)}
  <section class="timeline">${marketing.map(m => `<article><time>${fmt(m[1], lang)}</time><h3>${m[0]}</h3><b>${m[2]}</b><p>${m[3]}</p></article>`).join("")}</section>
  <section><h2>Campaign Windows</h2>${eventList(marketing.map(m => ({ name: m[0], date: m[1], type: "Marketing", countries: m[2], summary: m[3], icon: "🛒", slug: "black-friday-2026" })), lang)}</section>`;
}

function countdownGrid(lang, items = countdowns) {
  return `<div class="grid countdowns">${items.map(c => `<article class="card countdown" data-countdown="${c.date}"><span class="icon">${c.icon}</span><p>${c.category}</p><h3>${c.name}</h3><div class="timer"><b data-days>--</b><span>days</span><b data-hours>--</b><span>hrs</span></div><p>${fmt(c.date, lang)} · ${c.place}</p><button data-ics="${c.name}|${c.date}|${c.place}">${languages[lang].cta}</button></article>`).join("")}</div>`;
}

function countdownPage(lang) {
  return `${hero("Major Event Countdown Center", "Live countdowns for sports, technology, civic, retail and holiday events.", lang)}
  <section class="featured">${countdownGrid(lang, countdowns.slice(0, 1))}</section><section><h2>All Countdowns</h2>${countdownGrid(lang)}</section>`;
}

function eventList(items, lang) {
  return `<div class="list">${items.map(h => `<article><time>${fmt(h.date, lang)}</time><div><h3>${h.icon || "•"} ${h.name}</h3><p>${h.summary}</p><span class="pill ${String(h.type).toLowerCase()}">${h.type}</span><span class="muted">${h.countries}</span></div><a href="${hrefFor(lang, `holiday/${h.slug || "fathers-day-2026"}.html`)}">Details</a></article>`).join("")}</div>`;
}

function sportsPage(lang) {
  return `${hero("2026 Global Sports Events Calendar", "Track tournaments, finals, ceremonies and high-interest sports moments.", lang)}
  <section class="list">${sports.map(s => `<article><time>${fmt(s[1], lang)}</time><div><h3>🏆 ${s[0]}</h3><p>${fmt(s[1], lang)} - ${fmt(s[2], lang)} · ${s[3]}</p><span class="pill sports">${s[4]}</span></div></article>`).join("")}</section>`;
}

function moviesPage(lang) {
  return `${hero("2026 Global Movie Release Calendar", "A static seed calendar for notable 2026 releases, ready for TMDB enrichment when an API key is available.", lang)}
  <section class="movie-grid">${movies.map((m, i) => `<article class="card poster"><div class="poster-art p${i}">${m[0].split(" ").map(w => w[0]).join("")}</div><h3>${m[0]}</h3><p>${fmt(m[1], lang)}</p><span class="pill">${m[2]}</span><small>${m[3]}</small></article>`).join("")}</section>`;
}

function techPage(lang) {
  return `${hero("2026 Technology Events Calendar", "Developer conferences, hardware launches and platform events in one planning view.", lang)}
  <section class="list">${tech.map(t => `<article><time>${fmt(t[1], lang)}</time><div><h3>⌘ ${t[0]}</h3><p>${t[2]}</p><span class="pill tech">${t[3]}</span></div></article>`).join("")}</section>`;
}

function historyPage(lang) {
  return `${hero("Today in History", "Daily historical context for content planning, education, newsletters and social calendars.", lang)}
  <section class="history">${history.map(h => `<article><b>${h[0]}</b><h3>${h[1]}</h3><p>${h[2]}</p></article>`).join("")}</section>`;
}

function horoscopePage(lang) {
  return `${hero("Daily Horoscope Calendar", "A lightweight discovery page for zodiac and Chinese zodiac planning content.", lang)}
  <section class="zodiac">${zodiac.map((z, i) => `<article class="card"><span class="icon">${["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"][i]}</span><h3>${z}</h3><p>Focus, timing and relationship signals for today's calendar.</p><b>${"★".repeat(3 + (i % 3))}</b></article>`).join("")}</section>`;
}

function comparePage(lang) {
  return `${hero("Global Holiday Comparison", "Understand how major cultural holidays differ by timing, rituals, business closures and marketing behavior.", lang)}
  <section class="compare">${holidays.filter(h => ["spring-festival-2026", "diwali-2026", "thanksgiving-2026"].includes(h.slug)).map(h => `<article class="card"><span class="icon">${h.icon}</span><h3>${h.name}</h3><p>${fmt(h.date, lang)}</p><p>${h.summary}</p><span class="pill ${h.type.toLowerCase()}">${h.type}</span></article>`).join("")}</section>
  <section><h2>Year Timeline</h2><div class="bar">${holidays.map(h => `<span style="left:${(new Date(h.date).getMonth() / 11) * 95}%">${h.icon}</span>`).join("")}</div></section>`;
}

function aboutPage(lang) {
  return `${hero("About GlobalTick", "GlobalTick is a static, multilingual calendar for public holidays, marketing dates and global events.", lang)}
  <section><h2>Languages</h2><div class="lang-grid">${Object.entries(languages).map(([code, l]) => `<a class="card" href="${canonical(code, "")}"><span class="icon">${l.flag}</span><h3>${l.label}</h3><p>${code.toUpperCase()}</p></a>`).join("")}</div></section>
  <section><h2>Data Resources</h2><div class="list"><article><time>API</time><div><h3>Nager.Date</h3><p>Free public holiday JSON API for 100+ countries, no API key and CORS-ready.</p></div><a href="https://date.nager.at/api">Source</a></article><article><time>API</time><div><h3>OpenHolidays</h3><p>Open public and school holiday API with JSON and iCal output for supported countries.</p></div><a href="https://www.openholidaysapi.org/en/">Source</a></article><article><time>Open Data</time><div><h3>Wikidata</h3><p>Structured event, entity and history data accessible through public data interfaces.</p></div><a href="https://www.wikidata.org/wiki/Wikidata:Data_access">Source</a></article></div></section>`;
}

function privacyPage(lang) {
  return `${hero("Newsletter & Privacy", "Subscribe to weekly planning notes. The static site keeps personal data collection minimal.", lang)}
  <section class="newsletter"><form><input type="email" placeholder="you@example.com"><button>Subscribe</button></form><p>Newsletter submission requires a future email provider integration. Analytics runs through Google tag G-7D6SE08345.</p></section>
  <section><h2>Privacy Policy</h2><p>GlobalTick is a static website. It uses local browser storage for language preferences and Google Analytics for aggregate traffic measurement. It does not sell personal data.</p></section>`;
}

function monthPage(lang, month) {
  const mm = String(month).padStart(2, "0");
  const items = [...holidays, ...marketing.map(m => ({ name: m[0], date: m[1], type: "Marketing", countries: m[2], summary: m[3], icon: "🛒", slug: "black-friday-2026" }))].filter(x => x.date.startsWith(`2026-${mm}`));
  return `${hero(`2026-${mm} Global Events`, "Monthly calendar and event list for holidays, campaigns and major planning moments.", lang)}<section class="months one">${monthBlock(month - 1, lang)}</section><section><h2>Events</h2>${eventList(items, lang)}</section>`;
}

function holidayPage(lang, h) {
  return `${hero(`${h.icon} ${h.name} 2026`, `${fmt(h.date, lang)} · ${h.countries} · ${h.type}`, lang)}
  <section class="info-grid"><article class="card"><h2>Overview</h2><p>${h.summary}</p></article><article class="card"><h2>Countries & Regions</h2><p>${h.countries}</p></article><article class="card"><h2>Planning Notes</h2><p>Useful for travel, retail, local closures, content calendars and cross-border scheduling.</p></article><article class="card"><h2>Calendar Export</h2><button data-ics="${h.name}|${h.date}|${h.countries}">${languages[lang].cta}</button></article></section>
  <section><h2>Related Holidays</h2>${eventList(holidays.filter(x => x.slug !== h.slug).slice(0, 4), lang)}</section>`;
}

function countryPage(lang, c) {
  return `${hero(`${c.flag} ${c.name} Holidays 2026`, `Public holiday overview, next holiday and planning signals for ${c.name}.`, lang)}
  <section class="stats"><article><b>${c.holidays}</b><span>Public holidays</span></article><article><b>${c.continent}</b><span>Region</span></article><article><b>${fmt(c.date, lang)}</b><span>${c.next}</span></article></section>
  <section><h2>Relevant Global Holidays</h2>${eventList(holidays.slice(0, 6), lang)}</section>`;
}

const renderers = {
  home, calendar: calendarPage, countries: countriesPage, marketing: marketingPage, countdowns: countdownPage, sports: sportsPage,
  movies: moviesPage, tech: techPage, history: historyPage, horoscope: horoscopePage, compare: comparePage, about: aboutPage, privacy: privacyPage
};

const css = `:root{--bg:#f7f9fb;--surface:#fff;--navy:#1e3a5f;--ink:#191c1e;--muted:#5d6673;--line:#e0e7ef;--orange:#ff6b35;--mint:#4ecdc4;--green:#10b981;--red:#ef4444;--blue:#0ea5e9;--purple:#8b5cf6}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,"PingFang SC","Noto Sans CJK SC",sans-serif;line-height:1.55}a{color:inherit;text-decoration:none}.topbar{position:sticky;top:0;z-index:10;min-height:64px;background:rgba(255,255,255,.94);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);display:flex;align-items:center;gap:18px;padding:0 clamp(16px,4vw,48px)}.brand{display:flex;align-items:center;gap:8px;color:var(--navy);font-size:20px}.brand span{font-size:28px}.nav{display:flex;gap:4px;overflow:auto;flex:1}.nav a{font-size:14px;color:var(--muted);padding:9px 12px;border-radius:8px;white-space:nowrap}.nav a.active,.nav a:hover{background:#eaf1fb;color:var(--navy)}.lang{border:1px solid var(--line);border-radius:8px;background:#fff;padding:8px}.menu{display:none}main{max-width:1280px;margin:auto;padding:28px clamp(16px,4vw,48px) 56px}.hero{min-height:390px;display:grid;grid-template-columns:minmax(0,1.3fr) minmax(280px,.7fr);gap:28px;align-items:center;padding:36px 0 20px}.eyebrow{color:var(--orange);font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:.08em}.hero h1{font-size:clamp(34px,5vw,64px);line-height:1.02;margin:8px 0 18px;color:var(--navy);letter-spacing:0}.hero p{font-size:18px;color:var(--muted);max-width:760px}.hero-panel{min-height:260px;border-radius:8px;background:linear-gradient(135deg,#1e3a5f,#00413d);color:#fff;padding:28px;display:flex;flex-direction:column;justify-content:end;box-shadow:0 18px 40px rgba(30,58,95,.18);overflow:hidden}.hero-panel b{font-size:92px;line-height:1}.search{position:relative;margin-top:24px;max-width:720px;background:#fff;border:1px solid var(--line);border-radius:999px;display:flex;align-items:center;gap:10px;padding:12px 18px;box-shadow:0 2px 8px rgba(30,58,95,.08)}.search input{border:0;outline:0;font-size:16px;flex:1}.suggestions{position:absolute;top:56px;left:20px;right:20px;background:#fff;border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 28px rgba(30,58,95,.14);display:none;overflow:hidden}.suggestions a{display:block;padding:10px 14px;border-bottom:1px solid var(--line)}section{margin:36px 0}h2{font-size:24px;color:var(--navy);margin:0 0 16px}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.card{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:18px;box-shadow:0 2px 8px rgba(30,58,95,.08)}.card:hover{box-shadow:0 8px 24px rgba(30,58,95,.12);transform:translateY(-2px);transition:.2s}.card h3{margin:8px 0;color:var(--navy)}.card p{color:var(--muted)}.icon,.flag{font-size:34px}.text-link{color:var(--orange);font-weight:700}.today,.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.today article,.stats article{background:#fff;border:1px solid var(--line);border-radius:8px;padding:16px}.today b,.stats b{display:block;color:var(--navy)}.toolbar{display:flex;gap:12px;flex-wrap:wrap}.toolbar input,.toolbar select,.newsletter input{border:1px solid var(--line);border-radius:8px;background:#fff;padding:11px 12px;min-width:220px}.months{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.months.one{grid-template-columns:minmax(320px,480px)}.month{background:#fff;border:1px solid var(--line);border-radius:8px;padding:16px}.month h3{margin:0 0 12px;color:var(--navy)}.week,.days{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center}.week{font-size:12px;color:var(--muted);margin-bottom:8px}.days a,.days span{min-height:34px;display:grid;place-items:center;border-radius:8px;position:relative}.days a:hover{background:#edf6ff}.days a.has-event:after{content:"";width:6px;height:6px;border-radius:50%;background:var(--orange);position:absolute;bottom:3px}.legend{display:flex;gap:16px;flex-wrap:wrap}.dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px}.public{background:var(--navy)}.religious{background:var(--purple)}.cultural{background:var(--orange)}.marketing{background:var(--red)}.sports{background:var(--green)}.tech{background:var(--blue)}.country-grid,.movie-grid,.zodiac,.lang-grid,.compare{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.list{display:grid;gap:12px}.list article{display:grid;grid-template-columns:120px 1fr auto;gap:16px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:8px;padding:14px}.list time{font-weight:700;color:var(--navy)}.list h3{margin:0}.list p{margin:4px 0;color:var(--muted)}.pill{display:inline-block;border-radius:999px;background:#eef2ff;color:var(--navy);padding:4px 9px;font-size:12px;font-weight:700;margin-right:6px}.pill.public{background:#dbeafe}.pill.religious{background:#ede9fe}.pill.cultural{background:#ffedd5}.pill.marketing{background:#fee2e2}.pill.sports{background:#d1fae5}.pill.tech{background:#e0f2fe}.muted{color:var(--muted);font-size:13px}.timeline{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.timeline article,.history article{background:#fff;border-left:4px solid var(--orange);border-radius:8px;padding:16px;box-shadow:0 2px 8px rgba(30,58,95,.08)}.countdowns .timer{display:grid;grid-template-columns:auto auto auto auto;gap:6px;align-items:end}.timer b{font-size:32px;color:var(--navy)}button{border:0;background:var(--navy);color:#fff;border-radius:8px;padding:10px 14px;font-weight:700;cursor:pointer}.featured .grid{grid-template-columns:1fr}.featured .card{background:#f7fbff}.poster-art{height:230px;border-radius:8px;background:linear-gradient(135deg,#1e3a5f,#ff6b35);display:grid;place-items:center;color:#fff;font-size:38px;font-weight:800}.p1{background:linear-gradient(135deg,#002927,#4ecdc4)}.p2{background:linear-gradient(135deg,#8b5cf6,#0ea5e9)}.p3{background:linear-gradient(135deg,#ab3500,#ffb59d)}.p4{background:linear-gradient(135deg,#111827,#10b981)}.history{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.bar{height:96px;position:relative;background:#fff;border:1px solid var(--line);border-radius:8px}.bar span{position:absolute;top:34px;font-size:26px}.map-band{background:#fff;border:1px solid var(--line);border-radius:8px;padding:22px}.world-map{font-size:42px;color:var(--mint);letter-spacing:12px}.newsletter form{display:flex;gap:10px;flex-wrap:wrap}.newsletter input{flex:1}footer{border-top:1px solid var(--line);padding:28px clamp(16px,4vw,48px);background:#fff;color:var(--muted)}footer strong{color:var(--navy)}.footer-links{display:flex;gap:14px;flex-wrap:wrap;margin:12px 0}.fine{font-size:12px}.lang-grid a{display:block}@media(max-width:900px){.hero{grid-template-columns:1fr}.hero-panel{min-height:180px}.nav{display:none}.menu{display:block;margin-left:auto;border:1px solid var(--line);background:#fff;color:var(--navy)}.nav.open{display:flex;position:absolute;top:64px;left:0;right:0;background:#fff;border-bottom:1px solid var(--line);padding:12px;flex-direction:column}.grid,.country-grid,.movie-grid,.zodiac,.lang-grid,.compare,.months,.timeline,.history,.info-grid{grid-template-columns:1fr 1fr}.today,.stats{grid-template-columns:1fr 1fr}.list article{grid-template-columns:1fr}.hero h1{font-size:38px}}@media(max-width:560px){main{padding-top:16px}.grid,.country-grid,.movie-grid,.zodiac,.lang-grid,.compare,.months,.timeline,.history,.info-grid,.today,.stats{grid-template-columns:1fr}.topbar{gap:8px}.brand strong{font-size:18px}.lang{max-width:88px}.hero{min-height:auto}.hero-panel b{font-size:58px}.search{border-radius:8px}.list article{padding:12px}.poster-art{height:180px}}`;

const appJs = `const data=${JSON.stringify([...holidays.map(h => ({ name: h.name, url: `/holiday/${h.slug}.html`, text: h.summary })), ...countries.map(c => ({ name: c.name, url: `/country/${c.code.toLowerCase()}.html`, text: c.next })), ...countdowns.map(c => ({ name: c.name, url: "/countdowns.html", text: c.place }))])};
document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));
document.querySelector('.lang')?.addEventListener('change',e=>{location.href=e.target.value});
function tick(){document.querySelectorAll('[data-countdown]').forEach(el=>{const t=new Date(el.dataset.countdown+'T00:00:00Z')-new Date();const d=Math.max(0,Math.floor(t/864e5));const h=Math.max(0,Math.floor(t%864e5/36e5));el.querySelector('[data-days]').textContent=d;el.querySelector('[data-hours]').textContent=h})}tick();setInterval(tick,60000);
document.querySelectorAll('[data-ics]').forEach(btn=>btn.addEventListener('click',()=>{const [name,date,place]=btn.dataset.ics.split('|');const dt=date.replaceAll('-','');const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//GlobalTick//EN','BEGIN:VEVENT','UID:'+dt+'-'+name.replace(/\\s+/g,'-')+'@globaltick.xyz','DTSTAMP:'+dt+'T000000Z','DTSTART;VALUE=DATE:'+dt,'SUMMARY:'+name,'LOCATION:'+place,'END:VEVENT','END:VCALENDAR'].join('\\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download=name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.ics';a.click();URL.revokeObjectURL(a.href)}));
document.querySelectorAll('[data-search]').forEach(input=>{const box=input.parentElement.querySelector('[data-suggestions]');input.addEventListener('input',()=>{const q=input.value.toLowerCase().trim();if(!q){box.style.display='none';box.innerHTML='';return}box.innerHTML=data.filter(x=>(x.name+' '+x.text).toLowerCase().includes(q)).slice(0,7).map(x=>'<a href="'+x.url+'"><b>'+x.name+'</b><br><small>'+x.text+'</small></a>').join('');box.style.display=box.innerHTML?'block':'none'})});
document.querySelector('[data-country-filter]')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('[data-country]').forEach(card=>card.style.display=card.dataset.country.toLowerCase().includes(q)?'':'none')});`;

async function write(route, html) {
  const file = path.join(dist, route || "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

async function main() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(path.join(dist, "assets"), { recursive: true });
  await writeFile(path.join(dist, "assets/main.css"), css);
  await writeFile(path.join(dist, "assets/app.js"), appJs);
  await writeFile(path.join(dist, "ads.txt"), adsText);
  await writeFile(path.join(dist, "CNAME"), "globaltick.xyz\n");
  await writeFile(path.join(root, "ads.txt"), adsText);
  await writeFile(path.join(root, "CNAME"), "globaltick.xyz\n");

  const urls = [];
  for (const [lang, meta] of Object.entries(languages)) {
    for (const [id, route, renderer] of pageDefs) {
      const pageRoute = meta.dir ? `${meta.dir}/${route || "index.html"}` : route || "index.html";
      const html = layout({
        lang,
        route,
        active: id,
        title: `${id === "index" ? "GlobalTick" : id.replaceAll("-", " ")} | 2026 Global Holidays & Events Calendar`,
        description: "GlobalTick tracks 2026 public holidays, global events, marketing dates, sports, movies, technology launches and countdowns in seven languages.",
        body: renderers[renderer](lang),
        jsonLd: { "@context": "https://schema.org", "@type": "WebPage", name: "GlobalTick", url: canonical(lang, route), inLanguage: lang }
      });
      await write(pageRoute, html);
      urls.push(canonical(lang, route));
    }
    for (let m = 1; m <= 12; m++) {
      const route = `month/2026-${String(m).padStart(2, "0")}.html`;
      const pageRoute = meta.dir ? `${meta.dir}/${route}` : route;
      await write(pageRoute, layout({ lang, route, active: "2026-calendar", title: `2026-${String(m).padStart(2, "0")} Global Events | GlobalTick`, description: "Monthly global holiday and events calendar for 2026.", body: monthPage(lang, m), jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", name: `2026-${m} global events`, url: canonical(lang, route), inLanguage: lang } }));
      urls.push(canonical(lang, route));
    }
    for (const h of holidays) {
      const route = `holiday/${h.slug}.html`;
      const pageRoute = meta.dir ? `${meta.dir}/${route}` : route;
      await write(pageRoute, layout({ lang, route, active: "countries", title: `${h.name} 2026 Date, Countries & Countdown | GlobalTick`, description: `${h.name} 2026 date, related countries, cultural context, countdown and calendar export.`, body: holidayPage(lang, h), jsonLd: { "@context": "https://schema.org", "@type": "Event", name: `${h.name} 2026`, startDate: h.date, eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled", location: { "@type": "Place", name: h.countries }, description: h.summary, url: canonical(lang, route) } }));
      urls.push(canonical(lang, route));
    }
    for (const c of countries) {
      const route = `country/${c.code.toLowerCase()}.html`;
      const pageRoute = meta.dir ? `${meta.dir}/${route}` : route;
      await write(pageRoute, layout({ lang, route, active: "countries", title: `${c.name} Public Holidays 2026 | GlobalTick`, description: `Browse ${c.name} public holidays, next holiday and 2026 planning dates.`, body: countryPage(lang, c), jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", name: `${c.name} holidays 2026`, url: canonical(lang, route), inLanguage: lang } }));
      urls.push(canonical(lang, route));
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>2026-06-18</lastmod><changefreq>weekly</changefreq><priority>${u.endsWith("/") ? "1.0" : "0.7"}</priority></url>`).join("\n")}\n</urlset>\n`;
  await writeFile(path.join(dist, "sitemap.xml"), sitemap);
  await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
  await cp(path.join(dist, "sitemap.xml"), path.join(root, "sitemap.xml"));
  await cp(path.join(dist, "robots.txt"), path.join(root, "robots.txt"));
  console.log(`Built ${urls.length} localized pages into dist/`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
