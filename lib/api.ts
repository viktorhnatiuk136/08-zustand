import axios from "axios";
import toast from "react-hot-toast";

import type { Note, NoteTag } from "../types/note";

export interface NoteHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search: string;
  tag?: string;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotes({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<NoteHTTPResponse> {
  const res = await axios.get<NoteHTTPResponse>("/notes", {
    params: { page, search, tag },
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.data;
}

interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}
export async function createNote(data: CreateNoteRequest): Promise<Note> {
  try {
    const res = await axios.post<Note>("/notes", data, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return res.data;
  } catch (error) {
    toast.error("Failed to create note");
    throw error;
  }
}

export async function deleteNote(id: string): Promise<Note> {
  try {
    const res = await axios.delete<Note>(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return res.data;
  } catch (error) {
    toast.error("Failed to delete note");
    throw error;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const res = await axios.get<Note>(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return res.data;
  } catch (error) {
    toast.error("Failed to fetch note");
    throw error;
  }
}
