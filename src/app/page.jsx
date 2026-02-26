'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import LinkInput from '@/components/LinkInput';
import BriefResult from '@/components/BriefResult';
import BriefCard from '@/components/BriefCard';

export default function Home() {
  const [currentBrief, setCurrentBrief] = useState(null);
  const [currentSources, setCurrentSources] = useState(null);
  const [pastBriefs, setPastBriefs] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/briefs`);
      const data = await res.json();
      setPastBriefs(data.briefs || []);
    } catch {
      //silent fail
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleBriefGenerated = (savedBrief) => {
    setCurrentBrief(savedBrief.brief);
    setCurrentSources(savedBrief.sources);
    fetchHistory(); // refresh history
    // scroll to result
    setTimeout(() => {
      document.getElementById('brief-result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleHistoryClick = (b) => {
    setCurrentBrief(b.brief);
    setCurrentSources(b.sources);
    setTimeout(() => {
      document.getElementById('brief-result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Research Brief Generator</h1>
          <p className="text-gray-400 text-sm">Paste links → get an AI-powered research brief with citations</p>
        </div>

        {/* Link Input */}
        <LinkInput onBriefGenerated={handleBriefGenerated} />

        {/* Brief Result */}
        <div id="brief-result">
          {currentBrief && (
            <BriefResult brief={currentBrief} sources={currentSources} />
          )}
        </div>

        {/* Past Briefs */}
        <div className="mt-12">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Recent Briefs</h2>

          {loadingHistory && (
            <p className="text-sm text-gray-400">Loading history...</p>
          )}

          {!loadingHistory && pastBriefs.length === 0 && (
            <p className="text-sm text-gray-400">No briefs yet. Generate your first one above!</p>
          )}

          <div className="flex flex-col gap-3">
            {pastBriefs.map((b) => (
              <BriefCard
                key={b._id}
                brief={b}
                onClick={() => handleHistoryClick(b)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}