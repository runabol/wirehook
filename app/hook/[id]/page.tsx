"use client";

import { AppSidebar } from "@/components/app-sidebar";
import CopyButton from "@/components/copy-button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTimestamp } from "@/lib/datetime";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selected, setSelected] = useState<WebRequest>();

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/h/${id}`);
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "300px",
        } as React.CSSProperties
      }
    >
      <AppSidebar hookId={id} selected={selected} onSelected={setSelected} />
      <SidebarInset>
        {selected && (
          <header className="flex py-4 shrink-0 items-center gap-2 border-b px-4">
            <p className="font-medium bg-primary text-primary-foreground text-sm ml-2 ring-1 py-2 px-6 rounded-md ring-muted-foreground/30">
              {url}
            </p>
            <CopyButton url={url} />
          </header>
        )}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {!selected && (
            <div className="min-h-[100vh] flex-col flex justify-center items-center">
              <p className="text-center text-xl my-4 font-bold">
                Your unique URL
              </p>
              <p className="md:px-48 mb-6 text-center text-base text-muted-foreground">
                Simply configure your application to send events to your unique
                URL, and any incoming requests will appear right here on this
                page for you to view and analyze.
              </p>
              <div className="flex gap-2">
                <p className="font-medium bg-primary text-primary-foreground text-lg ml-2 ring-1 py-2 px-6 rounded-md ring-muted-foreground/30">
                  {url}
                </p>
                <CopyButton url={url} />
              </div>
            </div>
          )}
          {selected && (
            <div>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="w-1/3">
                            <span className="bg-primary text-primary-foreground p-1 rounded-md text-xs">
                              {selected.method}
                            </span>
                          </TableCell>
                          <TableCell>{selected.path}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3">Host</TableCell>
                          <TableCell>{selected.hostname}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3">Time</TableCell>
                          <TableCell>
                            {formatTimestamp(selected.timestamp)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3">Size</TableCell>
                          <TableCell>{selected.size}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Headers</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.keys(selected.headers).map((header) => (
                          <TableRow key={header}>
                            <TableCell className="font-medium w-1/3 whitespace-nowrap">
                              {header}
                            </TableCell>
                            <TableCell>{selected.headers[header]}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Body</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <pre className="whitespace-pre-wrap">
                          {selected.headers["content-type"]?.includes(
                            "application/json"
                          ) ? (
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(
                                JSON.parse(selected.body),
                                null,
                                2
                              )}
                            </pre>
                          ) : (
                            <pre className="whitespace-pre-wrap">
                              {selected.body}
                            </pre>
                          )}
                        </pre>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
