import type { CollectionEntry } from "astro:content";
import { categories, type Category } from "@/config/categories";

export type Post = CollectionEntry<"posts">;
export { categories, type Category };

export const categorySlug = (category: Category) =>
  category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");

export const categoryFromSlug = (slug: string): Category | undefined =>
  categories.find((category) => categorySlug(category) === slug);

export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const avatarFiles = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/authors/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

const avatarsBySlug = new Map(
  Object.entries(avatarFiles).map(([path, file]) => [
    path
      .split("/")
      .pop()!
      .replace(/\.[^.]+$/, ""),
    file.default,
  ]),
);

export const authorSlug = (name: string) =>
  name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* Matches src/assets/authors/<author-slug>.jpg; undefined falls back to an initial. */
export const authorAvatar = (name: string) => avatarsBySlug.get(authorSlug(name));

export const postSlug = (post: Post) => post.id.replace(/\/index$/, "");

export const postHref = (post: Post) => `/post/${postSlug(post)}/`;

export const byNewest = (a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime();

export const visiblePosts = (posts: Post[]) =>
  posts.filter((post) => !post.data.draft).sort(byNewest);

export const excludePosts = (posts: Post[], excluded: Post[]) => {
  const excludedIds = new Set(excluded.map((post) => post.id));
  return posts.filter((post) => !excludedIds.has(post.id));
};

export const getByCategory = (posts: Post[], category: Category, limit?: number) => {
  const list = visiblePosts(posts).filter((post) => post.data.category === category);
  return typeof limit === "number" ? list.slice(0, limit) : list;
};

export const getTrending = (posts: Post[], limit = 5) => {
  const visible = visiblePosts(posts);
  const trending = visible.filter((post) => post.data.trending);
  return [...trending, ...visible.filter((post) => !post.data.trending)].slice(0, limit);
};

export const getRelated = (posts: Post[], current: Post, limit = 3) =>
  visiblePosts(posts)
    .filter((post) => post.id !== current.id)
    .sort((a, b) => {
      const categoryScore =
        Number(b.data.category === current.data.category) -
        Number(a.data.category === current.data.category);
      return categoryScore || byNewest(a, b);
    })
    .slice(0, limit);

export type HeroLayout = Post["data"]["heroLayout"];

export const storyLayouts: { layout: HeroLayout; label: string; description: string }[] = [
  { layout: "standard", label: "Standard", description: "Centered headline over a wide photo" },
  { layout: "banner", label: "Banner", description: "Wide photo first, headline below" },
  { layout: "cover", label: "Cover", description: "Headline set on a framed photo" },
  { layout: "immersive", label: "Immersive", description: "Full-screen photo under the header" },
];

/* The newest story using each layout, for the header's layouts menu. Layouts no story uses are left out. */
export const layoutExamples = (posts: Post[]) =>
  storyLayouts.flatMap((item) => {
    const post = visiblePosts(posts).find((entry) => entry.data.heroLayout === item.layout);
    return post ? [{ ...item, href: postHref(post) }] : [];
  });

export const getAllTags = (posts: Post[]) =>
  Array.from(new Set(visiblePosts(posts).flatMap((post) => post.data.tags))).sort((a, b) =>
    a.localeCompare(b),
  );

export const formatDate = (date: Date, style: "short" | "long" = "short") =>
  new Intl.DateTimeFormat("en-US", {
    month: style === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

/* One shape for the search index, the palette's inlined fallback, and the /search/ page. */
export const searchItem = (post: Post) => ({
  title: post.data.title,
  excerpt: post.data.excerpt,
  href: postHref(post),
  author: post.data.author.name,
  category: post.data.category,
  tags: post.data.tags,
  date: formatDate(post.data.date),
  reading: `${post.data.readMinutes} min read`,
});
