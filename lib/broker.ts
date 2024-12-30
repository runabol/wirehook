import { NextRequest } from "next/server";
import { formatDate } from "date-fns";
import { v4 as uuidv4 } from "uuid";

class Broker {
  private subscribers: Record<
    string,
    Record<string, WritableStreamDefaultWriter>
  > = {};
  private serialNumbers: Record<string, number> = {};
  private encoder = new TextEncoder();

  // Subscribe a writer to a webhook ID
  subscribe(
    id: string,
    sessionId: string,
    writer: WritableStreamDefaultWriter
  ) {
    if (!(id in this.subscribers)) {
      this.subscribers[id] = {};
      this.serialNumbers[id] = 0;
    }
    this.subscribers[id][sessionId] = writer;
  }

  // Unsubscribe a writer from a webhook ID
  unsubscribe(id: string, sessionId: string) {
    if (id in this.subscribers) {
      delete this.subscribers[id][sessionId];
    }
    if (Object.keys(this.subscribers[id]).length === 0) {
      delete this.subscribers[id];
      delete this.serialNumbers[id];
    }
  }

  // Publish a webhook request to all subscribers of a webhook ID
  async publish(id: string, nreq: NextRequest) {
    const req = await this.toWebhookRequest(id, nreq);
    if (id in this.subscribers) {
      Object.keys(this.subscribers[id]).forEach((sessionId) => {
        this.subscribers[id][sessionId].write(
          this.encoder.encode(`${JSON.stringify(req)}\n`)
        );
      });
    }
  }

  // Convert a Next.js request to a webhook request
  async toWebhookRequest(id: string, req: NextRequest) {
    let path = req.nextUrl.pathname.replace(/\/h\/[^/]+/, "");
    if (path === "") {
      path = "/";
    }
    this.serialNumbers[id] = this.serialNumbers[id] + 1;
    return {
      id: uuidv4(),
      serial: this.serialNumbers[id],
      timestamp: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
      method: req.method,
      path: path,
      hostname: req.nextUrl.hostname,
      headers: Object.fromEntries(req.headers),
      body: await req.text(),
      size: req.headers.get("content-length")
        ? Number(req.headers.get("content-length"))
        : 0,
    };
  }
}

export default Broker;
