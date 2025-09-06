import type { Request } from "express";

export type UserJwtPayload = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

export type ApiErrorPayload = {
  status: string;
  error: string | object;
};

export type ErrorLoggerType = {
  error: unknown;
  req?: Request;
  responsePayload: ApiErrorPayload;
  statusCode: number;
};