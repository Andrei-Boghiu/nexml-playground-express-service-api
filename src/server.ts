import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth.route";
// import userRoutes from "./routes/user.route";

import rateLimiter from "./middlewares/rateLimiter.middleware";
import loggerMiddleware from "./middlewares/logger.middleware";

import corsConfig from "./configs/cors.config";
import fallbackHandler from "./utils/fallbackHandler.util";
import errorHandler from "./middlewares/errorHandler.middleware";

const app = express();

// middleware
app.use(rateLimiter);
app.use(loggerMiddleware);
app.use(cors(corsConfig));
app.use(helmet());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("hello there traveler");
});

// fallback route handler - 404
app.use(fallbackHandler);

app.use(errorHandler);

export default app;
