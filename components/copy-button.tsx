"use client";

import { ClipboardCopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      className="h-full"
      onClick={() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
        navigator.clipboard.writeText(url);
      }}
    >
      {copied ? "Copied!" : <ClipboardCopyIcon className="w-6 h-6" />}
    </Button>
  );
}
