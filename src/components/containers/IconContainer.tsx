interface Props {
  children: React.ReactNode;
  className?: string;
}

export const IconCardContainer = ({ children, className }: Props) => (
  <div
    className={`${className} rounded-2xl flex items-center justify-center mb-6 p-4 size-16 mx-auto transition-transform duration-500 ease-smooth`}
  >
    {children}
  </div>
);

export const IconFooterContainer = ({ children }: Props) => (
  <div className={`min-w-6 min-h-6 flex items-center justify-center`}>{children}</div>
);
