interface Props {
  children: React.ReactNode;
  className?: string;
}

export const IconCardContainer = ({ children, className }: Props) => (
  <div
    className={`${className} rounded-full flex items-center justify-center mb-6 p-4 size-16 mx-auto`}
  >
    {children}
  </div>
);

export const IconFooterContainer = ({ children}: Props) => (
    <div
      className={`min-w-6 min-h-6 flex items-center justify-center`}
    >
      {children}
    </div>
  );
