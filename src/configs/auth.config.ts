import { SignOptions } from "jsonwebtoken";

type ExpiresIn = NonNullable<SignOptions["expiresIn"]>;

export const ACCESS_TOKEN_EXPIRES_IN: ExpiresIn = "15s";
export const REFRESH_TOKEN_EXPIRES_IN: ExpiresIn = "7d";

export const DUMMY_HASH: string = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8U5vOXk3ih6f4HZni9eN5vKGqDqm.e";
