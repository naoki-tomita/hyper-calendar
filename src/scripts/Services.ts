import { RSSItem } from "./Types/Types";

async function fetchRSS(url: string) {
  const q = `select * from rss(5) where url='${encodeURIComponent(url)}'`
  return fetch(`https://query.yahooapis.com/v1/public/yql?q=${q}&format=json`, { cache: "no-cache" });
}

export async function fetchAll(rsss: Array<{ url: string }>) {
  const pages: RSSItem[] = [];
  for (let rss of rsss) {
    const result = await fetchRSS(rss.url);
    if (result.ok) {
      const json = await result.json();
      if (Array.isArray(json.query.results.item)) {
        pages.push(...json.query.results.item);
      }
    }
  }
  return pages;
}