import app from "./app.js";
import logger from "./config/logger.js";
import mongoose from "mongoose";

//ENV Variables
const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;

//Exit on MongoDB Error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB Connection Error: ${err}`);
  process.exit(1);
});

//MongoDB Debug Mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

//MongoDB Connection
//@ts-ignore
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    logger.info("MongoDB connected");
  });

let server;
server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log("Process PID: ", process.pid);
});

//Handle Server Errors
const exitHandler = () => {
  if (server) {
    logger.info("Server is closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// //SIGTERM
process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  }
});
