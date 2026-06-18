import { spawnSync } from "node:child_process";

const schedule = process.argv[2] || process.env.SCHEDULE || "";
const map = {
  "0 3 * * *": ["sync_global_holidays"],
  "0 4 * * 1": ["sync_movies_tmdb"],
  "0 5 * * 3": ["sync_sports_events"],
  "0 6 1 * *": ["sync_tech_events"],
  "0 5 * * *": ["gen_daily_horoscope"],
  "30 5 * * *": ["gen_today_in_history"],
  "15 5 * * *": ["gen_daily_chinese_zodiac"],
  "0 6 * * *": ["sync_i18n_content"],
  "0 7 * * 0": ["gen_multilang_holiday_pages"],
  "0 8 * * 0": ["gen_sitemap_and_schema"],
  "0 9 * * 6": ["expand_country_pages"],
  "0 10 15 * *": ["sync_marketing_calendar"]
};

const tasks = map[schedule] || (process.argv.slice(2).length ? process.argv.slice(2) : ["sync_i18n_content", "gen_sitemap_and_schema"]);
for (const task of tasks) {
  const result = spawnSync("node", ["scripts/tasks.mjs", task], { stdio: "inherit", env: process.env });
  if (result.status) process.exit(result.status);
}
