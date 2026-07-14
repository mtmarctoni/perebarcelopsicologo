export const isValidSpanishPhone = (phone: string): boolean => {
  const phoneRegex = /^(?:(?:\+|00)34|0034)?[6789]\d{8}$/;
  return phoneRegex.test(phone);
};
