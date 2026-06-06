import caMessages from "@/messages/ca.json";
import esMessages from "@/messages/es.json";

function getNestedValue(obj: object, path: string): string {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  if (typeof value === "string") return value;
  return path;
}

export function t(locale: string, key: string, params?: Record<string, string | number>): string {
  const messages = locale === "ca" ? caMessages : esMessages;
  let text = getNestedValue(messages as unknown as object, key);

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }

  return text;
}

export function emailSubjects(locale: string): { contactForm: string; formConfirmation: string } {
  const messages = locale === "ca" ? caMessages : esMessages;
  const subjects = messages.EmailTemplates as Record<string, string>;
  return {
    contactForm: subjects?.adminSubject ?? "",
    formConfirmation: subjects?.userSubject ?? "",
  };
}
