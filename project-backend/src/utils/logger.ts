import logger, { Logger } from "pino";
import dayjs from "dayjs";
import config from "config";

const level = config.get<string>("logLevel");

const log: Logger = logger({
    level: level,
    transport: { target: "pino-pretty" },
    base: { pid: false },
    timestamp: () => `,"time":"${dayjs().format()}"`
});

export default log;
