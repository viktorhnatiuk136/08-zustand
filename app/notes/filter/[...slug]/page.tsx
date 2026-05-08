import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByCatgorie({ params }: Props) {
  const { slug } = await params;

  const tag = !slug || slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();

  const page = 1;
  const search = "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes({ page, search, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] || "all";

  return {
    title: `Notes - ${filter}`,
    description: `Browse ${filter} notes in your collection`,
    openGraph: {
      title: `Notes - ${filter}`,
      description: `Browse ${filter} notes in your collection`,
      url: `https://07-routing-nextjs-delta-ten.vercel.app/notes/filter/${filter}`,
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
}
