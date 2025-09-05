import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import getIsPostman from "../utils/getIsPostman.util";
import { Request } from "express";
import { IS_PROD } from "../configs/env.config";

const PROD_WINDOW = 10 * 60 * 1000; // 10min
const DEV_WINDOW = 5 * 60 * 1000; // 5min

const PROD_MAX = 150;
const DEV_MAX = 300;

const rateLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: IS_PROD ? PROD_WINDOW : DEV_WINDOW,
  max: IS_PROD ? PROD_MAX : DEV_MAX,
  legacyHeaders: false,
  standardHeaders: true,
  skip: (req: Request) => !IS_PROD && getIsPostman(req), // skip for Postman in non-prod
  message: {
    error: "Too many requests, please try again later.",
  },
});

export default rateLimiter;
