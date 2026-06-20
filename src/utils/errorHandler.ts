interface ApiError {
  error?: string;
  type?: string;
}

export const handleResendErrors = (data: ApiError): string | null => {
  if (!data.type) return null;

  const knownTypes = [
    "validation_error",
    "resend_error",
    "rate_limited",
    "server_error",
    "forbidden",
  ];
  if (!knownTypes.includes(data.type)) return null;

  return data.error ?? null;
};
