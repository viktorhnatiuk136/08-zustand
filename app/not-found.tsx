import css from "./not-found.module.css";
import { Metadata } from "next";

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Page Not Found | NoteHub",
  description: "This page could not be found.",
  openGraph: {
    title: "Page Not Found | NoteHub",
    description: "This page could not be found.",
    url: "https://07-routing-nextjs-delta-ten.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "note title",
      },
    ],
  },
};
