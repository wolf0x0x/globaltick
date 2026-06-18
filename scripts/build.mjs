import { mkdir, rm, writeFile, cp } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const site = "https://globaltick.xyz";
const year = 2026;
const buildDate = "2026-06-18";
const adsText = "google.com, pub-8695398658548679, DIRECT, f08c47fec0942fa0\n";

const languages = {
  en: { label: "English", flag: "🇺🇸", locale: "en-US", dir: "", nav: ["Home", "2026 Calendar", "Countries", "Marketing", "Countdowns", "Sports", "Movies", "Tech", "History", "About"], search: "Search holidays, countries, dates, and events", cta: "Add to calendar", details: "Details", subscribe: "Subscribe", ended: "Ended", live: "Live now", days: "days", hrs: "hrs" },
  es: { label: "Español", flag: "🇪🇸", locale: "es-ES", dir: "es", nav: ["Inicio", "Calendario 2026", "Países", "Marketing", "Cuenta atrás", "Deportes", "Películas", "Tecnología", "Historia", "Acerca de"], search: "Buscar festivos, países, fechas y eventos", cta: "Añadir al calendario", details: "Detalles", subscribe: "Suscribirse", ended: "Finalizado", live: "En directo", days: "días", hrs: "h" },
  pt: { label: "Português", flag: "🇵🇹", locale: "pt-PT", dir: "pt", nav: ["Início", "Calendário 2026", "Países", "Marketing", "Contagens", "Esportes", "Filmes", "Tecnologia", "História", "Sobre"], search: "Buscar feriados, países, datas e eventos", cta: "Adicionar ao calendário", details: "Detalhes", subscribe: "Assinar", ended: "Encerrado", live: "Ao vivo", days: "dias", hrs: "h" },
  fr: { label: "Français", flag: "🇫🇷", locale: "fr-FR", dir: "fr", nav: ["Accueil", "Calendrier 2026", "Pays", "Marketing", "Comptes à rebours", "Sports", "Films", "Tech", "Histoire", "À propos"], search: "Rechercher fêtes, pays, dates et événements", cta: "Ajouter au calendrier", details: "Détails", subscribe: "S'abonner", ended: "Terminé", live: "En cours", days: "jours", hrs: "h" },
  de: { label: "Deutsch", flag: "🇩🇪", locale: "de-DE", dir: "de", nav: ["Start", "Kalender 2026", "Länder", "Marketing", "Countdowns", "Sport", "Filme", "Tech", "Geschichte", "Über"], search: "Feiertage, Länder, Daten und Events suchen", cta: "Zum Kalender", details: "Details", subscribe: "Abonnieren", ended: "Beendet", live: "Läuft", days: "Tage", hrs: "Std." },
  ja: { label: "日本語", flag: "🇯🇵", locale: "ja-JP", dir: "ja", nav: ["ホーム", "2026年カレンダー", "国別祝日", "マーケティング", "カウントダウン", "スポーツ", "映画", "テック", "今日は何の日", "概要"], search: "祝日、国、日付、イベントを検索", cta: "カレンダーに追加", details: "詳細", subscribe: "購読", ended: "終了", live: "開催中", days: "日", hrs: "時間" },
  zh: { label: "中文", flag: "🇨🇳", locale: "zh-CN", dir: "zh", nav: ["首页", "2026日历", "国家节日", "营销日历", "倒计时", "赛事", "电影", "科技", "历史今日", "关于"], search: "搜索节日、国家、日期或事件", cta: "添加到日历", details: "查看详情", subscribe: "订阅", ended: "已结束", live: "进行中", days: "天", hrs: "时" }
};

const copy = {
  en: {
    homeTitle: "2026 Global Holidays & Events Calendar",
    homeText: "Explore public holidays in 100+ countries, ecommerce moments, sports tournaments, movie releases, tech launches, cultural observances and live countdowns.",
    quick: "Quick Access", month: "This Month", signals: "Global Signals",
    calendarTitle: "2026 Full-Year Calendar", calendarText: "A dense planning grid with public holiday, religious, cultural, sports, marketing, nature and technology markers.",
    countriesTitle: "Country Holidays Explorer", marketingTitle: "2026 Global Marketing Calendar", countdownTitle: "Major Event Countdown Center",
    sportsTitle: "2026 Global Sports Events Calendar", moviesTitle: "2026 Global Movie Release Calendar", techTitle: "2026 Technology Events Calendar",
    historyTitle: "Today in History", horoscopeTitle: "Daily Horoscope Calendar", compareTitle: "Global Holiday Comparison", aboutTitle: "About GlobalTick", privacyTitle: "Newsletter & Privacy",
    newsletterText: "Weekly planning notes for global holidays, retail dates, sports, entertainment and tech events. The static form validates email, stores your preference locally and opens a subscription email request.",
    sourceText: "Public holiday data is seeded from Nager.Date-style fields and enriched with OpenHolidays, Wikidata and curated public event references."
  },
  es: {
    homeTitle: "Calendario global de festivos y eventos 2026",
    homeText: "Explora festivos públicos, campañas de ecommerce, deportes, estrenos, tecnología, cultura y cuentas atrás en un solo sitio.",
    quick: "Accesos rápidos", month: "Este mes", signals: "Señales globales",
    calendarTitle: "Calendario anual 2026", calendarText: "Vista densa con marcas de festivos, religión, cultura, deportes, marketing, naturaleza y tecnología.",
    countriesTitle: "Explorador de festivos por país", marketingTitle: "Calendario global de marketing 2026", countdownTitle: "Centro de cuentas atrás",
    sportsTitle: "Calendario deportivo global 2026", moviesTitle: "Calendario de estrenos 2026", techTitle: "Calendario tecnológico 2026",
    historyTitle: "Un día como hoy", horoscopeTitle: "Horóscopo diario", compareTitle: "Comparación global de fiestas", aboutTitle: "Acerca de GlobalTick", privacyTitle: "Boletín y privacidad",
    newsletterText: "Notas semanales para planificar festivos, retail, deportes, entretenimiento y tecnología.",
    sourceText: "Datos basados en Nager.Date, OpenHolidays, Wikidata y calendarios públicos curados."
  },
  pt: {
    homeTitle: "Calendário global de feriados e eventos 2026",
    homeText: "Explore feriados, ecommerce, esportes, estreias, tecnologia, cultura e contagens regressivas.",
    quick: "Acessos rápidos", month: "Este mês", signals: "Sinais globais",
    calendarTitle: "Calendário anual 2026", calendarText: "Grade densa com marcadores de feriados, religião, cultura, esportes, marketing, natureza e tecnologia.",
    countriesTitle: "Feriados por país", marketingTitle: "Calendário global de marketing 2026", countdownTitle: "Central de contagens",
    sportsTitle: "Calendário esportivo global 2026", moviesTitle: "Calendário de filmes 2026", techTitle: "Calendário de tecnologia 2026",
    historyTitle: "Hoje na história", horoscopeTitle: "Horóscopo diário", compareTitle: "Comparação global de feriados", aboutTitle: "Sobre GlobalTick", privacyTitle: "Newsletter e privacidade",
    newsletterText: "Notas semanais para planejar feriados, varejo, esportes, entretenimento e tecnologia.",
    sourceText: "Dados com base em Nager.Date, OpenHolidays, Wikidata e calendários públicos curados."
  },
  fr: {
    homeTitle: "Calendrier mondial des jours fériés et événements 2026",
    homeText: "Suivez jours fériés, commerce, sports, sorties cinéma, tech, culture et comptes à rebours.",
    quick: "Accès rapides", month: "Ce mois-ci", signals: "Signaux mondiaux",
    calendarTitle: "Calendrier annuel 2026", calendarText: "Grille dense avec repères publics, religieux, culturels, sportifs, marketing, nature et tech.",
    countriesTitle: "Jours fériés par pays", marketingTitle: "Calendrier marketing mondial 2026", countdownTitle: "Centre de comptes à rebours",
    sportsTitle: "Calendrier sportif mondial 2026", moviesTitle: "Calendrier cinéma 2026", techTitle: "Calendrier tech 2026",
    historyTitle: "Aujourd'hui dans l'histoire", horoscopeTitle: "Horoscope quotidien", compareTitle: "Comparaison mondiale des fêtes", aboutTitle: "À propos de GlobalTick", privacyTitle: "Newsletter et confidentialité",
    newsletterText: "Notes hebdomadaires pour planifier fêtes, retail, sport, divertissement et technologie.",
    sourceText: "Données issues de Nager.Date, OpenHolidays, Wikidata et calendriers publics sélectionnés."
  },
  de: {
    homeTitle: "Globaler Feiertags- und Eventkalender 2026",
    homeText: "Feiertage, Handelstermine, Sport, Filme, Technik, Kultur und Countdowns an einem Ort.",
    quick: "Schnellzugriff", month: "Dieser Monat", signals: "Globale Signale",
    calendarTitle: "Jahreskalender 2026", calendarText: "Dichte Übersicht mit Markern für Feiertage, Religion, Kultur, Sport, Marketing, Natur und Technik.",
    countriesTitle: "Feiertage nach Land", marketingTitle: "Globaler Marketingkalender 2026", countdownTitle: "Countdown-Zentrale",
    sportsTitle: "Globaler Sportkalender 2026", moviesTitle: "Filmkalender 2026", techTitle: "Technologiekalender 2026",
    historyTitle: "Heute in der Geschichte", horoscopeTitle: "Tageshoroskop", compareTitle: "Globaler Feiertagsvergleich", aboutTitle: "Über GlobalTick", privacyTitle: "Newsletter und Datenschutz",
    newsletterText: "Wöchentliche Planungshinweise für Feiertage, Handel, Sport, Unterhaltung und Technik.",
    sourceText: "Daten auf Basis von Nager.Date, OpenHolidays, Wikidata und kuratierten öffentlichen Kalendern."
  },
  ja: {
    homeTitle: "2026年 世界の祝日・イベントカレンダー",
    homeText: "祝日、EC、スポーツ、映画、テック、文化行事、カウントダウンをまとめて確認できます。",
    quick: "クイックアクセス", month: "今月", signals: "グローバルシグナル",
    calendarTitle: "2026年 年間カレンダー", calendarText: "祝日、宗教、文化、スポーツ、マーケティング、自然、テックのマーカー付き一覧。",
    countriesTitle: "国別祝日エクスプローラー", marketingTitle: "2026年 グローバルマーケティングカレンダー", countdownTitle: "主要イベントカウントダウン",
    sportsTitle: "2026年 世界スポーツカレンダー", moviesTitle: "2026年 映画公開カレンダー", techTitle: "2026年 テックイベントカレンダー",
    historyTitle: "今日は何の日", horoscopeTitle: "毎日の星占い", compareTitle: "世界の祝日比較", aboutTitle: "GlobalTickについて", privacyTitle: "ニュースレターとプライバシー",
    newsletterText: "祝日、小売、スポーツ、エンタメ、テック計画の週次メモ。",
    sourceText: "Nager.Date、OpenHolidays、Wikidata、公開イベント情報をもとに構成しています。"
  },
  zh: {
    homeTitle: "2026 全球节假日与事件日历",
    homeText: "一站式探索 100+ 国家公共假日、电商营销节点、体育赛事、电影上映、科技发布、文化节日与实时倒计时。",
    quick: "快捷入口", month: "本月重点", signals: "全球热点信号",
    calendarTitle: "2026 全年日历", calendarText: "高密度全年规划视图，标记公共假日、宗教、文化、体育、营销、自然与科技事件。",
    countriesTitle: "国家/地区节日浏览", marketingTitle: "2026 全球营销日历", countdownTitle: "重大事件倒计时中心",
    sportsTitle: "2026 全球体育赛事日历", moviesTitle: "2026 全球电影上映日历", techTitle: "2026 科技发布会日历",
    historyTitle: "历史上的今天", horoscopeTitle: "每日星座运势", compareTitle: "全球重大节日对比", aboutTitle: "关于 GlobalTick", privacyTitle: "订阅与隐私",
    newsletterText: "订阅全球节假日、零售节点、体育娱乐和科技发布的每周规划简报。静态表单会校验邮箱、本地保存偏好，并打开订阅邮件请求。",
    sourceText: "数据基于 Nager.Date 风格公共假日字段，并结合 OpenHolidays、Wikidata 与公开事件日历整理。"
  }
};

