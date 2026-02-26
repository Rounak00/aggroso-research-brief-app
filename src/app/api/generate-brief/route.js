import { NextResponse } from 'next/server';
import groq from '../../../lib/groq';

export async function POST(request) {
  try {
    const { sources } = await request.json();

    if (!sources || sources.length === 0) {
      return NextResponse.json(
        { error: 'No sources provided' },
        { status: 400 }
      );
    }

    const validSources = sources.filter((s) => s.success && s.content);

    if (validSources.length === 0) {
      return NextResponse.json(
        { error: 'No valid sources to generate brief from' },
        { status: 400 }
      );
    }

    // build context for LLM
    const context = validSources
      .map((s, i) => `SOURCE ${i + 1}: ${s.title}\nURL: ${s.url}\n\n${s.content}`)
      .join('\n\n---\n\n');

    const prompt = `You are a research assistant. Based on the following sources, generate a structured research brief.

${context}

Return a JSON object with this exact structure:
{
  "summary": "2-3 paragraph overall summary of all sources combined",
  "keyPoints": [
    {
      "point": "key insight or finding",
      "sourceIndex": 0,
      "snippet": "exact short quote or phrase from source that supports this"
    }
  ],
  "conflictingClaims": [
    {
      "topic": "topic where sources disagree",
      "claim1": "what source X says",
      "source1Index": 0,
      "claim2": "what source Y says",
      "source2Index": 1
    }
  ],
  "whatToVerify": [
    "specific claim or stat that needs fact checking",
    "another item to verify"
  ],
  "sourceSummaries": [
    {
      "sourceIndex": 0,
      "usedFor": "brief description of what was used from this source",
      "keyContribution": "main thing this source added to the brief"
    }
  ]
}

Rules:
- keyPoints should have 5-8 points
- conflictingClaims can be empty array if no conflicts found
- whatToVerify should have 3-5 items
- sourceSummaries should have one entry per source
- Return ONLY the JSON, no extra text`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 3000,
      temperature: 0.3,
    });

    const rawResponse = completion.choices[0].message.content;
    // safely parse JSON
    let brief;
    try {
      // strip markdown code blocks if LLM wraps in ```json
      const cleaned = rawResponse.replace(/```json|```/g, '').trim();
      brief = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: 'LLM returned invalid JSON. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ brief });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}