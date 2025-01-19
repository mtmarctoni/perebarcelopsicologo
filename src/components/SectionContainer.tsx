interface Props {
  children: React.ReactNode;
  bgColor: string;
}

const SectionContainer = ({ children, bgColor }: Props) => {
  return (
    <section className={`bg-${bgColor} w-auto`}>
      <div className="max-w-4xl mx-auto py-16 px-8 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};

export default SectionContainer;
