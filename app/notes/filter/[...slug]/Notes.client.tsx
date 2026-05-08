"use client";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import Link from "next/link";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

import css from "./NotePageClient.module.css";

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchNotes({ page, search: debouncedSearch, tag }),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes. Please try again.</p>}
      <div className={css.toolbar}>
        <Link href={`/notes/action/create`} className={css.createLink}>
          Create notes
        </Link>
        <SearchBox
          search={search}
          onSearch={(value: string) => {
            setSearch(value);
            setPage(1);
          }}
        />
      </div>
      <Pagination
        page={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />

      {data?.notes?.length ? <NoteList notes={data.notes} /> : null}
    </>
  );
}
