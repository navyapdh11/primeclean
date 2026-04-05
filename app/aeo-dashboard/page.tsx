'use client';

import { useState, useEffect } from 'react';
import { BentoCard, MetricBar, RecommendationCard } from '@/components/aeo/BentoCards';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface AICitation {
  platform: string;
  mentions: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  snippets: string[];
}

interface Recommendation {
  id: string;
  text: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  applied: boolean;
}

export default function AEODashboardPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [applying, setApplying] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulated data - would come from GA4 API + AI citation scanner in production
  const ga4Metrics = {
    sessions: 12547,
    conversions: 187,
    conversionRate: 1.49,
    avgEngagementTime: '2m 34s',
    topPages: [
      { path: '/', views: 4521 },
      { path: '/services', views: 2893 },
      { path: '/book', views: 1847 },
      { path: '/photos', views: 987 },
    ],
    trafficSources: [
      { source: 'Organic Search', sessions: 6274 },
      { source: 'Direct', sessions: 3137 },
      { source: 'Social', sessions: 1882 },
      { source: 'Referral', sessions: 1254 },
    ],
  };

  const aiCitations: AICitation[] = [
    { platform: 'ChatGPT', mentions: 34, sentiment: 'positive', snippets: ['PrimeClean offers professional cleaning services in Australia with transparent pricing.'] },
    { platform: 'Perplexity', mentions: 23, sentiment: 'positive', snippets: ['Best rated cleaning service with verified professionals.'] },
    { platform: 'Gemini', mentions: 15, sentiment: 'neutral', snippets: ['PrimeClean provides various cleaning options.'] },
    { platform: 'Copilot', mentions: 8, sentiment: 'positive', snippets: ['Book cleaning services through PrimeClean platform.'] },
  ];

  const featuredSnippets = {
    total: 12,
    won: 7,
    lost: 2,
    tracking: 3,
    keywords: [
      { keyword: 'best cleaning service near me', position: 1, snippet: true },
      { keyword: 'professional home cleaning cost', position: 3, snippet: false },
      { keyword: 'deep cleaning vs standard clean', position: 1, snippet: true },
      { keyword: 'move out cleaning checklist', position: 2, snippet: true },
      { keyword: 'office cleaning services pricing', position: 5, snippet: false },
    ],
  };

  useEffect(() => {
    // Fetch recommendations from API
    fetch('/api/aeo/recommendations')
      .then((res) => res.json())
      .then((data) => {
        if (data.recommendations) setRecommendations(data.recommendations);
        else setRecommendations(getDefaultRecommendations());
        setLoading(false);
      })
      .catch(() => {
        setRecommendations(getDefaultRecommendations());
        setLoading(false);
      });
  }, []);

  const handleApplyRecommendation = async (id: string) => {
    setApplying(id);
    try {
      await fetch('/api/aeo/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setRecommendations((prev) => prev.map((r) => (r.id === id ? { ...r, applied: true } : r)));
    } catch {
      alert('Failed to apply recommendation');
    } finally {
      setApplying(null);
    }
  };

  const totalAiMentions = aiCitations.reduce((sum, c) => sum + c.mentions, 0);
  const totalSessions = ga4Metrics.sessions;
  const totalConversions = ga4Metrics.conversions;

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">AEO Performance Dashboard</h1>
              <p className="text-gray-600 mt-1">AI-powered SEO analytics, citations tracking, and optimization recommendations.</p>
            </div>
            <button
              onClick={() => recommendations.forEach((r) => !r.applied && handleApplyRecommendation(r.id))}
              className="btn-primary"
            >
              Apply All Recommendations
            </button>
          </div>

          {/* Bento Grid - Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <BentoCard title="Total Sessions" value={totalSessions.toLocaleString()} subtitle="Last 30 days" icon="📊" trend={{ value: 12.5, positive: true }} color="primary" />
            <BentoCard title="Conversions" value={totalConversions} subtitle={`${ga4Metrics.conversionRate}% rate`} icon="🎯" trend={{ value: 8.3, positive: true }} color="accent" />
            <BentoCard title="AI Mentions" value={totalAiMentions} subtitle="Across 4 LLMs" icon="🤖" trend={{ value: 23, positive: true }} color="purple" />
            <BentoCard title="Snippet Wins" value={`${featuredSnippets.won}/${featuredSnippets.total}`} subtitle="Featured snippets" icon="⭐" trend={{ value: 5, positive: true }} color="orange" />
          </div>

          {/* Second Row - AI Citations + Traffic */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* AI Citations */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">AI Platform Citations</h2>
              <div className="space-y-4">
                {aiCitations.map((citation) => (
                  <div key={citation.platform} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        citation.sentiment === 'positive' ? 'bg-green-500' : citation.sentiment === 'neutral' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="font-medium">{citation.platform}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold">{citation.mentions}</span>
                      <span className="text-xs text-gray-500">mentions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Traffic Sources (GA4)</h2>
              <div className="space-y-4">
                {ga4Metrics.trafficSources.map((source) => (
                  <MetricBar
                    key={source.source}
                    label={source.source}
                    value={source.sessions}
                    total={totalSessions}
                    color="bg-primary-500"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Featured Snippets */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Featured Snippet Tracking</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-medium text-gray-600">Keyword</th>
                    <th className="text-center py-2 px-3 font-medium text-gray-600">Position</th>
                    <th className="text-center py-2 px-3 font-medium text-gray-600">Snippet</th>
                  </tr>
                </thead>
                <tbody>
                  {featuredSnippets.keywords.map((kw, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2 px-3">{kw.keyword}</td>
                      <td className="text-center py-2 px-3">
                        <span className={`font-bold ${kw.position <= 3 ? 'text-green-600' : 'text-yellow-600'}`}>#{kw.position}</span>
                      </td>
                      <td className="text-center py-2 px-3">
                        {kw.snippet ? (
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">✅ Won</span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">Not yet</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">AI Recommendations</h2>
              <span className="text-sm text-gray-500">
                {recommendations.filter((r) => r.applied).length}/{recommendations.length} applied
              </span>
            </div>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading recommendations...</div>
            ) : (
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <RecommendationCard
                    key={rec.id}
                    rec={rec}
                    onApply={handleApplyRecommendation}
                    applying={applying === rec.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function getDefaultRecommendations(): Recommendation[] {
  return [
    { id: '1', text: 'Add FAQ schema markup to services page to improve featured snippet chances for "deep cleaning vs standard clean"', impact: 'high', category: 'Schema', applied: false },
    { id: '2', text: 'Create dedicated page for "move out cleaning checklist" — currently ranking #2, could win snippet at #1', impact: 'high', category: 'Content', applied: false },
    { id: '3', text: 'Add structured data (LocalBusiness) with operating hours to improve Google Business visibility', impact: 'high', category: 'Schema', applied: false },
    { id: '4', text: 'Optimize meta descriptions for booking page to improve CTR from search results', impact: 'medium', category: 'On-Page SEO', applied: false },
    { id: '5', text: 'Add before/after photo alt text with target keywords for image search visibility', impact: 'medium', category: 'Image SEO', applied: false },
    { id: '6', text: 'Create "How much does cleaning cost in Australia?" blog post targeting pricing queries in AI responses', impact: 'medium', category: 'Content', applied: false },
    { id: '7', text: 'Improve page load speed — current LCP is 2.8s, target under 2.5s for better rankings', impact: 'low', category: 'Performance', applied: false },
  ];
}
