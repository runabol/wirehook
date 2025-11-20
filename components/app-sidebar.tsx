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
import { FaGithub, FaTrash } from "react-icons/fa";
import Link from "next/link";
import RequestMethodBadge from "./request-method-badge";

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
		const storedRequests = localStorage.getItem(`requests_${hookId}`);
		const parsedRequests = JSON.parse(storedRequests || "[]") as WebRequest[];
		if (!!parsedRequests?.length) {
			setRequests(parsedRequests);
			setTotalRequests(parsedRequests.length);
		}

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
					setTotalRequests((prev) => {
						return prev + 1;
					});
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
		localStorage.setItem(`requests_${hookId}`, JSON.stringify(requests));
	}, [hookId, requests]);

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
									className={`group/request flex hover:cursor-pointer flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
										selected?.id === req.id
											? "bg-sidebar-accent text-sidebar-accent-foreground"
											: ""
									}`}
								>
									<div className="flex w-full items-center gap-2">
										<RequestMethodBadge method={req.method} />
										<span className="border-b p-1 text-sm">
											{req.path.substring(0, 30)}
											{req.path.length > 30 ? "..." : ""}
										</span>
									</div>
									<div className="flex justify-between w-full items-center">
										<span className="text-xs align-right">
											{formatTimestamp(req.timestamp)}
										</span>
										<span>
											<button
												onClick={(e) => {
													e.stopPropagation();
													setRequests((prev) =>
														prev.filter((r) => r.id !== req.id)
													);
													setTotalRequests((prev) => prev - 1);
												}}
												className="text-xs opacity-0 group-hover/request:opacity-100 hover:text-red-500 transition-opacity"
											>
												<FaTrash className="w-3 h-3" />
											</button>
										</span>
									</div>
								</div>
							))}
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
		</Sidebar>
	);
}
