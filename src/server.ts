import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth.route";
import _systemRoutes from "./routes/_system.route";

import rateLimiter from "./middlewares/rateLimiter.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import loggerMiddleware from "./middlewares/logger.middleware";

import corsConfig from "./configs/cors.config";
import fallbackHandler from "./utils/fallbackHandler.util";

const app = express();

// middleware
app.use(rateLimiter);
app.use(loggerMiddleware);
app.use(cors(corsConfig));
app.use(helmet());
app.use(express.json());

// routes
app.use("/api/check", _systemRoutes);
app.use("/api/auth", authRoutes);

// handlers
app.use(fallbackHandler); // - 404
app.use(errorHandler);

export default app;
