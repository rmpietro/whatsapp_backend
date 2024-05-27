import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

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
app.use(mongoSanitize);

//Enable Cookie Parser middleware
app.use(cookieParser());

//gzip compression middleware
app.use(compression());

//File upload middleware
app.use(fileUpload({ useTempFiles: true }));

//Cors Middleware
app.use(cors());

//-------------End middlewares-----------------//

app.post("/test", (req, res) => {
  res.send(req.body);
});

export default app;
