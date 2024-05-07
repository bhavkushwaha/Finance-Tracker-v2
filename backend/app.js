import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";

const app = express();

const port = process.env.PORT;

connectDB();

// const allowedOrigins = [
//   "http://localhost:3000",

//   // add more origins as needed
// ];

// Middleware
app.use(express.json());
app.use(cors());
  //   {
  //   origin: allowedOrigins,
  //   credentials: true,
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  // }

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Router
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
