const subscribers: Record<
  string,
  Record<string, WritableStreamDefaultWriter>
> = {};
const encoder = new TextEncoder();

export function subscribe(
  id: string,
  sessionId: string,
  writer: WritableStreamDefaultWriter
) {
  if (!(id in subscribers)) {
    subscribers[id] = {};
  }
  subscribers[id][sessionId] = writer;
}

export function unsubscribe(id: string, sessionId: string) {
  if (id in subscribers) {
    delete subscribers[id][sessionId];
  }
  if (Object.keys(subscribers[id]).length === 0) {
    delete subscribers[id];
  }
}

export function publish(id: string, req: WebRequest) {
  if (id in subscribers) {
    Object.keys(subscribers[id]).forEach((sessionId) => {
      subscribers[id][sessionId].write(
        encoder.encode(`${JSON.stringify(req)}\n`)
      );
    });
  }
}
