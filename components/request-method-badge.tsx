"use client";

export default function RequestMethodBadge({ method }: { method: string }) {
	return (
		<span
			className={`inline-flex p-1 rounded-md text-xs ${
				method === "GET"
					? "bg-green-500 text-white"
					: method === "POST"
					? "bg-yellow-500 text-white"
					: method === "PUT"
					? "bg-blue-500 text-white"
					: method === "DELETE"
					? "bg-red-600 text-white"
					: method === "PATCH"
					? "bg-purple-500 text-white"
					: method === "HEAD"
					? "bg-green-700 text-white"
					: method === "OPTIONS"
					? "bg-pink-500 text-white"
					: method === "CONNECT"
					? "bg-orange-500 text-white"
					: method === "TRACE"
					? "bg-indigo-600 text-white"
					: "bg-gray-500 text-white"
			}`}
		>
			<span>{method}</span>
		</span>
	);
}
