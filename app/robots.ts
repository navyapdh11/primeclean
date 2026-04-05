import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === 'production';

  return {
    rules: isProduction
      ? { userAgent: '*', allow: '/', disallow: ['/dashboard/', '/api/'] }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${process.env.NEXT_PUBLIC_URL || 'https://primeclean-orpin.vercel.app'}/sitemap.xml`,
  };
}
