'use client';

import { Clock, ChevronRight } from 'lucide-react';

export default function BriefCard({ brief, onClick }) {
  const date = new Date(brief.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:shadow-md hover:border-gray-300 transition group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {brief.brief?.summary?.slice(0, 80)}...
          </p>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
            <Clock size={11} />
            {date} · {brief.links?.length} links
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition mt-1 shrink-0" />
      </div>
    </div>
  );
}