export interface UserJwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}
