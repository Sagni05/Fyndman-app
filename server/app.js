import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());

//connection with fronted
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use(morgan("dev"));

app.use(express.json()); //body parser

app.use("/api/v1/user", userRoutes);

export default app;
