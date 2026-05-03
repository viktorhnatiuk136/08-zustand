"use client";

type Props = {
  error: Error;
};

export default function ErrorPage({ error }: Props) {
  return (
    <p>
      Something went wrong while loading notes. Please try refreshing the page.{" "}
      {error.message}
    </p>
  );
}
