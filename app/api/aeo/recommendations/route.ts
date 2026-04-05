export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET() {
  const recommendations = [
    { id: '1', text: 'Add FAQ schema markup to services page to improve featured snippet chances for "deep cleaning vs standard clean"', impact: 'high' as const, category: 'Schema', applied: false },
    { id: '2', text: 'Create dedicated page for "move out cleaning checklist" — currently ranking #2, could win snippet at #1', impact: 'high' as const, category: 'Content', applied: false },
    { id: '3', text: 'Add structured data (LocalBusiness) with operating hours to improve Google Business visibility', impact: 'high' as const, category: 'Schema', applied: false },
    { id: '4', text: 'Optimize meta descriptions for booking page to improve CTR from search results', impact: 'medium' as const, category: 'On-Page SEO', applied: false },
    { id: '5', text: 'Add before/after photo alt text with target keywords for image search visibility', impact: 'medium' as const, category: 'Image SEO', applied: false },
    { id: '6', text: 'Create "How much does cleaning cost in Australia?" blog post targeting pricing queries in AI responses', impact: 'medium' as const, category: 'Content', applied: false },
    { id: '7', text: 'Improve page load speed — current LCP is 2.8s, target under 2.5s for better rankings', impact: 'low' as const, category: 'Performance', applied: false },
  ];

  return NextResponse.json({ recommendations });
}
