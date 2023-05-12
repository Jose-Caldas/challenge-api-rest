import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import conn from "./db/conn";
import BookModel, { IBook } from "./models/Book";
import routes from "./routes/router";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

conn();

const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
