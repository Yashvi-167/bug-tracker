import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bugs, sessions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, severity, sessionId } = body;

    if (!title || !description || !severity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Create the bug record
    const [newBug] = await db.insert(bugs).values({
      title,
      description,
      severity,
      status: 'open',
      createdAt: new Date(),
    }).returning();

    // 2. If a session ID was provided, link it to the bug
    if (sessionId) {
      await db.update(sessions)
        .set({ bugId: newBug.id })
        .where(eq(sessions.id, sessionId));
    }

    return NextResponse.json(newBug);
  } catch (error: any) {
    console.error('Bug creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
    try {
      const allBugs = await db.query.bugs.findMany({
        orderBy: (bugs, { desc }) => [desc(bugs.createdAt)],
      });
      return NextResponse.json(allBugs);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
