import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "ca"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export const { Link, useRouter, usePathname } = createNavigation(routing);
