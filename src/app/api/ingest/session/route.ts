import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { db } from '@/lib/db';
import { sessions, events } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { events: rrwebEvents, sessionId, url, userAgent } = body;

    if (!rrwebEvents || !sessionId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // 1. Check if session exists in DB
    let sessionRecord = await db.query.sessions.findFirst({
      where: eq(sessions.id, sessionId),
    });

    if (!sessionRecord) {
      // Create a draft session
      [sessionRecord] = await db.insert(sessions).values({
        id: sessionId,
        url: url,
        browser: userAgent, // Simplified parsing
        createdAt: new Date(),
      }).returning();
    }

    // 2. Upload events to Vercel Blob
    // In a production app, we would append to an existing blob or use a more complex chunking strategy.
    // For this demonstration, we'll store the latest batch as a new blob and update the session record.
    // (Optimization: In a real startup, we'd use a message queue like Upstash QStash)
    
    const blob = await put(`sessions/${sessionId}/${Date.now()}.json`, JSON.stringify(rrwebEvents), {
      access: 'public',
      contentType: 'application/json',
    });

    // 3. Link blob to session
    // We update the session with the latest blob URL (or append to a list)
    await db.update(sessions)
      .set({ blobUrl: blob.url })
      .where(eq(sessions.id, sessionId));

    // 4. Record specific events (console errors, etc.) for analytics if they exist in rrweb custom events
    const customEvents = rrwebEvents.filter((e: any) => e.type === 5); // rrweb.EventType.Custom is 5
    for (const ce of customEvents) {
      if (ce.data.tag === 'console_error' || ce.data.tag === 'error') {
        await db.insert(events).values({
          sessionId: sessionId,
          type: ce.data.tag,
          data: ce.data.payload,
          timestamp: new Date(ce.timestamp),
        });
      }
    }

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error: any) {
    console.error('Ingestion error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
