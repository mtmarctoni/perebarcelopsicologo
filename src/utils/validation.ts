export const assertNever = (value: never): never => {
    throw new Error(`Missing type: ${value}`);
}

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
  
export const isValidSpanishPhone = (phone: string): boolean => {
    const phoneRegex = /^(?:(?:\+|00)34|0034)?[6789]\d{8}$/;
    return phoneRegex.test(phone);
  };