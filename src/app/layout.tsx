import type { ReactNode } from "react";
import { PersonSchema, WebsiteSchema } from "@/components/seo/SchemaMarkup";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <WebsiteSchema />
      <PersonSchema />
      {children}
    </>
  );
}
