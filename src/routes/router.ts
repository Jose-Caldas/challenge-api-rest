import { Router, Request, Response } from "express";
import BookModel, { IBook } from "../models/Book";

const router = Router();

router.get("/", (_, res: Response) => {
  res.send("Books API");
});

router.get("/books", async (_, res: Response) => {
  try {
    const books = await BookModel.find();
    res.status(200).json({ books, msg: "Livros carregados com sucesso!" });
  } catch (error) {
    res.status(404).json({ msg: "Nenhum livro encontrado!" });
  }
});

router.post("/books", async (req: Request, res: Response) => {
  try {
    const { title, author, isbnNumber } = req.body;
    const newBook: IBook = new BookModel({
      title,
      author,
      isbnNumber,
    });

    await newBook.save();
    res.status(201).json({ newBook, msg: "Livro criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar livro!" });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await BookModel.findById(id);

    if (!book) {
      res.status(404).json({ msg: "Livro não encontrado!" });
      return;
    }
    res.json(book);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const book = await BookModel.findById(id);
    if (!book) {
      res.status(404).json({ msg: "Livro não encontrado!" });
      return;
    }

    const deleteBook = await BookModel.findByIdAndDelete(id);
    res.status(200).json({ deleteBook, msg: "Livro excluído com sucesso!" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { title, author, isbnNumber } = req.body;
    const book: IBook = new BookModel({
      title,
      author,
      isbnNumber,
    });

    const updateBook = await BookModel.findByIdAndUpdate(id, book);

    if (!updateBook) {
      res.status(404).json({ msg: "Livro não encontrado!" });
      return;
    }

    res.status(200).json({ book, msg: "Livro atualizado com sucesso!" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
