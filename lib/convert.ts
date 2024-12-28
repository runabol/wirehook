import { randomUUID } from "crypto";
import { formatDate } from "date-fns";
import { NextRequest } from "next/server";

export function toWebhookRequest(req: NextRequest): WebRequest {
  let path = req.nextUrl.pathname.replace(/\/h\/[^/]+/, "");
  if (path === "") {
    path = "/";
  }
  return {
    id: randomUUID(),
    timestamp: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
    method: req.method,
    path: path,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${randomUUID()}`,
    },
    body: "",
  };
}
