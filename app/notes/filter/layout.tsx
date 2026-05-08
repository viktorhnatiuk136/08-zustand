import css from "./NotesLayout.module.css";

type Props = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>

      <div className={css.content}>{children}</div>
    </section>
  );
};

export default NotesLayout;
