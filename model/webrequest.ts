interface WebRequest {
  id: string;
  serial: number;
  timestamp: string;
  path: string;
  method: string;
  hostname: string;
  headers: { [key: string]: string };
  body: string;
  size: number;
}
