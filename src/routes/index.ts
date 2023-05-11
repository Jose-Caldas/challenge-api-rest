import { Request, Response, Router } from "express";

const router = Router();
import { bookController } from "../controllers/bookController";
import BookModel, { IBook } from "../models/Book";

router.get("/", (req, res) => {
  return res.send("Challenge start!");
});

router.get("/books", (req, res) => {
  bookController.getAll(res);
});

router.post("/books", async (req: Request, res: Response) => {
  bookController.create(req, res);
});

export { router };
