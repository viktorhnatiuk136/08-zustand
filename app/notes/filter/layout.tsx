type Props = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section>
      <aside>{sidebar}</aside>
      <div>{children}</div>
    </section>
  );
};

export default NotesLayout;
