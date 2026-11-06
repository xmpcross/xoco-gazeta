import { getCollection } from "astro:content";
import { searchItem, visiblePosts } from "@/lib/posts";

/* Fetched by the search palette on first open. Kept small: article bodies are never needed to find a headline. */
export async function GET() {
  const posts = visiblePosts(await getCollection("posts"));

  return new Response(JSON.stringify(posts.map(searchItem)), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
