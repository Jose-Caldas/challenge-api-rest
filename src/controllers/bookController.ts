import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Book, { IBook } from "../models/Book";
import BookModel from "../models/Book";

// const bookMemory: IBook[] = [];

const bookController = {
  getAll: async (res: Response) => {
    try {
      const books = await Book.find();
      if (books.length === 0) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "Nenhum livro localizado!" });
        return;
      }
      res
        .status(StatusCodes.OK)
        .json({ books, msg: "Livros carregados com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { title, author, isbnNumber } = req.body;
      const newBook: IBook = new BookModel({
        title,
        author,
        isbnNumber,
      });

      const response = await BookModel.create(newBook);

      await newBook.save();
      res
        .status(StatusCodes.CREATED)
        .json({ response, msg: "Livro criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
};

export { bookController };