const pageDefs = [
  ["index", "", "home"], ["2026-calendar", "2026-calendar.html", "calendar"], ["countries", "countries.html", "countries"],
  ["marketing-calendar", "marketing-calendar.html", "marketing"], ["countdowns", "countdowns.html", "countdowns"], ["sports-events", "sports-events.html", "sports"],
  ["movie-releases", "movie-releases.html", "movies"], ["tech-events", "tech-events.html", "tech"], ["today-in-history", "today-in-history.html", "history"],
  ["horoscope", "horoscope.html", "horoscope"], ["compare", "compare.html", "compare"], ["about", "about.html", "about"], ["privacy", "privacy.html", "privacy"]
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
  { code: "ZA", flag: "🇿🇦", name: "South Africa", continent: "Africa", holidays: 12, next: "Heritage Day", date: "2026-09-24" },
  { code: "KR", flag: "🇰🇷", name: "South Korea", continent: "Asia", holidays: 15, next: "Chuseok", date: "2026-09-25" },
  { code: "IT", flag: "🇮🇹", name: "Italy", continent: "Europe", holidays: 12, next: "Republic Day", date: "2026-06-02" },
  { code: "ES", flag: "🇪🇸", name: "Spain", continent: "Europe", holidays: 14, next: "National Day", date: "2026-10-12" },
  { code: "NL", flag: "🇳🇱", name: "Netherlands", continent: "Europe", holidays: 9, next: "King's Day", date: "2026-04-27" },
  { code: "SE", flag: "🇸🇪", name: "Sweden", continent: "Europe", holidays: 13, next: "National Day", date: "2026-06-06" },
  { code: "CH", flag: "🇨🇭", name: "Switzerland", continent: "Europe", holidays: 10, next: "Swiss National Day", date: "2026-08-01" },
  { code: "TR", flag: "🇹🇷", name: "Turkey", continent: "Asia", holidays: 14, next: "Republic Day", date: "2026-10-29" },
  { code: "SA", flag: "🇸🇦", name: "Saudi Arabia", continent: "Asia", holidays: 9, next: "Saudi National Day", date: "2026-09-23" },
  { code: "AE", flag: "🇦🇪", name: "United Arab Emirates", continent: "Asia", holidays: 10, next: "UAE National Day", date: "2026-12-02" },
  { code: "SG", flag: "🇸🇬", name: "Singapore", continent: "Asia", holidays: 11, next: "National Day", date: "2026-08-09" },
  { code: "MY", flag: "🇲🇾", name: "Malaysia", continent: "Asia", holidays: 16, next: "Malaysia Day", date: "2026-09-16" },
  { code: "TH", flag: "🇹🇭", name: "Thailand", continent: "Asia", holidays: 17, next: "King's Birthday", date: "2026-07-28" },
  { code: "VN", flag: "🇻🇳", name: "Vietnam", continent: "Asia", holidays: 11, next: "National Day", date: "2026-09-02" },
  { code: "PH", flag: "🇵🇭", name: "Philippines", continent: "Asia", holidays: 18, next: "Independence Day", date: "2026-06-12" },
  { code: "ID", flag: "🇮🇩", name: "Indonesia", continent: "Asia", holidays: 16, next: "Independence Day", date: "2026-08-17" },
  { code: "NZ", flag: "🇳🇿", name: "New Zealand", continent: "Oceania", holidays: 12, next: "Matariki", date: "2026-07-10" },
  { code: "AR", flag: "🇦🇷", name: "Argentina", continent: "Americas", holidays: 16, next: "Independence Day", date: "2026-07-09" },
  { code: "CL", flag: "🇨🇱", name: "Chile", continent: "Americas", holidays: 15, next: "Independence Day", date: "2026-09-18" },
  { code: "CO", flag: "🇨🇴", name: "Colombia", continent: "Americas", holidays: 18, next: "Independence Day", date: "2026-07-20" },
  { code: "PE", flag: "🇵🇪", name: "Peru", continent: "Americas", holidays: 14, next: "Independence Day", date: "2026-07-28" },
  { code: "EG", flag: "🇪🇬", name: "Egypt", continent: "Africa", holidays: 14, next: "Revolution Day", date: "2026-07-23" },
  { code: "NG", flag: "🇳🇬", name: "Nigeria", continent: "Africa", holidays: 12, next: "Independence Day", date: "2026-10-01" },
  { code: "KE", flag: "🇰🇪", name: "Kenya", continent: "Africa", holidays: 13, next: "Madaraka Day", date: "2026-06-01" },
  { code: "MA", flag: "🇲🇦", name: "Morocco", continent: "Africa", holidays: 13, next: "Throne Day", date: "2026-07-30" },
  { code: "PL", flag: "🇵🇱", name: "Poland", continent: "Europe", holidays: 13, next: "Constitution Day", date: "2026-05-03" },
  { code: "BE", flag: "🇧🇪", name: "Belgium", continent: "Europe", holidays: 10, next: "National Day", date: "2026-07-21" },
  { code: "AT", flag: "🇦🇹", name: "Austria", continent: "Europe", holidays: 13, next: "National Day", date: "2026-10-26" },
  { code: "PT", flag: "🇵🇹", name: "Portugal", continent: "Europe", holidays: 13, next: "Portugal Day", date: "2026-06-10" },
  { code: "DK", flag: "🇩🇰", name: "Denmark", continent: "Europe", holidays: 11, next: "Constitution Day", date: "2026-06-05" },
  { code: "FI", flag: "🇫🇮", name: "Finland", continent: "Europe", holidays: 13, next: "Independence Day", date: "2026-12-06" },
  { code: "NO", flag: "🇳🇴", name: "Norway", continent: "Europe", holidays: 12, next: "Constitution Day", date: "2026-05-17" },
  { code: "IE", flag: "🇮🇪", name: "Ireland", continent: "Europe", holidays: 10, next: "St. Patrick's Day", date: "2026-03-17" },
  { code: "IL", flag: "🇮🇱", name: "Israel", continent: "Asia", holidays: 11, next: "Rosh Hashanah", date: "2026-09-12" },
  { code: "PK", flag: "🇵🇰", name: "Pakistan", continent: "Asia", holidays: 14, next: "Independence Day", date: "2026-08-14" },
  { code: "BD", flag: "🇧🇩", name: "Bangladesh", continent: "Asia", holidays: 18, next: "Victory Day", date: "2026-12-16" },
  { code: "CZ", flag: "🇨🇿", name: "Czechia", continent: "Europe", holidays: 13, next: "Czech Statehood Day", date: "2026-09-28" },
  { code: "GR", flag: "🇬🇷", name: "Greece", continent: "Europe", holidays: 12, next: "Ohi Day", date: "2026-10-28" },
  { code: "UA", flag: "🇺🇦", name: "Ukraine", continent: "Europe", holidays: 11, next: "Independence Day", date: "2026-08-24" },
  { code: "RO", flag: "🇷🇴", name: "Romania", continent: "Europe", holidays: 15, next: "Great Union Day", date: "2026-12-01" },
  { code: "HU", flag: "🇭🇺", name: "Hungary", continent: "Europe", holidays: 11, next: "St. Stephen's Day", date: "2026-08-20" },
  { code: "RU", flag: "🇷🇺", name: "Russia", continent: "Europe", holidays: 14, next: "Russia Day", date: "2026-06-12" },
  { code: "HK", flag: "🇭🇰", name: "Hong Kong", continent: "Asia", holidays: 17, next: "HKSAR Establishment Day", date: "2026-07-01" },
  { code: "TW", flag: "🇹🇼", name: "Taiwan", continent: "Asia", holidays: 14, next: "Double Ten Day", date: "2026-10-10" }
];

