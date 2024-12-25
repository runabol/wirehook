interface WebRequest {
  id: string;
  timestamp: string;
  path: string;
  method: string;
  headers: { [key: string]: string };
  body: string;
}
