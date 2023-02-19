import express, { Express } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth";
import cardRouter from "./routes/card";
import passport from "passport";
import cors from "cors";
import sequelize from "./lib/db";

const app: Express = express();

app.use(cors())
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/login", authRouter);
app.use("/cards", cardRouter);

sequelize.sync();

export default app;