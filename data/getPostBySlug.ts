import { readFileSync } from "fs";
import path from "path";
import { Post } from "./Post";

export function getPostBySlug(slug: string): Post | undefined {
  const dbDirectory = path.join(process.cwd(), "data", "posts.json");
  const jsonStr = readFileSync(dbDirectory).toString();
  const fileContents = JSON.parse(jsonStr) as Post[];

  const post = fileContents.find((p) => p.slug === slug);
  return post;
}
