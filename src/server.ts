import express from "express";
import cors from "cors";
import helmet from "helmet";

import _systemRoutes from "./routes/_system.route";
import authRoutes from "./routes/auth.route";
import usersRoutes from "./routes/user.route";
import jobListingRoutes from "./routes/job-listings.route";
import instructionRoutes from "./routes/instruction.route";
import policyRoutes from "./routes/policy.route";
import archiveRoutes from "./routes/archive.route";
import resumeRoutes from "./routes/resume.route";

import rateLimiter from "./middlewares/rateLimiter.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import fakeLoader from "./middlewares/fakeLoader.middleware";
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
app.use(fakeLoader);

// routes
app.use("/api/check", _systemRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/users", usersRoutes);
app.use("/api/job-listings", jobListingRoutes);
app.use("/api/instructions", instructionRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/archives", archiveRoutes);
app.use("/api/resumes", resumeRoutes);

// handlers
app.use(fallbackHandler); // - 404
app.use(errorHandler);

export default app;
