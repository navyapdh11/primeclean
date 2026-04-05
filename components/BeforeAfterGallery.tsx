'use client';

import { useState } from 'react';

interface PhotoPair {
  before: { url: string; alt?: string };
  after: { url: string; alt?: string };
  label?: string;
}

interface BeforeAfterGalleryProps {
  pairs: PhotoPair[];
}

export default function BeforeAfterGallery({ pairs }: BeforeAfterGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  if (pairs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="mt-2 text-gray-600">No before/after photos available</p>
      </div>
    );
  }

  const current = pairs[activeIndex];

  return (
    <div className="space-y-6">
      {/* Main Comparison */}
      <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden select-none">
        {/* After (background) */}
        <div className="absolute inset-0">
          <img src={current.after.url} alt={current.after.alt || 'After'} className="w-full h-full object-cover" />
          <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">AFTER</span>
        </div>

        {/* Before (clipped) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          <img src={current.before.url} alt={current.before.alt || 'Before'} className="w-full h-full object-cover" />
          <span className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">BEFORE</span>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPos}%` }}
          onMouseDown={(e) => {
            const rect = (e.target as HTMLElement).parentElement?.getBoundingClientRect();
            if (!rect) return;
            const handleMove = (ev: MouseEvent) => {
              const pos = ((ev.clientX - rect.left) / rect.width) * 100;
              setSliderPos(Math.max(5, Math.min(95, pos)));
            };
            const handleUp = () => {
              document.removeEventListener('mousemove', handleMove);
              document.removeEventListener('mouseup', handleUp);
            };
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleUp);
          }}
          role="slider"
          aria-label="Before/After comparison slider"
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(5, p - 5));
            if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(95, p + 5));
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Label */}
      {current.label && (
        <p className="text-center text-sm text-gray-600">{current.label}</p>
      )}

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {pairs.map((pair, i) => (
          <button
            key={i}
            onClick={() => { setActiveIndex(i); setSliderPos(50); }}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              i === activeIndex ? 'border-primary-600' : 'border-gray-200 hover:border-gray-400'
            }`}
            aria-label={`View comparison ${i + 1}`}
          >
            <img src={pair.after.url} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
