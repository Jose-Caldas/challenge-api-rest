import { Router, Request, Response } from "express";
import bookController from "../controllers/bookController";

const router = Router();

router.get("/", (_, res: Response) => {
  res.send("Books API");
});

router.post("/books", (req: Request, res: Response) => {
  bookController.create(req, res);
});

router.get("/books", (_, res: Response) => {
  bookController.getAll(res);
});

router.get("/books/:id", (req, res) => {
  bookController.getById(req, res);
});

router.put("/books/:id", (req, res) => {
  bookController.update(req, res);
});

router.delete("/books/:id", (req, res) => {
  bookController.delete(req, res);
});

export default router;
