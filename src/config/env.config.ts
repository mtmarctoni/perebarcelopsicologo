// src/config/env.config.ts
export const envConfig = {
    server: {
        port: process.env.PORT || 3000,
    },
    email: {
        resendApiKey: process.env.RESEND_API_KEY || '',
    },
} as const;