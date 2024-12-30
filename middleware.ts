import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Broker from "./lib/broker";

// Create a new broker instance to manage webhook subscriptions
const broker = new Broker();

// Middleware to handle incoming webhook requests and server-sent events
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // Current request path

  if (pathname.startsWith("/api/hook")) {
    const idMatch = pathname.match(/^\/api\/hook\/([^/]+)/);
    if (!idMatch) {
      return new NextResponse("bad request", { status: 400 });
    }
    const id = idMatch[1];
    const sessionId = Math.random().toString(36).substring(2, 10);
    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    broker.subscribe(id, sessionId, writer);

    req.signal.addEventListener("abort", () => {
      broker.unsubscribe(id, sessionId);
      writer.close();
    });
    return new Response(responseStream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } else {
    const idMatch = pathname.match(/^\/h\/([^/]+)/);
    if (!idMatch) {
      return new NextResponse("bad request", { status: 400 });
    }
    const id = idMatch[1];
    await broker.publish(id, req);
    return new NextResponse("");
  }
}

export const config = {
  matcher: ["/h/:id*", "/api/hook/:id"],
};
