"use client";

import ReactMarkdown from "react-markdown";
import { CheckSquare, AlertTriangle, BookOpen, Link } from "lucide-react";

export default function BriefResult({ brief, sources }) {
  if (!brief) return null;

  return (
    <div className="flex flex-col gap-6 mt-8">
      {/* Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <BookOpen size={18} /> Summary
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{brief.summary}</p>
      </div>

      {/* Key Points */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Key Points</h3>
        <div className="flex flex-col gap-4">
          {brief.keyPoints.map((kp, i) => (
            <div key={i} className="border-l-4 border-gray-300 pl-4">
              <p className="text-sm text-gray-800 font-medium">{kp.point}</p>
              <p className="text-xs text-gray-400 mt-1 italic">
                &ldquo;{kp.snippet}&rdquo;
              </p>
              {sources?.[kp.sourceIndex] && (
                <a
                  href={sources[kp.sourceIndex].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline mt-1 flex items-center gap-1"
                >
                  <Link size={11} /> {sources[kp.sourceIndex].title}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conflicting Claims */}
      {brief.conflictingClaims?.length > 0 && (
        <div className="bg-white rounded-2xl border border-orange-200 shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-orange-400" /> Conflicting
            Claims
          </h3>
          <div className="flex flex-col gap-4">
            {brief.conflictingClaims.map((c, i) => (
              <div key={i} className="bg-orange-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-orange-700 mb-2">
                  {c.topic}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Source {c.source1Index + 1} says:
                    </p>
                    <p className="text-sm text-gray-700">{c.claim1}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Source {c.source2Index + 1} says:
                    </p>
                    <p className="text-sm text-gray-700">{c.claim2}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What to Verify */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <CheckSquare size={18} /> What to Verify
        </h3>
        <ul className="flex flex-col gap-2">
          {brief.whatToVerify.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <span className="mt-0.5 w-4 h-4 rounded border border-gray-300 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Sources Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Sources Used</h3>
        <div className="flex flex-col gap-3">
          {brief.sourceSummaries.map((ss, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                  Source {ss.sourceIndex + 1}
                </span>
                {sources?.[ss.sourceIndex] && (
                  <a
                    href={sources[ss.sourceIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline truncate"
                  >
                    {sources[ss.sourceIndex].title}
                  </a>
                )}
              </div>
              <p className="text-xs text-gray-500">
                <span className="font-medium">Used for:</span> {ss.usedFor}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">Key contribution:</span>{" "}
                {ss.keyContribution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
