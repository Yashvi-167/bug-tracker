import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bugs, sessions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch bug and associated session
    const bugRecord = await db.query.bugs.findFirst({
      where: eq(bugs.id, id),
    });

    if (!bugRecord) {
      return NextResponse.json({ error: 'Bug not found' }, { status: 404 });
    }

    const sessionRecord = await db.query.sessions.findFirst({
      where: eq(sessions.bugId, id),
    });

    // If session has events in Vercel Blob, fetch them
    let events: any[] = [];
    if (sessionRecord?.blobUrl) {
      const response = await fetch(sessionRecord.blobUrl);
      if (response.ok) {
        events = await response.json();
      }
    }

    return NextResponse.json({
      bug: bugRecord,
      session: sessionRecord,
      events: events,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
