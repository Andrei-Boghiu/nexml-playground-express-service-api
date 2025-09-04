import { CorsOptions } from "cors";

const corsConfig: CorsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-refresh-token", "x-access-token", "Authorization"],
  exposedHeaders: ["x-refresh-token", "x-access-token"],
  credentials: true,
};

export default corsConfig;
