"use client";

import { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { formatTimestamp } from "@/lib/datetime";
import { LoaderCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export function AppSidebar({
  hookId,
  onSelected,
  selected,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  hookId: string;
  selected?: WebRequest;
  onSelected: (request: WebRequest) => void;
}) {
  const [requests, setRequests] = useState<WebRequest[]>([]);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    fetch(`/api/hook/${hookId}`, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    }).then((res) => {
      const reader = res.body?.getReader();
      if (!reader) return;
      reader.read().then(function processText({ done, value }) {
        if (done) {
          return;
        }
        const text = new TextDecoder().decode(value);
        const lines = text.split("\n").filter((line) => line.trim());
        lines.forEach((line) => {
          const req: WebRequest = JSON.parse(line);
          setTotalRequests(req.serial);
          setRequests((prev) => {
            const newRequests = [req, ...prev];
            return newRequests.slice(0, 100);
          });
        });
        reader.read().then(processText);
      });
    });
  }, [hookId]);

  useEffect(() => {
    if (!selected && requests.length > 0) {
      onSelected(requests[0]);
    }
  }, [selected, requests]);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 p-4">
          <div className="flex w-full items-center justify-between">
            <Link href="/">
              <div className="text-base font-semibold text-foreground tracking-normal">
                <span className="bg-primary text-primary-foreground px-1 py-0.5 mr-[1px] font-extralight">
                  W
                </span>
                irehook
              </div>
            </Link>
            <Link target="_blank" href="https://github.com/runabol/wirehook">
              <FaGithub className="w-5 h-5" />
            </Link>
          </div>
          {/* <SidebarInput placeholder="Search..." /> */}
          <span className="text-xs font-semibold mt-4 pb-2 border-b">
            REQUESTS ({totalRequests})
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {requests.length === 0 && (
                <div className="flex w-full items-center justify-center gap-2 my-4">
                  <LoaderCircle className="w-4 h-4 animate-spin" /> Waiting for
                  your first request
                </div>
              )}
              {requests.map((req) => (
                <div
                  key={req.id}
                  onClick={() => onSelected(req)}
                  className={`flex hover:cursor-pointer flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                    selected?.id === req.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : ""
                  }`}
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="bg-primary text-primary-foreground p-1 rounded-md text-xs">
                      {req.method}
                    </span>
                    <span className="border-b p-1 text-sm">
                      {req.path.substring(0, 30)}
                      {req.path.length > 30 ? "..." : ""}
                    </span>
                  </div>
                  <span className="text-xs">
                    {formatTimestamp(req.timestamp)}
                  </span>
                </div>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
