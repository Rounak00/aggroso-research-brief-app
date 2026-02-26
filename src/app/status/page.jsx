'use client';

import { useEffect, useState } from 'react';
import StatusCard from '../../components/statusCard';

export default function StatusPage() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">System Status</h1>
      <p className="text-gray-500 mb-8">Live health check of all services</p>

      {loading && <p className="text-gray-400">Checking services...</p>}

      {!loading && health && (
        <>
          <div className="mb-6">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${health.status === 'ok' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
              Overall: {health.status.toUpperCase()}
            </span>
            <span className="text-xs text-gray-400 ml-3">{health.timestamp}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusCard
              title="Server"
              status={health.services.server.status}
              message="Next.js API is running"
            />
            <StatusCard
              title="Database"
              status={health.services.database.status}
              message={health.services.database.message}
            />
            <StatusCard
              title="LLM (Groq)"
              status={health.services.llm.status}
              message={health.services.llm.message}
            />
          </div>
        </>
      )}

      {!loading && !health && (
        <p className="text-red-500">Could not reach health endpoint.</p>
      )}
    </div>
  );
}