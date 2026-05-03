"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

import css from "./NotePreview.module.css";
// import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

export default function NotePreview() {
  const router = useRouter();

  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Something went wrong.</p>}
        {!isLoading && !isError && note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
