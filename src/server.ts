import express from "express";
import cors from "cors";
import helmet from "helmet";

import _systemRoutes from "./routes/_system.route";
import authRoutes from "./routes/auth.route";
import usersRoutes from "./routes/user.route";
import jobListingRoutes from "./routes/job-listings.route";
import instructionRoutes from "./routes/instruction.route";

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
app.use("/api/users", usersRoutes);
app.use("/api/job-listings", jobListingRoutes);
app.use("/api/instructions", instructionRoutes);

// handlers
app.use(fallbackHandler); // - 404
app.use(errorHandler);

export default app;
