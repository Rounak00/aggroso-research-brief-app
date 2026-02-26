'use client';

import { useState } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';

export default function LinkInput({ onBriefGenerated }) {
  const [links, setLinks] = useState(['', '']);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const addLink = () => {
    if (links.length < 10) setLinks([...links, '']);
  };

  const removeLink = (index) => {
    if (links.length <= 2) return;
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index, value) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
  };

  const handleSubmit = async () => {
    setError('');
    const validLinks = links.filter((l) => l.trim() !== '');

    if (validLinks.length < 2) {
      setError('Please enter at least 2 links.');
      return;
    }

    try {
      setLoading(true);

      //fetch links
      setStatus('Fetching content from links...');
      const fetchRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetch-links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links: validLinks }),
      });
      const fetchData = await fetchRes.json();
      if (!fetchRes.ok) throw new Error(fetchData.error);

      //generate brief
      setStatus('Generating AI research brief...');
      const briefRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate-brief`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sources: fetchData.sources }),
      });
      const briefData = await briefRes.json();
      if (!briefRes.ok) throw new Error(briefData.error);

      //  save brief
      setStatus('Saving brief...');
      const saveRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/briefs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          links: validLinks,
          sources: fetchData.sources,
          brief: briefData.brief,
        }),
      });
      const saveData = await saveRes.json();
      if (!saveRes.ok) throw new Error(saveData.error);

      setStatus('');
      onBriefGenerated(saveData.brief);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Paste your links</h2>
      <p className="text-sm text-gray-400 mb-5">Enter 2–10 article, blog, or doc URLs</p>

      <div className="flex flex-col gap-3 mb-4">
        {links.map((link, index) => (
          <div key={index} className="flex gap-2 items-center">
            <span className="text-xs text-gray-400 w-5 text-right">{index + 1}</span>
            <input
              type="url"
              value={link}
              onChange={(e) => updateLink(index, e.target.value)}
              placeholder="https://example.com/article"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50"
            />
            <button
              onClick={() => removeLink(index)}
              disabled={links.length <= 2}
              className="p-2 text-gray-400 hover:text-red-400 disabled:opacity-30 transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={addLink}
          disabled={links.length >= 10}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 transition"
        >
          <Plus size={16} /> Add link
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition"
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          {loading ? status : 'Generate Brief'}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">{error}</p>
      )}
    </div>
  );
}