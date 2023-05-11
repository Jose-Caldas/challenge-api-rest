import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import conn from "./db/conn";
import BookModel, { IBook } from "./models/Book";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/books", async (_, res: Response) => {
  try {
    const books = await BookModel.find();
    res.status(200).json({ books, msg: "Livros carregados com sucesso!" });
  } catch (error) {
    res.status(404).json({ msg: "Nenhum livro encontrado!" });
  }
});

app.post("/books", async (req: Request, res: Response) => {
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

app.get("/books/:id", async (req, res) => {
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

app.delete("/books/:id", async (req, res) => {
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

app.put("/books/:id", async (req, res) => {
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

conn();

const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