const holidays = [
  e("new-years-day-2026", "New Year's Day", "2026-01-01", "Public", "Global", "🎆", "A global start-of-year public holiday observed by businesses, schools and governments.", { zh: ["元旦", "全球多数国家的新年公共假日，适合年度规划、旅行与零售复盘。"], es: ["Año Nuevo", "Festivo global de inicio de año para planificación, viajes y comercio."] }),
  e("orthodox-christmas-2026", "Orthodox Christmas", "2026-01-07", "Religious", "Eastern Europe, Orthodox communities", "🕯️", "A major Christian observance in Orthodox communities with family and church traditions."),
  e("australian-open-2026", "Australian Open", "2026-01-12", "Sports", "Australia", "🎾", "The first tennis Grand Slam of the season and a high-interest sports media window."),
  e("lunar-new-year-eve-2026", "Lunar New Year's Eve", "2026-02-16", "Cultural", "East and Southeast Asia", "🏮", "The peak travel, reunion dinner and gifting moment before Lunar New Year."),
  e("spring-festival-2026", "Spring Festival", "2026-02-17", "Cultural", "China, Singapore, global Chinese communities", "🧧", "Lunar New Year centered on family reunions, red envelopes, travel and seasonal commerce.", { zh: ["春节", "农历新年核心节日，覆盖返乡、家庭团聚、红包礼赠和全年最大出行周期之一。"], ja: ["春節", "家族の集まり、贈り物、旅行需要が集中する旧正月。"] }),
  e("ramadan-2026", "Ramadan Begins", "2026-02-18", "Religious", "Muslim-majority countries", "🌙", "A month of fasting, community, charity and evening commerce across Muslim communities."),
  e("international-womens-day-2026", "International Women's Day", "2026-03-08", "Cultural", "Global", "♀", "A global awareness and campaign day for gender equity, workplace culture and social programs."),
  e("st-patricks-day-2026", "St. Patrick's Day", "2026-03-17", "Cultural", "Ireland, diaspora communities", "☘️", "A cultural celebration with parades, tourism, hospitality and themed retail campaigns."),
  e("easter-2026", "Easter Sunday", "2026-04-05", "Religious", "Christian-majority regions", "🌷", "A major Christian observance with public holidays in many countries across Europe, the Americas, Oceania and Africa."),
  e("earth-day-2026", "Earth Day", "2026-04-22", "Nature", "Global", "🌱", "A global environmental awareness day used by schools, NGOs, brands and cities."),
  e("labor-day-2026", "International Workers' Day", "2026-05-01", "Public", "Europe, Asia, Latin America, Africa", "🛠️", "A public holiday in many countries with labor, civic and travel significance."),
  e("star-wars-day-2026", "Star Wars Day", "2026-05-04", "Entertainment", "Global fan communities", "✨", "A pop culture date for entertainment, retail, streaming and fan events."),
  e("mothers-day-2026", "Mother's Day", "2026-05-10", "Cultural", "US, Canada, Australia and more", "💐", "A high-intent gifting, dining, flower, beauty and family travel period."),
  e("eid-al-adha-2026", "Eid al-Adha", "2026-05-27", "Religious", "Muslim-majority countries", "🕌", "A major Islamic holiday connected with pilgrimage season, family gatherings, charity and public closures."),
  e("world-environment-day-2026", "World Environment Day", "2026-06-05", "Nature", "Global", "🌍", "A UN-led environmental awareness day for sustainability campaigns and civic programs.", { zh: ["世界环境日", "联合国环境主题日，适合可持续发展、公益和品牌责任内容规划。"] }),
  e("apple-wwdc-2026", "Apple WWDC 2026", "2026-06-08", "Tech", "Cupertino / online", "🍎", "Apple's developer conference window for software platforms and ecosystem announcements."),
  e("fifa-world-cup-2026", "FIFA World Cup 2026 Opening", "2026-06-11", "Sports", "United States, Canada, Mexico", "🏆", "Opening of the 2026 FIFA World Cup tournament and a major global media moment."),
  e("618-shopping-festival-2026", "618 Shopping Festival", "2026-06-18", "Marketing", "China and cross-border ecommerce", "🛒", "Mid-year ecommerce promotion window with platform, brand and logistics planning demand.", { zh: ["618 购物节", "中国年中大促节点，覆盖平台活动、品牌投放、库存与物流节奏。"] }),
  e("juneteenth-2026", "Juneteenth", "2026-06-19", "Public", "United States", "✊", "A US federal holiday commemorating the end of slavery and a civic education moment."),
  e("summer-solstice-2026", "Summer Solstice", "2026-06-21", "Nature", "Northern Hemisphere", "☀️", "The longest day of the year in the Northern Hemisphere, used in travel, wellness and seasonal content."),
  e("international-yoga-day-2026", "International Yoga Day", "2026-06-21", "Cultural", "Global", "🧘", "A wellness and community participation day for health, fitness and lifestyle campaigns."),
  e("fathers-day-2026", "Father's Day", "2026-06-21", "Cultural", "US, UK, Canada, India and more", "👔", "A family and gifting observance that drives retail, restaurant, travel and content planning demand.", { zh: ["父亲节", "家庭礼赠与餐饮消费节点，适合亲情内容、礼品清单和本地活动策划。"], es: ["Día del Padre", "Observancia familiar con fuerte demanda de regalos, restaurantes y contenido."] }),
  e("canada-day-2026", "Canada Day", "2026-07-01", "Public", "Canada", "🍁", "Canada's national day with travel, civic events, retail and fireworks programming."),
  e("bastille-day-2026", "Bastille Day", "2026-07-14", "Public", "France", "🇫🇷", "French national day with civic ceremonies, tourism and cultural celebrations."),
  e("back-to-school-2026", "Back to School Season", "2026-08-15", "Marketing", "North America, Europe, Asia", "🎒", "Retail season for supplies, apparel, electronics, school services and family planning."),
  e("german-unity-day-2026", "German Unity Day", "2026-10-03", "Public", "Germany", "🇩🇪", "Germany's national public holiday with civic, travel and cultural programming."),
  e("halloween-2026", "Halloween", "2026-10-31", "Cultural", "US, UK, Canada, global retail", "🎃", "A costume, candy, entertainment and retail event with strong social media demand."),
  e("diwali-2026", "Diwali", "2026-11-08", "Religious", "India, Nepal, Singapore, diaspora communities", "🪔", "The festival of lights, an important religious, cultural, travel, gifting and retail period.", { zh: ["排灯节", "印度及南亚社区重要节日，覆盖灯饰、礼赠、家庭团聚和零售旺季。"], hi: ["दीवाली", "प्रकाश, परिवार और उपहारों का प्रमुख त्योहार।"] }),
  e("singles-day-2026", "Singles' Day", "2026-11-11", "Marketing", "China and global ecommerce", "🛍️", "A major ecommerce promotion day with global cross-border retail impact."),
  e("thanksgiving-2026", "Thanksgiving Day", "2026-11-26", "Public", "United States", "🦃", "A US public holiday that starts the peak holiday retail period before Black Friday and Cyber Monday."),
  e("black-friday-2026", "Black Friday", "2026-11-27", "Marketing", "Global retail", "⚡", "Peak promotional event following US Thanksgiving, important for ecommerce, stores and affiliate content."),
  e("cyber-monday-2026", "Cyber Monday", "2026-11-30", "Marketing", "Global digital commerce", "💻", "Online retail and subscription offer planning day after Black Friday weekend."),
  e("christmas-2026", "Christmas Day", "2026-12-25", "Public", "Global", "🎄", "A major global public holiday and one of the largest travel, retail, family and religious periods of the year."),
  e("new-years-eve-2026", "New Year's Eve", "2026-12-31", "Cultural", "Global", "🥂", "Year-end travel, nightlife, restaurant, broadcast and countdown programming moment.")
];

