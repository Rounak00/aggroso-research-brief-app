import { NextResponse } from 'next/server';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export async function POST(request) {
  try {
    const { links } = await request.json();
    if (!links || !Array.isArray(links) || links.length === 0) {
      return NextResponse.json(
        { error: 'Please provide an array of links' },
        { status: 400 }
      );
    }

    if (links.length < 2 || links.length > 10) {
      return NextResponse.json(
        { error: 'Please provide between 2 and 10 links' },
        { status: 400 }
      );
    }

    const results = await Promise.allSettled(
      links.map((url) => fetchAndClean(url))
    );

    const sources = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          url: links[index],
          title: 'Failed to fetch',
          content: '',
          error: result.reason?.message || 'Unknown error',
          success: false,
        };
      }
    });

    const successCount = sources.filter((s) => s.success).length;

    if (successCount === 0) {
      return NextResponse.json(
        { error: 'All links failed to fetch. Please check your URLs.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ sources, successCount });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

async function fetchAndClean(url) {
  try { // basic url validation
    new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }

  const response = await axios.get(url, {
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; ResearchBriefBot/1.0)',
    },
  });

  const dom = new JSDOM(response.data, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article) {
    throw new Error(`Could not extract content from ${url}`);
  }

  const trimmedContent = article.textContent   // trim content to avoid huge tokens
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 8000);

  return {
    url,
    title: article.title || 'No title',
    content: trimmedContent,
    success: true,
  };
}