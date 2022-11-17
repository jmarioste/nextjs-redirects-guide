export interface RedirectItem {
  statusCode: 301 | 302
  source: string;
  destination: string;
}