const marketing = holidays.filter(x => ["Marketing", "Cultural"].includes(x.type)).map(x => [x.name, x.date, x.type, x.summary, x.slug, x.icon]);
const countdowns = [
  { name: "FIFA World Cup 2026 Final", date: "2026-07-19", start: "2026-06-11", place: "United States, Canada, Mexico", category: "Sports", icon: "🏆" },
  { name: "US Midterm Elections", date: "2026-11-03", place: "United States", category: "Civic", icon: "🗳️" },
  { name: "Diwali 2026", date: "2026-11-08", place: "India and global communities", category: "Religious", icon: "🪔" },
  { name: "Black Friday 2026", date: "2026-11-27", place: "Global retail", category: "Marketing", icon: "⚡" },
  { name: "Cyber Monday 2026", date: "2026-11-30", place: "Global digital commerce", category: "Marketing", icon: "💻" },
  { name: "Christmas 2026", date: "2026-12-25", place: "Global", category: "Holiday", icon: "🎄" }
];
const sports = [
  ["FIFA World Cup 2026", "2026-06-11", "2026-07-19", "United States, Canada, Mexico", "48 teams, 104 matches, global media focus"],
  ["Milan Cortina Winter Olympics", "2026-02-06", "2026-02-22", "Italy", "Winter sports, ceremony, medals and tourism demand"],
  ["Australian Open", "2026-01-12", "2026-01-25", "Melbourne", "Tennis Grand Slam opening the season"],
  ["Monaco Grand Prix", "2026-05-24", "2026-05-24", "Monaco", "Formula 1 marquee street race"],
  ["Wimbledon", "2026-06-29", "2026-07-12", "London", "Grass-court tennis Grand Slam"],
  ["Tour de France", "2026-07-04", "2026-07-26", "France", "Cycling, tourism and endurance sports coverage"]
];
const tech = [
  ["CES 2026", "2026-01-06", "Las Vegas", "Consumer electronics, mobility, smart home and AI hardware"],
  ["Google I/O 2026", "2026-05-12", "Mountain View / online", "Android, Gemini, cloud and developer tooling"],
  ["Microsoft Build 2026", "2026-05-19", "Seattle / online", "Windows, Azure, AI and developer platform updates"],
  ["Apple WWDC 2026", "2026-06-08", "Cupertino / online", "iOS, macOS, watchOS, visionOS and developer sessions"],
  ["Gamescom 2026", "2026-08-26", "Cologne", "Games, hardware, creators and entertainment technology"],
  ["Apple September Event", "2026-09-08", "Cupertino / online", "Expected iPhone, Watch and ecosystem launches"]
];
const movies = loadMovies([
  { title: "Toy Story 5", date: "2026-06-19", genre: "Animation", studio: "Disney / Pixar", overview: "Pixar's toy-box franchise returns for a summer family release window.", poster: "" },
  { title: "The Odyssey", date: "2026-07-17", genre: "Epic", studio: "Universal", overview: "A mythology-driven theatrical tentpole positioned for global summer audiences.", poster: "" },
  { title: "Moana Live Action", date: "2026-07-10", genre: "Adventure", studio: "Disney", overview: "Disney's live-action island adventure supports family, music and travel content campaigns.", poster: "" },
  { title: "Jumanji 4", date: "2026-12-11", genre: "Adventure comedy", studio: "Sony", overview: "A holiday-season adventure comedy release with broad international audience potential.", poster: "" },
  { title: "Untitled Star Wars Film", date: "2026-05-22", genre: "Sci-fi", studio: "Lucasfilm", overview: "A franchise release window with strong fan, merchandise and entertainment news demand.", poster: "" },
  { title: "Supergirl", date: "2026-06-26", genre: "Superhero", studio: "Warner Bros.", overview: "A DC superhero release planned for late June with comic, cosplay and pop culture hooks.", poster: "" }
]);
const history = [
  ["1815", "Battle of Waterloo", "Napoleon was defeated near Waterloo, reshaping European politics."],
  ["1873", "Susan B. Anthony trial", "The activist was fined for voting, energizing the US suffrage movement."],
  ["1940", "Appeal of 18 June", "Charles de Gaulle broadcast a call for French resistance from London."],
  ["1953", "Egypt becomes a republic", "Egypt formally abolished the monarchy and declared a republic."],
  ["1979", "SALT II signed", "The United States and Soviet Union signed a strategic arms limitation treaty."],
  ["1983", "Sally Ride in space", "Sally Ride became the first American woman in space aboard Challenger."],
  ["2006", "Kazakhstan launches KazSat-1", "Kazakhstan launched its first communications satellite."],
  ["2018", "ICANN DNSSEC key rollover planning", "Internet infrastructure operators prepared for a major trust-anchor transition."]
];
const zodiac = [
  ["Aries", "♈", "Momentum is useful today, but the best opening comes from sequencing work before speaking. Prioritize one visible task and leave room for a late invitation."],
  ["Taurus", "♉", "Practical choices win. Review money, materials and meals; comfort improves when you make one overdue decision concrete."],
  ["Gemini", "♊", "Messages move quickly. A short note, pitch or reply can unlock a stalled plan, but edit twice before sending."],
  ["Cancer", "♋", "Home and memory are strong themes. Protect quiet time, then use it to turn a vague feeling into a clear request."],
  ["Leo", "♌", "Visibility favors you when it is specific. Show one polished result instead of explaining every step behind it."],
  ["Virgo", "♍", "Systems want attention. A checklist, calendar cleanup or small health routine creates more lift than dramatic reinvention."],
  ["Libra", "♎", "Partnership signals are subtle. Ask a better question, compare expectations and make the next shared step easy to accept."],
  ["Scorpio", "♏", "Depth helps, intensity needs pacing. Investigate the real constraint, then stop before a useful insight turns into over-control."],
  ["Sagittarius", "♐", "Learning and travel themes open. Choose the route with better information, not just the route with more novelty."],
  ["Capricorn", "♑", "Authority grows through follow-through. Close a loop, document the result and make the next deadline boringly clear."],
  ["Aquarius", "♒", "Groups and tools are active. A collaborative system improves if you remove one confusing rule or add one shared reference."],
  ["Pisces", "♓", "Creative focus is available, especially around music, images or memory. Give the idea a container before it dissolves."]
];
const chineseZodiac = [
  ["Rat", "鼠", "Quick judgment helps today. Confirm numbers, reply early and avoid turning a useful shortcut into a rushed promise."],
  ["Ox", "牛", "Steady progress wins. A patient budget, repair or documentation task becomes easier once you name the next small step."],
  ["Tiger", "虎", "Lead with courage, then leave space for feedback. A bold message lands better when it includes one practical detail."],
  ["Rabbit", "兔", "Soft power is strong. Choose the calm route, refine the atmosphere and let a well-timed courtesy open the door."],
  ["Dragon", "龙", "Ambition is active. Put your largest idea into a schedule so momentum turns into something visible."],
  ["Snake", "蛇", "Observation beats noise. Read the room, keep one card private and make the decision after a second look."],
  ["Horse", "马", "Movement clears the mind. Travel, errands or a brisk reset help you separate real urgency from restlessness."],
  ["Goat", "羊", "Creative cooperation is favored. Improve the shared mood, then ask for the concrete support you need."],
  ["Monkey", "猴", "Experimentation pays off. Test a tool, script or pitch, but save a clean version before you improvise."],
  ["Rooster", "鸡", "Details matter. Presentation, timing and wording can upgrade the result more than extra effort."],
  ["Dog", "狗", "Loyalty and boundaries both count. Keep your promise, but do not inherit a problem that needs a new owner."],
  ["Pig", "猪", "Goodwill expands when you simplify. Share resources, choose comfort wisely and finish with generosity."]
];

