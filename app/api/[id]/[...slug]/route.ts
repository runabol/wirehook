import { publish } from "@/lib/broker";
import { toWebhookRequest } from "@/lib/convert";
import { NextRequest } from "next/server";

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  publish(id, await toWebhookRequest(req));
  return new Response("OK");
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
  handler as OPTIONS,
  handler as HEAD,
  handler as CONNECT,
  handler as TRACE,
};
