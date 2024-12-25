"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from "@/components/ui/sidebar"
import { formatTimestamp } from "@/lib/datetime"

// This is sample data
const data = [
  {
    "id": "req-1",
    "timestamp": "2024-12-24T12:34:56Z",
    "method": "POST",
    "path": "/users",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "body": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "password": "securePassword123",
      "age": 30,
      "isSubscribed": true
    }
  },
  {
    "id": "req-2",
    "timestamp": "2024-12-24T12:34:56Z",
    "method": "POST",
    "path": "/users",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "body": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "password": "securePassword123",
      "age": 30,
      "isSubscribed": true
    }
  },
  {
    "id": "req-3",
    "timestamp": "2024-12-24T12:34:56Z",
    "method": "POST",
    "path": "/users",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "body": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "password": "securePassword123",
      "age": 30,
      "isSubscribed": true
    }
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-semibold text-foreground">
              Wirehook
            </div>
          </div>
          <SidebarInput placeholder="Search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {data.map((req) => (
                <a
                  href="#"
                  key={req.id}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="bg-primary text-primary-foreground p-1 rounded-md">{req.method}</span>
                    <span>{req.path}</span>
                  </div>
                  <span className="text-xs">{formatTimestamp(req.timestamp)}</span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
