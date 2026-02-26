'use client';

import { Info, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import InfoCard from './InfoCard';
import HealthCard from './HealthCard';

export default function Navbar() {
  const [showInfo, setShowInfo] = useState(false);
  const [showHealth, setShowHealth] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-gray-800">ResearchBrief</span>
        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">AI</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Health icon */}
        <div className="relative" onMouseLeave={() => setShowHealth(false)}>
          <button
            onMouseEnter={() => setShowHealth(true)}
            onClick={() => setShowHealth(!showHealth)}
            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500 hover:text-gray-800"
            title="Health Check"
          >
            <Globe size={20} />
          </button>
          {showHealth && <HealthCard />}
        </div>

        {/* Info icon */}
        <div className="relative" onMouseLeave={() => setShowInfo(false)}>
          <button
            onMouseEnter={() => setShowInfo(true)}
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500 hover:text-gray-800"
            title="How to use"
          >
            <Info size={20} />
          </button>
          {showInfo && <InfoCard />}
        </div>
      </div>
    </nav>
  );
}