import { readFileSync } from "fs";
import path from "path";
import { RedirectItem } from "./RedirectItem";

export function getRedirectByPath(sourcePath: string): RedirectItem | undefined {
  const dbDirectory = path.join(process.cwd(), "data", "redirects.json");
  const jsonStr = readFileSync(dbDirectory).toString();
  const fileContents = JSON.parse(jsonStr) as RedirectItem[];

  const redirect = fileContents.find((p) => p.source === sourcePath);
  return redirect;
}


export function getAllRedirects(): RedirectItem[] {
  const dbDirectory = path.join(process.cwd(), "data", "redirects.json");
  const jsonStr = readFileSync(dbDirectory).toString();
  const fileContents = JSON.parse(jsonStr) as RedirectItem[];

  return fileContents;
}
