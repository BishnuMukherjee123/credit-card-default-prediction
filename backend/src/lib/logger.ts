import pino from "pino";
import CONFIG from "../config/index.js";

const pretty = process.env.NODE_ENV !== "production";

const logger = pino(
  {
    level: CONFIG.LOG_LEVEL || "info",
  },
  pretty ? pino.transport({ target: "pino-pretty" }) : undefined
);

export default logger;
