import type { ReactNode } from "react";
import { LocalBusinessSchema, WebsiteSchema } from "@/components/seo/SchemaMarkup";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <WebsiteSchema />
      <LocalBusinessSchema />
      {children}
    </>
  );
}
