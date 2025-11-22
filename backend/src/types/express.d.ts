import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      // 👇 Add "| undefined" to these optional fields
      email?: string | undefined;
      firstName?: string | undefined;
      lastName?: string | undefined;
    };
  }
}