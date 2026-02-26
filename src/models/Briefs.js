import mongoose from 'mongoose';

const BriefSchema = new mongoose.Schema(
  {
    links: [String],
    sources: [
      {
        url: String,
        title: String,
        success: Boolean,
        error: String,
      },
    ],
    brief: {
      summary: String,
      keyPoints: [
        {
          point: String,
          sourceIndex: Number,
          snippet: String,
        },
      ],
      conflictingClaims: [
        {
          topic: String,
          claim1: String,
          source1Index: Number,
          claim2: String,
          source2Index: Number,
        },
      ],
      whatToVerify: [String],
      sourceSummaries: [
        {
          sourceIndex: Number,
          usedFor: String,
          keyContribution: String,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Brief || mongoose.model('Brief', BriefSchema);