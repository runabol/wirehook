import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export default async function Home() {
  const id = Math.random().toString(36).substring(2, 10);
  redirect(`/hook/${id}`);
}
