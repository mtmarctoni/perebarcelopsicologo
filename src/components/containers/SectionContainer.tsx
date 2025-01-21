interface Props {
  children: React.ReactNode;
  className?: string;
}

const SectionContainer = ({ children, className }: Props) => {
  return (
    <section className={`${className} w-auto`}>
      <div className="max-w-4xl mx-auto py-8">{children}</div>
    </section>
  );
};

export default SectionContainer;
