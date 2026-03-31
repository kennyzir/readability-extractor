// ClawHub Local Skill - runs entirely in your agent, no API key required
// Readability Extractor - Strip ads/nav from articles, return clean reading content

function extractReadableContent(html: string): { title: string; content: string; excerpt: string; wordCount: number } {
  const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = ogTitle?.[1] || titleMatch?.[1]?.trim() || '';

  let clean = html;
  clean = clean.replace(/<script[\s\S]*?<\/script>/gi, '');
  clean = clean.replace(/<style[\s\S]*?<\/style>/gi, '');
  clean = clean.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  clean = clean.replace(/<header[\s\S]*?<\/header>/gi, '');
  clean = clean.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  clean = clean.replace(/<aside[\s\S]*?<\/aside>/gi, '');
  clean = clean.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');
  clean = clean.replace(/<!--[\s\S]*?-->/g, '');

  const articleMatch = clean.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const mainMatch = clean.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const contentBlock = articleMatch?.[1] || mainMatch?.[1] || clean;

  let text = contentBlock;
  text = text.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, '\n\n$1\n\n');
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '• $1\n');
  text = text.replace(/<[^>]+>/g, '');
  text = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  const words = text.split(/\s+/).filter(w => w.length > 0);
  const excerpt = text.substring(0, 300).replace(/\s+\S*$/, '') + '...';
  return { title, content: text, excerpt, wordCount: words.length };
}

export async function run(input: { url?: string; html?: string }) {
  if (!input.url && !input.html) throw new Error('Either url or html is required');

  const startTime = Date.now();
  let rawHtml: string;
  let sourceUrl: string | null = null;

  if (input.url) {
    const response = await fetch(input.url, {
      headers: { 'User-Agent': 'Claw0x-Reader/1.0', 'Accept': 'text/html' },
      redirect: 'follow', signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    rawHtml = await response.text();
    sourceUrl = response.url;
  } else {
    rawHtml = input.html!;
  }

  const result = extractReadableContent(rawHtml);
  return {
    ...result, source: sourceUrl || 'inline',
    _meta: { skill: 'readability-extractor', latency_ms: Date.now() - startTime, html_size: rawHtml.length },
  };
}

export default run;
