import { randomUUID } from "crypto";
import { formatDate } from "date-fns";
import { NextRequest } from "next/server";

export async function toWebhookRequest(req: NextRequest) {
  let path = req.nextUrl.pathname.replace(/\/h\/[^/]+/, "");
  if (path === "") {
    path = "/";
  }
  return {
    id: randomUUID(),
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
