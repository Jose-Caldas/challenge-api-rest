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

conn();

const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
