"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const getOrCreateId = () => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      return storedId;
    }
    const newId = Math.random().toString(36).substring(2, 10);
    localStorage.setItem("id", newId);
    return newId;
  };

  useEffect(() => {
    const id = getOrCreateId();
    router.push(`/hook/${id}`);
  }, [router]);

  return null;
}
