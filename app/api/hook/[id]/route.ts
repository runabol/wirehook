import { subscribe, unsubscribe } from "@/lib/broker";
import { NextRequest } from "next/server";
import { randomUUID } from "crypto";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sessionId = randomUUID();
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  subscribe(id, sessionId, writer);

  req.signal.addEventListener("abort", () => {
    unsubscribe(id, sessionId);
    writer.close();
  });
  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
