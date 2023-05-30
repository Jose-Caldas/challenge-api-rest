import express from "express";
import "dotenv/config";
import cors from "cors";
import conn from "./db/conn";
import routes from "./routes/router";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

conn();

export default app;
