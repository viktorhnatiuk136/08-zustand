"use client";

import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";

import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteStore } from "@/lib/store/noteStore";

import css from "./NoteForm.module.css";

export default function NoteForm() {
  const tags = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

  const queryClient = useQueryClient();

  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleCancel = () => router.back();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label>
          Title
          <input
            value={draft.title}
            onChange={handleChange}
            type="text"
            name="title"
            className={css.input}
          />
        </label>
      </div>

      <div className={css.formGroup}>
        <label>
          Content
          <textarea
            value={draft.content}
            onChange={handleChange}
            name="content"
            className={css.textarea}
          ></textarea>
        </label>
      </div>

      <div className={css.formGroup}>
        <label>
          Categories
          <select value={draft.tag} onChange={handleChange} name="tag">
            {tags.map((item) => (
              <option key={item} value={item} className={css.select}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
