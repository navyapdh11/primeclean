'use client';

import { useState } from 'react';

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: { value: number; positive: boolean };
  color?: string;
  span?: string;
}

export function BentoCard({ title, value, subtitle, icon, trend, color = 'primary', span = '' }: BentoCardProps) {
  const colorClasses: Record<string, string> = {
    primary: 'from-primary-500 to-primary-600',
    accent: 'from-accent-500 to-accent-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600',
  };

  const gradient = colorClasses[color] || colorClasses.primary;

  return (
    <div
      className={`relative rounded-2xl p-5 text-white overflow-hidden ${span} shadow-lg`}
      style={{
        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
        boxShadow: '8px 8px 16px rgba(0,0,0,0.15), -4px -4px 12px rgba(255,255,255,0.1) inset',
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium opacity-90">{title}</span>
          {icon && <span className="text-2xl" role="img" aria-hidden="true">{icon}</span>}
        </div>
        <p className="text-3xl font-bold">{value}</p>
        {subtitle && <p className="text-sm mt-1 opacity-80">{subtitle}</p>}
        {trend && (
          <div className="flex items-center mt-2 text-sm">
            <span className={trend.positive ? 'text-green-200' : 'text-red-200'}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            <span className="ml-1 opacity-70">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface MetricRowProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

export function MetricBar({ label, value, total, color }: MetricRowProps) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-700">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

interface RecommendationProps {
  id: string;
  text: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  applied?: boolean;
}

export function RecommendationCard({ rec, onApply, applying }: { rec: RecommendationProps; onApply: (id: string) => void; applying: boolean }) {
  const impactColors = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-green-100 text-green-700' };

  return (
    <div className={`p-4 rounded-xl border transition-all ${rec.applied ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${impactColors[rec.impact]}`}>
              {rec.impact} impact
            </span>
            <span className="text-xs text-gray-500">{rec.category}</span>
          </div>
          <p className="text-sm text-gray-800">{rec.text}</p>
        </div>
        {rec.applied ? (
          <span className="text-green-600 text-sm font-medium flex-shrink-0">✅ Applied</span>
        ) : (
          <button
            onClick={() => onApply(rec.id)}
            disabled={applying}
            className="flex-shrink-0 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {applying ? 'Applying...' : 'Apply'}
          </button>
        )}
      </div>
    </div>
  );
}
