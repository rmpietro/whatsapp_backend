import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";

//dotenv config
dotenv.config();

//Create Express App
const app = express();

//--------------Middlewares---------------- //

//Morgan Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Helmet Middleware
app.use(helmet());

//Parse Json request url middleware
app.use(express.urlencoded({ extended: true }));

//Parse Json request body middleware
app.use(express.json());

//Sanitize Request Data middleware
// app.use(mongoSanitize);

//Enable Cookie Parser middleware
app.use(cookieParser());

//gzip compression middleware
app.use(compression());

//File upload middleware
app.use(fileUpload({ useTempFiles: true }));

//Cors Middleware
app.use(cors());

//api v1 routes
app.use("/api/v1", routes);

//--------------End Middlewares---------------- //

app.post("/test", (req, res) => {
  throw createHttpError(400, "This is a REQUEST ERROR");
});

app.get("/api", (req, res) => {
  res.send("Hello from API");
});

app.use(async (req, res, next) => {
  next(createHttpError(404, "This route does not exist"));
});

//Error Handling - MUST BE AT THE END OF THE FILE AND CALLS OTHERWISE WON´T BE CALLED
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.header("Content-Type", "application/json");
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
