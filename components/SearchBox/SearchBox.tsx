"use client";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ search, onSearch }: SearchBoxProps) {
  return (
    <input
      value={search}
      onChange={(e) => {
        onSearch(e.target.value);
      }}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
