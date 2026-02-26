import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Brief from '../../../models/Briefs';

//fetch last 5 briefs
export async function GET() {
  try {
    await connectDB();

    const briefs = await Brief.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-__v');

    return NextResponse.json({ briefs });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST - save new brief
export async function POST(request) {
  try {
    await connectDB();

    const { links, sources, brief } = await request.json();

    // basic validation
    if (!links || !sources || !brief) {
      return NextResponse.json(
        { error: 'links, sources and brief are required' },
        { status: 400 }
      );
    }

    // save new brief
    const newBrief = await Brief.create({ links, sources, brief });
    // keep only last 5 — delete older ones
    const allBriefs = await Brief.find().sort({ createdAt: -1 }).select('_id');
    if (allBriefs.length > 5) {
      const toDelete = allBriefs.slice(5).map((b) => b._id);
      await Brief.deleteMany({ _id: { $in: toDelete } });
    }

    return NextResponse.json(
      { message: 'Brief saved successfully', brief: newBrief },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
