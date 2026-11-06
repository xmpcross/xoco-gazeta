export const categories = [
  "World",
  "Politics",
  "Business",
  "Technology",
  "Science",
  "Culture",
  "Sport",
] as const;

export type Category = (typeof categories)[number];
