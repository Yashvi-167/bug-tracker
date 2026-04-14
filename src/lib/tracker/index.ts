import * as rrweb from 'rrweb';
import { eventWithTime } from 'rrweb/lib/types';

type TrackerConfig = {
  endpoint: string;
  batchInterval?: number;
};

class BugTracker {
  private events: eventWithTime[] = [];
  private endpoint: string;
  private batchInterval: number;
  private stopFn: (() => void) | null = null;
  private isRecording = false;

  constructor(config: TrackerConfig) {
    this.endpoint = config.endpoint;
    this.batchInterval = config.batchInterval || 5000;
  }

  public init() {
    if (typeof window === 'undefined' || this.isRecording) return;

    this.isRecording = true;
    
    // Start recording DOM changes
    this.stopFn = rrweb.record({
      emit: (event) => {
        this.events.push(event);
      },
      // Configure masking for privacy
      maskAllInputs: true,
    }) || null;

    // Monitor console errors
    this.initConsoleInterception();
    
    // Check for network errors via periodic interval or Fetch/XHR monkeypatch
    // For simplicity, we'll start with global error handling
    window.addEventListener('error', (event) => {
      this.pushCustomEvent('error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.pushCustomEvent('unhandledrejection', {
        reason: event.reason,
      });
    });

    // Start batching
    setInterval(() => this.flush(), this.batchInterval);
  }

  private initConsoleInterception() {
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      this.pushCustomEvent('console_error', { args: Array.from(args).map(String) });
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      this.pushCustomEvent('console_warn', { args: Array.from(args).map(String) });
      originalWarn.apply(console, args);
    };
  }

  public pushCustomEvent(type: string, payload: any) {
    rrweb.record.addCustomEvent(type, payload);
  }

  private async flush() {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events: eventsToSend,
          sessionId: this.getSessionId(),
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (err) {
      console.error('Failed to send tracker events', err);
      // Put back events if failed? Maybe better to drop to avoid memory leak
      // In a real SaaS, we'd use IndexedDB for persistence
    }
  }

  private getSessionId(): string {
    let sid = sessionStorage.getItem('bt_session_id');
    if (!sid) {
      sid = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('bt_session_id', sid);
    }
    return sid;
  }

  public stop() {
    if (this.stopFn) {
      this.stopFn();
      this.isRecording = false;
    }
  }
}

export const tracker = (config: TrackerConfig) => new BugTracker(config);
