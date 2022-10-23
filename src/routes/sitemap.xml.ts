import type { RequestHandler } from '@sveltejs/kit';
import { getAllPosts } from '$lib/posts';
import { base } from '$app/paths';

export const GET: RequestHandler = async ({ url }) => {
    const posts = await getAllPosts();
    const pages = [{ path: '/tags' }];

    const headers = {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml',
    };

    const { origin } = url;

    return {
        headers,
        body: `<?xml version="1.0" encoding="UTF-8" ?>
        <urlset
          xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
          xmlns:xhtml="https://www.w3.org/1999/xhtml"
          xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
          xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
          xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
        >
          <url>
            <loc>https://${origin}</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
          </url>
          ${pages.map(
              (page) => `<url>
            <loc>https://${origin}${base}${page.path}</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
        </url>`,
          )}
          ${posts
              .map(
                  (post) =>
                      `<url>
            <loc>https://${origin}${base}/posts/${post.slug}</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
          </url>
          `,
              )
              .join('')}
        </urlset>`,
    };
};
