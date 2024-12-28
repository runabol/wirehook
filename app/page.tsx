"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/hook/${Math.random().toString(36).substring(2, 10)}`);
  }, [router]);

  return null;
}
