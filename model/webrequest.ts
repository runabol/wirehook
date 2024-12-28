interface WebRequest {
  id: string;
  timestamp: string;
  path: string;
  method: string;
  hostname: string;
  headers: { [key: string]: string };
  body: string;
  size: number;
}
