import { categories } from "./categories";

export const siteConfig = {
  name: "Gazeta",
  tagline: "World news, ideas, culture, and sport",
  title: "Gazeta - A modern newspaper and magazine Astro theme",
  description:
    "A modern Astro newspaper and magazine theme for world news, politics, business, technology, science, culture, and sport.",
  siteUrl: "https://gazeta.xocoweb.workers.dev",
  authorName: "Andrei Alba",
  email: "hello@example.com",
  language: "en",
  locale: "en_US",
  socialImage: "/og-image.png",
  adLabel: "Gazeta x Partner Note",
  newsletter: {
    action: "",
    method: "post",
    emailFieldName: "email",
    title: "The morning edition, in your inbox.",
    description:
      "Five stories worth your time, picked by our editors every weekday before breakfast.",
  },
  /* The contact form posts nowhere until `action` is set; until then it renders disabled with a note. */
  contact: {
    action: "",
    method: "post",
    topics: ["News tip", "Correction", "Advertising", "Newsletter", "Something else"],
    address: ["48 Fleet Row", "London EC4A 2BB, United Kingdom"],
    phone: "+44 20 7946 0123",
    responseTime: "We reply within two business days.",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/gazeta" },
    { label: "TikTok", href: "https://www.tiktok.com/@gazeta" },
    { label: "YouTube", href: "https://www.youtube.com/@gazeta" },
    { label: "RSS", href: "/rss.xml" },
  ],
};

const categorySlug = (category: string) =>
  category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");

export const navigation = categories.map((category) => ({
  label: category,
  href: `/category/${categorySlug(category)}/`,
}));
