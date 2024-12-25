import { publish } from "@/lib/broker";
import { randomUUID } from "crypto";
import { formatDate } from "date-fns";
import { NextRequest } from "next/server";

export async function handler(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  publish(id, {
    id: randomUUID(),
    timestamp: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
    method: req.method,
    path: req.nextUrl.pathname.replace(/\/h\/[^/]+/, ""),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${randomUUID()}`,
    },
    body: "",
  });
  return new Response("OK");
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
