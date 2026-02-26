'use client';

import { useEffect, useState } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function HealthCard() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`)
      .then((r) => r.json())
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const services = health
    ? [
        { name: 'Server', status: health.services.server.status },
        { name: 'Database', status: health.services.database.status },
        { name: 'LLM (Groq)', status: health.services.llm.status },
      ]
    : [];

  return (
    <div className="absolute right-0 top-10 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl p-5 z-50">
      <h3 className="font-semibold text-gray-800 mb-4 text-base">Health Check</h3> 

      {loading && (
        <div className="flex items-center gap-2 text-gray-400">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Checking services...</span>
        </div>
      )}

      {!loading && health && (
        <div className="flex flex-col gap-2">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{s.name}</span>
              {s.status === 'ok' ? (
                <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                  <CheckCircle size={14} /> OK
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 text-xs font-medium">
                  <XCircle size={14} /> Error
                </span>
              )}
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-100">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${health.status === 'ok' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              Overall: {health.status.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {!loading && !health && (
        <p className="text-sm text-red-500">Could not reach health endpoint.</p>
      )}
    </div>
  );
}