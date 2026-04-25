interface Props {
  children: React.ReactNode;
  className?: string;
}

const SectionContainer = ({ children, className }: Props) => {
  return (
    <section className={`${className || ''} w-full`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