function e(slug, name, date, type, countries, icon, summary, i18n = {}) {
  return { slug, name, date, type, countries, icon, summary, i18n };
}
function loadMovies(seed) {
  const file = path.join(root, "data/movies/2026.json");
  if (!existsSync(file)) return seed;
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8"));
    return Array.isArray(parsed.movies) && parsed.movies.length ? parsed.movies.map(item => ({
      title: item.title,
      date: item.date || item.release_date || "2026-01-01",
      genre: item.genre || "Film",
      studio: item.studio || item.source || "TMDB",
      overview: item.overview || "Upcoming 2026 movie release.",
      poster: item.poster || ""
    })) : seed;
  } catch {
    return seed;
  }
}
function c(lang) { return copy[lang] || copy.en; }
function local(item, lang, field = "name") {
  if (field === "name") return item.i18n?.[lang]?.[0] || item.name;
  return item.i18n?.[lang]?.[1] || item.summary;
}
function fmt(date, lang = "en") {
  return new Intl.DateTimeFormat(languages[lang].locale, { year: "numeric", month: "short", day: "numeric" }).format(new Date(`${date}T12:00:00Z`));
}
function hrefFor(lang, route) {
  const leaf = route || "index.html";
  return languages[lang].dir ? `/${languages[lang].dir}/${leaf}` : `/${leaf}`;
}
function canonical(lang, route) {
  const h = hrefFor(lang, route);
  return `${site}${h === "/index.html" ? "/" : h}`;
}
function assetPrefix(lang, route) {
  return "../".repeat((route ? route.split("/").length - 1 : 0) + (languages[lang].dir ? 1 : 0));
}
function allEvents() {
  const fromSports = sports.map(s => ({ slug: slugify(s[0]), name: s[0], date: s[1], endDate: s[2], type: "Sports", countries: s[3], icon: "🏆", summary: s[4] }));
  const fromTech = tech.map(t => ({ slug: slugify(t[0]), name: t[0], date: t[1], type: "Tech", countries: t[2], icon: "⌘", summary: t[3] }));
  const fromMovies = movies.map(m => ({ slug: slugify(m.title), name: m.title, date: m.date, type: "Entertainment", countries: m.studio, icon: "🎬", summary: m.overview || `${m.genre} release from ${m.studio}.` }));
  const seen = new Set();
  return [...holidays, ...fromSports, ...fromTech, ...fromMovies]
    .filter(item => {
      const base = item.name.toLowerCase().replace(/\b2026\b/g, "").replace(/\b(opening|final)\b/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const key = `${base}:${item.date}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}
function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function daysUntil(date) {
  return Math.ceil((new Date(`${date}T00:00:00Z`) - new Date(`${buildDate}T00:00:00Z`)) / 86400000);
}
function statusFor(item, lang) {
  const start = daysUntil(item.start || item.date);
  const end = daysUntil(item.date);
  if (item.start && start <= 0 && end >= 0) return languages[lang].live;
  if (end < 0) return languages[lang].ended;
  return `${end} ${languages[lang].days}`;
}
function nav(lang, active, currentRoute) {
  const links = [
    ["index", "", languages[lang].nav[0]], ["2026-calendar", "2026-calendar.html", languages[lang].nav[1]], ["countries", "countries.html", languages[lang].nav[2]],
    ["marketing-calendar", "marketing-calendar.html", languages[lang].nav[3]], ["countdowns", "countdowns.html", languages[lang].nav[4]], ["sports-events", "sports-events.html", languages[lang].nav[5]],
    ["movie-releases", "movie-releases.html", languages[lang].nav[6]], ["tech-events", "tech-events.html", languages[lang].nav[7]], ["today-in-history", "today-in-history.html", languages[lang].nav[8]], ["about", "about.html", languages[lang].nav[9]]
  ];
  return `<header class="topbar"><a class="brand" href="${hrefFor(lang, "")}" aria-label="GlobalTick home"><img src="${assetPrefix(lang, currentRoute)}assets/favicon.svg" alt="" width="30" height="30"><strong>GlobalTick</strong></a><button class="menu" aria-label="Menu">☰</button><nav class="nav">${links.map(([id, route, label]) => `<a class="${active === id ? "active" : ""}" href="${hrefFor(lang, route)}">${label}</a>`).join("")}</nav><form class="nav-search" role="search"><input data-search-small placeholder="${languages[lang].search}"><div class="suggestions" data-suggestions></div></form><select class="lang" aria-label="Language">${Object.entries(languages).map(([code, meta]) => `<option value="${canonical(code, currentRoute)}" ${code === lang ? "selected" : ""}>${meta.flag} ${code.toUpperCase()}</option>`).join("")}</select></header>`;
}
function layout({ lang, route, active, title, description, body, jsonLd = [] }) {
  const assets = assetPrefix(lang, route);
  const alternates = `${Object.keys(languages).map(code => `<link rel="alternate" hreflang="${code}" href="${canonical(code, route)}">`).join("\n")}\n<link rel="alternate" hreflang="x-default" href="${canonical("en", route)}">`;
  const data = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return `<!doctype html>
<html lang="${lang === "ja" ? "ja" : lang}">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7D6SE08345"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-7D6SE08345');</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8695398658548679" crossorigin="anonymous"></script>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="geo.region" content="001"><meta name="geo.placename" content="Global">
<link rel="canonical" href="${canonical(lang, route)}">${alternates}
<meta property="og:site_name" content="GlobalTick"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical(lang, route)}"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${assets}assets/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="${assets}assets/apple-touch-icon.svg"><link rel="stylesheet" href="${assets}assets/main.css">
${data.map(item => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n")}
</head><body>${nav(lang, active, route)}<main>${body}${adSlot()}</main>${footer(lang)}<script src="${assets}assets/app.js"></script></body></html>`;
}
function adSlot() {
  return `<section class="ad-slot" aria-label="Advertisement"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8695398658548679" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins></section>`;
}
function footer(lang) {
  return `<footer><div><strong>GlobalTick</strong><p>${c(lang).sourceText}</p></div><div class="footer-links"><a href="${hrefFor(lang, "about.html")}">About</a><a href="${hrefFor(lang, "privacy.html")}">Privacy</a><a href="/sitemap.xml">Sitemap</a><a href="https://github.com/wolf0x0x/globaltick">GitHub</a></div><p class="fine">© 2026 GlobalTick · Nager.Date · OpenHolidays · Wikidata · public event calendars</p></footer>`;
}
function hero(title, text, lang) {
  return `<section class="hero"><div><p class="eyebrow">globaltick.xyz</p><h1>${title}</h1><p>${text}</p><form class="search" role="search"><span>⌕</span><input data-search placeholder="${languages[lang].search}"><div class="suggestions" data-suggestions></div></form></div><div class="hero-panel"><b>G</b><span>Global events · holidays · countdown intelligence</span></div></section>`;
}
function cards(items) {
  return `<div class="grid cards">${items.map(x => `<article class="card"><span class="icon">${x.icon}</span><h3>${x.title}</h3><p>${x.text}</p>${x.link ? `<a class="text-link" href="${x.link}">${x.label || "Open"}</a>` : ""}</article>`).join("")}</div>`;
}
function home(lang) {
  return `${hero(c(lang).homeTitle, c(lang).homeText, lang)}
  <section class="today"><article><b>June 18</b><span>${local(holidays.find(h => h.slug === "618-shopping-festival-2026"), lang)}</span></article><article><b>${statusFor(countdowns[0], lang)}</b><span>${countdowns[0].name}</span></article><article><b>8</b><span>${c(lang).historyTitle}</span></article><article><b>315+</b><span>SEO pages</span></article></section>
  <section><h2>${c(lang).quick}</h2>${cards([
    { icon: "🗓️", title: c(lang).calendarTitle, text: c(lang).calendarText, link: hrefFor(lang, "2026-calendar.html") },
    { icon: "🌍", title: c(lang).countriesTitle, text: "Country pages now include legacy /US.html style aliases and structured planning notes.", link: hrefFor(lang, "countries.html") },
    { icon: "🛒", title: c(lang).marketingTitle, text: "Expanded campaign dates across gifting, culture, ecommerce and seasonal retail.", link: hrefFor(lang, "marketing-calendar.html") },
    { icon: "⏳", title: c(lang).countdownTitle, text: "Deduplicated timers with ended, live and future states.", link: hrefFor(lang, "countdowns.html") }
  ])}</section>
  <section><h2>${c(lang).countdownTitle}</h2>${countdownGrid(lang, countdowns.slice(0, 4))}</section>
  <section><h2>${c(lang).month}</h2>${eventList(allEvents().filter(h => h.date.startsWith("2026-06")), lang)}</section>
  <section class="map-band"><h2>${c(lang).signals}</h2><p>${c(lang).sourceText}</p><div class="world-map" aria-label="World event signal map">G · 001 · UTC · 🌍 · 🗓️ · ⏱️</div></section>`;
}
function calendarPage(lang) {
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  return `${hero(c(lang).calendarTitle, c(lang).calendarText, lang)}
  <section class="toolbar"><select><option>All countries</option>${countries.map(cn => `<option>${cn.name}</option>`)}</select><select><option>All types</option><option>Public</option><option>Religious</option><option>Cultural</option><option>Marketing</option><option>Sports</option><option>Tech</option></select></section>
  <section class="months">${months.map(d => monthBlock(d.getMonth(), lang, true)).join("")}</section>
  <section class="legend">${["Public","Religious","Cultural","Marketing","Sports","Tech","Nature","Entertainment"].map(t => `<span><i class="dot ${t.toLowerCase()}"></i>${t}</span>`).join("")}</section>`;
}
function monthBlock(month, lang, compact = false) {
  const d = new Date(year, month, 1);
  const monthName = new Intl.DateTimeFormat(languages[lang].locale, { month: "long" }).format(d);
  const first = d.getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const evs = allEvents().filter(x => x.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`));
  const cells = Array.from({ length: first }, () => `<span></span>`).concat(Array.from({ length: days }, (_, idx) => {
    const day = idx + 1;
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const hits = evs.filter(x => x.date === iso);
    return `<a href="${hrefFor(lang, `month/2026-${String(month + 1).padStart(2, "0")}.html`)}" class="${hits.length ? `has-event ${hits[0].type.toLowerCase()}` : ""}" title="${hits.map(x => `${local(x, lang)} · ${x.type}`).join(" | ")}">${day}${hits.length ? `<i>${hits.slice(0,3).map(x => `<em class="${x.type.toLowerCase()}"></em>`).join("")}</i>` : ""}</a>`;
  }));
  return `<article class="month"><h3>${monthName}</h3><div class="week"><b>S</b><b>M</b><b>T</b><b>W</b><b>T</b><b>F</b><b>S</b></div><div class="days">${cells.join("")}</div>${compact ? `<ul class="month-events">${evs.slice(0,5).map(x => `<li><span class="pill ${x.type.toLowerCase()}">${x.type}</span>${fmt(x.date, lang)} ${local(x, lang)}</li>`).join("")}</ul>` : ""}</article>`;
}
function countriesPage(lang) {
  return `${hero(c(lang).countriesTitle, "Explore public holidays and cultural observances by country, continent and month.", lang)}
  <section class="toolbar"><input data-country-filter placeholder="Search country"><select><option>All continents</option><option>Asia</option><option>Europe</option><option>Americas</option><option>Africa</option><option>Oceania</option></select></section>
  <section class="country-grid">${countries.map(cn => `<article class="card country" data-country="${cn.name} ${cn.continent} ${cn.code}"><span class="flag">${cn.flag}</span><h3>${cn.name}</h3><p>${cn.next} · ${fmt(cn.date, lang)}</p><b>${cn.holidays} public holidays</b><a class="text-link" href="${hrefFor(lang, `${cn.code}.html`)}">Open ${cn.code}</a></article>`).join("")}</section>`;
}
function marketingPage(lang) {
  return `${hero(c(lang).marketingTitle, "Plan ecommerce, campaign launches, gifting windows and retail operations around global demand peaks.", lang)}
  <section class="timeline">${marketing.map(m => `<article><time>${fmt(m[1], lang)}</time><h3>${m[5]} ${m[0]}</h3><b>${m[2]}</b><p>${m[3]}</p></article>`).join("")}</section>
  <section><h2>Campaign Windows</h2>${eventList(marketing.map(m => ({ name: m[0], date: m[1], type: m[2], countries: "Global campaign planning", summary: m[3], icon: m[5], slug: m[4] })), lang)}</section>`;
}
function countdownGrid(lang, items = countdowns) {
  return `<div class="grid countdowns">${items.map(cn => `<article class="card countdown ${daysUntil(cn.date) < 0 ? "is-ended" : ""}" data-countdown="${cn.date}" data-start="${cn.start || ""}"><span class="icon">${cn.icon}</span><p>${cn.category}</p><h3>${cn.name}</h3><strong class="status">${statusFor(cn, lang)}</strong><div class="timer"><b data-days>--</b><span>${languages[lang].days}</span><b data-hours>--</b><span>${languages[lang].hrs}</span></div><p>${fmt(cn.date, lang)} · ${cn.place}</p><button data-ics="${cn.name}|${cn.date}|${cn.place}">${languages[lang].cta}</button></article>`).join("")}</div>`;
}
function countdownPage(lang) {
  return `${hero(c(lang).countdownTitle, "Live countdowns for sports, technology, civic, retail and holiday events.", lang)}
  <section class="featured">${countdownGrid(lang, countdowns.slice(0, 1))}</section><section><h2>All Countdowns</h2>${countdownGrid(lang, countdowns.slice(1))}</section>`;
}
function eventList(items, lang) {
  return `<div class="list">${items.map(h => `<article><time>${fmt(h.date, lang)}</time><div><h3>${h.icon || "•"} ${local(h, lang)}</h3><p>${local(h, lang, "summary")}</p><span class="pill ${String(h.type).toLowerCase()}">${h.type}</span><span class="muted">${h.countries}</span></div><a href="${hrefFor(lang, `holiday/${h.slug || "fathers-day-2026"}.html`)}">${languages[lang].details}</a></article>`).join("")}</div>`;
}
function sportsPage(lang) {
  return `${hero(c(lang).sportsTitle, "Track tournaments, finals, ceremonies and high-interest sports moments.", lang)}
  <section class="list">${sports.map(s => `<article><time>${fmt(s[1], lang)}</time><div><h3>🏆 ${s[0]}</h3><p>${fmt(s[1], lang)} - ${fmt(s[2], lang)} · ${s[3]}</p><span class="pill sports">${s[4]}</span></div></article>`).join("")}</section>`;
}
function moviesPage(lang) {
  return `${hero(c(lang).moviesTitle, "Curated 2026 releases with studio, genre, overview, poster-ready fields and TMDB sync support.", lang)}
  <section class="movie-grid">${movies.map((m, i) => `<article class="card poster">${m.poster ? `<img class="poster-img" src="${m.poster}" alt="${m.title} poster">` : `<div class="poster-art p${i % 5}">${m.title.split(" ").map(w => w[0]).join("")}</div>`}<h3>${m.title}</h3><p>${fmt(m.date, lang)}</p><span class="pill entertainment">${m.genre}</span><small>${m.studio}</small><p>${m.overview}</p></article>`).join("")}</section>`;
}
function techPage(lang) {
  return `${hero(c(lang).techTitle, "Developer conferences, hardware launches and platform events in one planning view.", lang)}
  <section class="list">${tech.map(t => `<article><time>${fmt(t[1], lang)}</time><div><h3>⌘ ${t[0]}</h3><p>${t[2]}</p><span class="pill tech">${t[3]}</span></div></article>`).join("")}</section>`;
}
function historyPage(lang) {
  return `${hero(c(lang).historyTitle, "Daily historical context for education, newsletters, social calendars and event hooks.", lang)}
  <section class="history">${history.map(h => `<article><b>${h[0]}</b><h3>${h[1]}</h3><p>${h[2]}</p></article>`).join("")}</section>`;
}
function horoscopePage(lang) {
  return `${hero(c(lang).horoscopeTitle, "Daily differentiated zodiac notes for content discovery and light planning.", lang)}
  <section><h2>Western Zodiac</h2><div class="zodiac">${zodiac.map((z, i) => `<article class="card"><span class="icon">${z[1]}</span><h3>${z[0]}</h3><p>${z[2]}</p><b>${"★".repeat(3 + (i % 3))}</b></article>`).join("")}</div></section>
  <section><h2>${lang === "zh" ? "生肖运势" : "Chinese Zodiac"}</h2><div class="zodiac">${chineseZodiac.map((z, i) => `<article class="card"><span class="icon">${z[1]}</span><h3>${z[0]}</h3><p>${z[2]}</p><b>${"★".repeat(3 + (i % 3))}</b></article>`).join("")}</div></section>`;
}
function comparePage(lang) {
  const chosen = ["spring-festival-2026", "diwali-2026", "thanksgiving-2026", "christmas-2026"].map(slug => holidays.find(h => h.slug === slug));
  return `${hero(c(lang).compareTitle, "Understand how major cultural holidays differ by timing, rituals, closures and marketing behavior.", lang)}
  <section class="compare">${chosen.map(h => `<article class="card"><span class="icon">${h.icon}</span><h3>${local(h, lang)}</h3><p>${fmt(h.date, lang)}</p><p>${local(h, lang, "summary")}</p><span class="pill ${h.type.toLowerCase()}">${h.type}</span></article>`).join("")}</section>
  <section><h2>Year Timeline</h2><div class="bar">${holidays.map(h => `<span title="${local(h, lang)}" style="left:${(new Date(h.date).getMonth() / 11) * 95}%">${h.icon}</span>`).join("")}</div></section>`;
}
function aboutPage(lang) {
  return `${hero(c(lang).aboutTitle, "GlobalTick is a static, multilingual calendar for public holidays, marketing dates and global events.", lang)}
  <section><h2>Languages</h2><div class="lang-grid">${Object.entries(languages).map(([code, l]) => `<a class="card" href="${canonical(code, "")}"><span class="icon">${l.flag}</span><h3>${l.label}</h3><p>${code.toUpperCase()}</p></a>`).join("")}</div></section>
  <section><h2>Data Resources</h2><div class="list"><article><time>API</time><div><h3>Nager.Date</h3><p>Free public holiday JSON API for 100+ countries, no API key and CORS-ready.</p></div><a href="https://date.nager.at/api">Source</a></article><article><time>API</time><div><h3>OpenHolidays</h3><p>Open public and school holiday API with JSON and iCal output for supported countries.</p></div><a href="https://www.openholidaysapi.org/en/">Source</a></article><article><time>Open Data</time><div><h3>Wikidata</h3><p>Structured event, entity and history data accessible through public data interfaces.</p></div><a href="https://www.wikidata.org/wiki/Wikidata:Data_access">Source</a></article></div></section>`;
}
function privacyPage(lang) {
  return `${hero(c(lang).privacyTitle, c(lang).newsletterText, lang)}
  <section class="newsletter"><form data-newsletter><input type="email" required placeholder="you@example.com"><button>${languages[lang].subscribe}</button><output></output></form><p>${c(lang).newsletterText}</p></section>
  <section><h2>Privacy Policy</h2><p>GlobalTick is a static website. It uses local browser storage for language and newsletter preferences, Google Analytics for aggregate traffic measurement, and does not sell personal data.</p></section>`;
}
function monthPage(lang, month) {
  const mm = String(month).padStart(2, "0");
  const items = allEvents().filter(x => x.date.startsWith(`2026-${mm}`));
  return `${hero(`2026-${mm} Global Events`, "Monthly calendar and event list for holidays, campaigns and major planning moments.", lang)}<section class="months one">${monthBlock(month - 1, lang)}</section><section><h2>Events</h2>${eventList(items, lang)}</section>`;
}
function holidayPage(lang, h) {
  return `${hero(`${h.icon} ${local(h, lang)} 2026`, `${fmt(h.date, lang)} · ${h.countries} · ${h.type}`, lang)}
  <section class="info-grid"><article class="card"><h2>Overview</h2><p>${local(h, lang, "summary")}</p></article><article class="card"><h2>Countries & Regions</h2><p>${h.countries}</p></article><article class="card"><h2>Planning Notes</h2><p>Useful for travel, retail, local closures, content calendars, newsletter hooks and cross-border scheduling.</p></article><article class="card calendar-export"><h2>Calendar Export</h2><p>Download an .ics file for Apple Calendar, Google Calendar, Outlook and other calendar apps.</p><button data-ics="${local(h, lang)}|${h.date}|${h.countries}">${languages[lang].cta}</button></article></section>
  <section><h2>Related Holidays</h2>${eventList(holidays.filter(x => x.slug !== h.slug).slice(0, 6), lang)}</section>`;
}
function countryPage(lang, cn) {
  const relevant = allEvents().filter(x => x.countries.includes(cn.name) || x.countries.includes(cn.code) || x.countries.includes("Global")).slice(0, 12);
  return `${hero(`${cn.flag} ${cn.name} Holidays 2026`, `Public holiday overview, next holiday and planning signals for ${cn.name}.`, lang)}
  <section class="stats"><article><b>${cn.holidays}</b><span>Public holidays</span></article><article><b>${cn.continent}</b><span>Region</span></article><article><b>${fmt(cn.date, lang)}</b><span>${cn.next}</span></article></section>
  <section><h2>2026 Planning List</h2>${eventList(relevant, lang)}</section>`;
}

const renderers = { home, calendar: calendarPage, countries: countriesPage, marketing: marketingPage, countdowns: countdownPage, sports: sportsPage, movies: moviesPage, tech: techPage, history: historyPage, horoscope: horoscopePage, compare: comparePage, about: aboutPage, privacy: privacyPage };

const css = `:root{--bg:#f7f9fb;--surface:#fff;--navy:#1e3a5f;--ink:#191c1e;--muted:#5d6673;--line:#e0e7ef;--orange:#ff6b35;--mint:#4ecdc4;--green:#10b981;--red:#ef4444;--blue:#0ea5e9;--purple:#8b5cf6;--teal:#0f766e;--amber:#f59e0b}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,"PingFang SC","Noto Sans CJK SC",sans-serif;line-height:1.55;overflow-x:hidden}a{color:inherit;text-decoration:none}.topbar{position:sticky;top:0;z-index:10;min-height:64px;background:rgba(255,255,255,.94);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);display:flex;align-items:center;gap:14px;padding:0 clamp(16px,4vw,48px)}.brand{display:flex;align-items:center;gap:8px;color:var(--navy);font-size:20px}.nav{display:flex;gap:4px;overflow:auto;flex:1}.nav a{font-size:14px;color:var(--muted);padding:9px 10px;border-radius:8px;white-space:nowrap}.nav a.active,.nav a:hover{background:#eaf1fb;color:var(--navy)}.nav-search{position:relative;max-width:260px}.nav-search input,.lang{border:1px solid var(--line);border-radius:8px;background:#fff;padding:8px}.menu{display:none}main{max-width:1280px;margin:auto;padding:28px clamp(16px,4vw,48px) 56px}.hero{min-height:370px;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(260px,.65fr);gap:28px;align-items:center;padding:28px 0 18px}.eyebrow{color:var(--orange);font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:.08em}.hero h1{font-size:clamp(34px,5vw,60px);line-height:1.03;margin:8px 0 18px;color:var(--navy);letter-spacing:0}.hero p{font-size:18px;color:var(--muted);max-width:760px}.hero-panel{min-height:250px;border-radius:8px;background:radial-gradient(circle at 20% 20%,#4ecdc4,transparent 28%),linear-gradient(135deg,#1e3a5f,#00413d);color:#fff;padding:28px;display:flex;flex-direction:column;justify-content:end;box-shadow:0 18px 40px rgba(30,58,95,.18);overflow:hidden}.hero-panel b{font-size:104px;line-height:1}.search{position:relative;margin-top:24px;max-width:720px;background:#fff;border:1px solid var(--line);border-radius:999px;display:flex;align-items:center;gap:10px;padding:12px 18px;box-shadow:0 2px 8px rgba(30,58,95,.08)}.search input{border:0;outline:0;font-size:16px;flex:1;min-width:0}.suggestions{position:absolute;top:44px;left:0;right:0;background:#fff;border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 28px rgba(30,58,95,.14);display:none;overflow:hidden;z-index:20}.search .suggestions{top:56px;left:20px;right:20px}.suggestions a{display:block;padding:10px 14px;border-bottom:1px solid var(--line)}section{margin:34px 0}h2{font-size:24px;color:var(--navy);margin:0 0 16px}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.card{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:18px;box-shadow:0 2px 8px rgba(30,58,95,.08)}.card:hover{box-shadow:0 8px 24px rgba(30,58,95,.12);transform:translateY(-2px);transition:.2s}.card h3{margin:8px 0;color:var(--navy)}.card p{color:var(--muted)}.icon,.flag{font-size:34px}.text-link{color:var(--orange);font-weight:700}.today,.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.today article,.stats article{background:#fff;border:1px solid var(--line);border-radius:8px;padding:16px}.today b,.stats b{display:block;color:var(--navy);font-size:20px}.toolbar{display:flex;gap:12px;flex-wrap:wrap}.toolbar input,.toolbar select,.newsletter input{border:1px solid var(--line);border-radius:8px;background:#fff;padding:11px 12px;min-width:220px}.months{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.months.one{grid-template-columns:minmax(320px,540px)}.month{background:#fff;border:1px solid var(--line);border-radius:8px;padding:16px}.month h3{margin:0 0 12px;color:var(--navy)}.week,.days{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center}.week{font-size:12px;color:var(--muted);margin-bottom:8px}.days a,.days span{min-height:38px;display:grid;place-items:center;border-radius:8px;position:relative}.days a:hover{background:#edf6ff}.days a.has-event{font-weight:800;color:var(--navy);background:#f8fafc}.days a i{position:absolute;bottom:3px;display:flex;gap:2px}.days a em{width:6px;height:6px;border-radius:50%;display:block}.month-events{list-style:none;padding:10px 0 0;margin:8px 0 0;border-top:1px solid var(--line);font-size:12px;color:var(--muted)}.month-events li{margin:5px 0}.legend{display:flex;gap:16px;flex-wrap:wrap}.dot,.days em{background:var(--orange)}.dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px}.public,.days em.public{background:var(--navy)}.religious,.days em.religious{background:var(--purple)}.cultural,.days em.cultural{background:var(--orange)}.marketing,.days em.marketing{background:var(--red)}.sports,.days em.sports{background:var(--green)}.tech,.days em.tech{background:var(--blue)}.nature,.days em.nature{background:var(--teal)}.entertainment,.days em.entertainment{background:var(--amber)}.country-grid,.movie-grid,.zodiac,.lang-grid,.compare{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.list{display:grid;gap:12px}.list article{display:grid;grid-template-columns:120px 1fr auto;gap:16px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:8px;padding:14px}.list time{font-weight:700;color:var(--navy)}.list h3{margin:0}.list p{margin:4px 0;color:var(--muted)}.pill{display:inline-block;border-radius:999px;background:#eef2ff;color:var(--navy);padding:4px 9px;font-size:12px;font-weight:700;margin-right:6px}.pill.public,.pill.religious,.pill.marketing,.pill.sports,.pill.tech,.pill.nature{color:#fff}.pill.cultural,.pill.entertainment{color:#1f2937}.muted{color:var(--muted);font-size:13px}.timeline{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.timeline article,.history article{background:#fff;border-left:4px solid var(--orange);border-radius:8px;padding:16px;box-shadow:0 2px 8px rgba(30,58,95,.08)}.countdowns .timer{display:grid;grid-template-columns:auto auto auto auto;gap:6px;align-items:end}.timer b{font-size:32px;color:var(--navy)}.status{color:var(--orange)}.is-ended{opacity:.72}button{border:0;background:var(--navy);color:#fff;border-radius:8px;padding:10px 14px;font-weight:700;cursor:pointer;min-height:40px}.featured .grid{grid-template-columns:1fr}.poster-art,.poster-img{width:100%;height:230px;border-radius:8px;object-fit:cover}.poster-art{background:linear-gradient(135deg,#1e3a5f,#ff6b35);display:grid;place-items:center;color:#fff;font-size:38px;font-weight:800}.p1{background:linear-gradient(135deg,#002927,#4ecdc4)}.p2{background:linear-gradient(135deg,#8b5cf6,#0ea5e9)}.p3{background:linear-gradient(135deg,#ab3500,#ffb59d)}.p4{background:linear-gradient(135deg,#111827,#10b981)}.history{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.bar{height:96px;position:relative;background:#fff;border:1px solid var(--line);border-radius:8px}.bar span{position:absolute;top:34px;font-size:26px}.map-band{background:#fff;border:1px solid var(--line);border-radius:8px;padding:22px}.world-map{font-size:32px;color:var(--mint);letter-spacing:8px}.newsletter form{display:flex;gap:10px;flex-wrap:wrap}.newsletter input{flex:1}output{display:block;color:var(--green);font-weight:700}.ad-slot{min-height:96px;border:1px dashed var(--line);border-radius:8px;background:#fff;display:grid;place-items:center;padding:12px;color:var(--muted)}footer{border-top:1px solid var(--line);padding:28px clamp(16px,4vw,48px);background:#fff;color:var(--muted)}footer strong{color:var(--navy)}.footer-links{display:flex;gap:14px;flex-wrap:wrap;margin:12px 0}.fine{font-size:12px}.lang-grid a{display:block}@media(max-width:1050px){.nav-search{display:none}}@media(max-width:900px){.hero{grid-template-columns:1fr}.hero-panel{min-height:180px}.nav{display:none}.menu{display:block;margin-left:auto;border:1px solid var(--line);background:#fff;color:var(--navy)}.nav.open{display:flex;position:absolute;top:64px;left:0;right:0;background:#fff;border-bottom:1px solid var(--line);padding:12px;flex-direction:column}.grid,.country-grid,.movie-grid,.zodiac,.lang-grid,.compare,.months,.timeline,.history,.info-grid{grid-template-columns:1fr 1fr}.today,.stats{grid-template-columns:1fr 1fr}.list article{grid-template-columns:1fr}.hero h1{font-size:38px}}@media(max-width:560px){main{padding:16px 12px}.grid,.country-grid,.movie-grid,.zodiac,.lang-grid,.compare,.months,.timeline,.history,.info-grid,.today,.stats{grid-template-columns:1fr!important}.topbar{padding:0 12px;min-height:56px;gap:8px}.nav-search{display:none}.brand strong{font-size:18px}.lang{max-width:88px}.hero{min-height:auto;padding-top:12px}.hero h1{font-size:34px}.hero p{font-size:16px}.hero-panel{min-height:150px;padding:18px}.hero-panel b{font-size:68px}.search{border-radius:8px;padding:10px 12px}.search .suggestions{left:0;right:0}.toolbar input,.toolbar select,.newsletter input{min-width:100%;width:100%}.month{padding:8px}.months.one{grid-template-columns:1fr}.days a,.days span{min-height:32px;font-size:12px}.list article{padding:12px}.poster-art,.poster-img{height:180px}.world-map{font-size:22px;letter-spacing:3px}}`;

const searchData = () => JSON.stringify(allEvents().map(h => ({ name: h.name, url: `/holiday/${h.slug}.html`, text: h.summary })).concat(countries.map(c => ({ name: `${c.name} ${c.code}`, url: `/${c.code}.html`, text: c.next }))).concat(countdowns.map(c => ({ name: c.name, url: "/countdowns.html", text: c.place }))));
const appJs = `const data=${searchData()};
const lang=new URLSearchParams(location.search).get('lang');if(lang&&['es','pt','fr','de','ja','zh'].includes(lang)&&!location.pathname.startsWith('/'+lang+'/')){location.replace('/'+lang+location.pathname.replace(/\\/$/,'/index.html'))}
document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));
document.querySelector('.lang')?.addEventListener('change',e=>{location.href=e.target.value});
function tick(){document.querySelectorAll('[data-countdown]').forEach(el=>{const start=el.dataset.start?new Date(el.dataset.start+'T00:00:00Z'):null;const end=new Date(el.dataset.countdown+'T00:00:00Z');const now=new Date();const t=end-now;const live=start&&now>=start&&now<=end;const ended=t<0;if(live){el.classList.add('is-live')}if(ended){el.classList.add('is-ended')}const d=Math.max(0,Math.floor(t/864e5));const h=Math.max(0,Math.floor(t%864e5/36e5));el.querySelector('[data-days]').textContent=d;el.querySelector('[data-hours]').textContent=h})}tick();setInterval(tick,60000);
document.querySelectorAll('[data-ics]').forEach(btn=>btn.addEventListener('click',()=>{const [name,date,place]=btn.dataset.ics.split('|');const dt=date.replaceAll('-','');const end=new Date(date+'T00:00:00Z');end.setUTCDate(end.getUTCDate()+1);const dtEnd=end.toISOString().slice(0,10).replaceAll('-','');const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,'-');const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//GlobalTick//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT','UID:'+dt+'-'+slug+'@globaltick.xyz','DTSTAMP:'+dt+'T000000Z','DTSTART;VALUE=DATE:'+dt,'DTEND;VALUE=DATE:'+dtEnd,'SUMMARY:'+name,'LOCATION:'+place,'DESCRIPTION:GlobalTick calendar export for '+name+' in '+place,'END:VEVENT','END:VCALENDAR'].join('\\r\\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar;charset=utf-8'}));a.download=slug+'.ics';a.click();URL.revokeObjectURL(a.href)}));
function wireSearch(sel){document.querySelectorAll(sel).forEach(input=>{const box=input.parentElement.querySelector('[data-suggestions]');input.addEventListener('input',()=>{const q=input.value.toLowerCase().trim();if(!q){box.style.display='none';box.innerHTML='';return}box.innerHTML=data.filter(x=>(x.name+' '+x.text).toLowerCase().includes(q)).slice(0,8).map(x=>'<a href=\"'+x.url+'\"><b>'+x.name+'</b><br><small>'+x.text+'</small></a>').join('');box.style.display=box.innerHTML?'block':'none'})})}wireSearch('[data-search]');wireSearch('[data-search-small]');
document.querySelector('[data-country-filter]')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('[data-country]').forEach(card=>card.style.display=card.dataset.country.toLowerCase().includes(q)?'':'none')});
document.querySelector('[data-newsletter]')?.addEventListener('submit',e=>{e.preventDefault();const email=e.currentTarget.querySelector('input').value.trim();if(!email)return;localStorage.setItem('globaltick-newsletter-email',email);e.currentTarget.querySelector('output').textContent='Subscription request prepared: '+email;const subject=encodeURIComponent('GlobalTick newsletter subscription');const body=encodeURIComponent('Please subscribe '+email+' to GlobalTick planning notes.');setTimeout(()=>{location.href='mailto:hello@globaltick.xyz?subject='+subject+'&body='+body},250)});`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#1e3a5f"/><circle cx="64" cy="64" r="43" fill="none" stroke="#4ecdc4" stroke-width="8"/><path d="M21 64h86M64 21c16 15 24 29 24 43s-8 28-24 43M64 21C48 36 40 50 40 64s8 28 24 43" fill="none" stroke="#4ecdc4" stroke-width="6" stroke-linecap="round"/><text x="64" y="80" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="58" font-weight="800" fill="#fff">G</text></svg>`;

async function write(route, html) {
  const file = path.join(dist, route || "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}
async function page(lang, route, active, title, desc, body, jsonLd) {
  await write(languages[lang].dir ? `${languages[lang].dir}/${route || "index.html"}` : route || "index.html", layout({ lang, route, active, title, description: desc, body, jsonLd }));
}
function routeFromCanonical(url) {
  const pathname = new URL(url).pathname.replace(/^\/+/, "");
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && languages[parts[0]]) parts.shift();
  const route = parts.join("/");
  return route === "" || route === "index.html" ? "" : route;
}
function sitemapAlternates(route) {
  return Object.keys(languages).map(code => `    <xhtml:link rel="alternate" hreflang="${code}" href="${canonical(code, route)}"/>`).join("\n") + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical("en", route)}"/>`;
}
async function main() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(path.join(dist, "assets"), { recursive: true });
  await writeFile(path.join(dist, "assets/main.css"), css);
  await writeFile(path.join(dist, "assets/app.js"), appJs);
  await writeFile(path.join(dist, "assets/favicon.svg"), faviconSvg);
  await writeFile(path.join(dist, "assets/apple-touch-icon.svg"), faviconSvg);
  if (existsSync(path.join(root, "data"))) {
    await cp(path.join(root, "data"), path.join(dist, "data"), { recursive: true });
  }
  await writeFile(path.join(dist, "ads.txt"), adsText);
  await writeFile(path.join(dist, "CNAME"), "globaltick.xyz\n");
  await writeFile(path.join(root, "ads.txt"), adsText);
  await writeFile(path.join(root, "CNAME"), "globaltick.xyz\n");
  const urls = [];
  for (const lang of Object.keys(languages)) {
    for (const [id, route, renderer] of pageDefs) {
      await page(lang, route, id, `${id === "index" ? "GlobalTick" : c(lang)[`${renderer}Title`] || id.replaceAll("-", " ")} | 2026 Global Holidays & Events Calendar`, c(lang).homeText, renderers[renderer](lang), { "@context": "https://schema.org", "@type": "WebPage", name: "GlobalTick", url: canonical(lang, route), inLanguage: lang });
      urls.push(canonical(lang, route));
    }
    for (let m = 1; m <= 12; m++) {
      const route = `month/2026-${String(m).padStart(2, "0")}.html`;
      await page(lang, route, "2026-calendar", `2026-${String(m).padStart(2, "0")} Global Events | GlobalTick`, "Monthly global holiday and events calendar for 2026.", monthPage(lang, m), { "@context": "https://schema.org", "@type": "CollectionPage", name: `2026-${m} global events`, url: canonical(lang, route), inLanguage: lang });
      urls.push(canonical(lang, route));
    }
    for (const h of holidays) {
      const route = `holiday/${h.slug}.html`;
      await page(lang, route, "countries", `${local(h, lang)} 2026 Date, Countries & Countdown | GlobalTick`, `${local(h, lang)} 2026 date, related countries, cultural context, countdown and calendar export.`, holidayPage(lang, h), { "@context": "https://schema.org", "@type": "Event", name: `${local(h, lang)} 2026`, startDate: h.date, endDate: h.date, eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled", additionalType: "PublicHoliday", eventType: h.type, isAccessibleForFree: true, keywords: [`${h.name} 2026`, h.type, "global holidays", "calendar export"], image: `${site}/assets/favicon.svg`, organizer: { "@type": "Organization", name: "GlobalTick", url: site }, location: { "@type": "Place", name: h.countries }, description: local(h, lang, "summary"), url: canonical(lang, route) });
      urls.push(canonical(lang, route));
    }
    for (const cn of countries) {
      const route = `country/${cn.code.toLowerCase()}.html`;
      await page(lang, route, "countries", `${cn.name} Public Holidays 2026 | GlobalTick`, `Browse ${cn.name} public holidays, next holiday and 2026 planning dates.`, countryPage(lang, cn), { "@context": "https://schema.org", "@type": "CollectionPage", name: `${cn.name} holidays 2026`, url: canonical(lang, route), inLanguage: lang });
      urls.push(canonical(lang, route));
      const legacy = `${cn.code}.html`;
      await page(lang, legacy, "countries", `${cn.name} Public Holidays 2026 | GlobalTick`, `Legacy URL for ${cn.name} public holidays and 2026 planning dates.`, countryPage(lang, cn), { "@context": "https://schema.org", "@type": "CollectionPage", name: `${cn.name} holidays 2026`, url: canonical(lang, legacy), inLanguage: lang });
      urls.push(canonical(lang, legacy));
    }
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.map(u => {
    const route = routeFromCanonical(u);
    return `  <url><loc>${u}</loc>\n${sitemapAlternates(route)}\n    <lastmod>${buildDate}</lastmod><changefreq>weekly</changefreq><priority>${route === "" ? "1.0" : "0.7"}</priority></url>`;
  }).join("\n")}\n</urlset>\n`;
  await writeFile(path.join(dist, "sitemap.xml"), sitemap);
  await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
  await cp(path.join(dist, "sitemap.xml"), path.join(root, "sitemap.xml"));
  await cp(path.join(dist, "robots.txt"), path.join(root, "robots.txt"));
  console.log(`Built ${urls.length} localized pages into dist/`);
}
main().catch(err => { console.error(err); process.exit(1); });
