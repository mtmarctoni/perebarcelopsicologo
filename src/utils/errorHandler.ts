interface ResendError {
    error: string,
    type: 'resend_error',
    statusCode: number
}

export const handleResendErrors = ({ type, statusCode }: ResendError) => {
    if (type !== 'resend_error') return null

    if (statusCode === 422) return "Email no válido. La dirección de correo electrónico debe seguir el formato 'email@example.com' o 'Nombre <email@example.com>'"

    return null
}