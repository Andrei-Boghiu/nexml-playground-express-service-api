if (!process.env.PORT || !process.env.JWT_SECRET) {
  throw new Error("Missing required environment variables: PORT and JWT_SECRET are required in production.");
}

export const IS_PROD = process.env.ENVIRONMENT === "production";

export const PORT = Number(process.env.PORT);

if (Number.isNaN(PORT) || PORT <= 0) {
  throw new Error("Invalid PORT environment variable. Must be a positive number.");
}

export const JWT_SECRET = process.env.JWT_SECRET!;
export const ACCESS_TOKEN_EXPIRES_IN = "15m";
export const REFRESH_TOKEN_EXPIRES_IN = "7d";
