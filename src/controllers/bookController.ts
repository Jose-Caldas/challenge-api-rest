import { Response, Request } from "express";
import BookModel, { IBook } from "../models/BookModel";
import { ZodError } from "zod";
import { bookSchema, validateBook } from "../schemas/bookSchema";

const bookController = {
  create: async (req: Request, res: Response) => {
    try {
      const { title, author, isbnNumber } = req.body;

      bookSchema.parse(req.body);

      const newBook: IBook = new BookModel({
        title,
        author,
        isbnNumber,
      });

      validateBook(newBook);
      await newBook.save();

      res.status(201).json({ newBook, msg: "Successfully created book!" });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(
          error.issues.map((issue) => ({
            message: issue.message,
          }))
        );
      }

      return res.status(500).json({ message: "Internal server error!" });
    }
  },

  getAll: async (res: Response) => {
    try {
      const books = await BookModel.find();
      res.status(200).json({ books, msg: "Books loaded successfully!" });
    } catch (error) {
      res.status(404).json({ msg: "No books found!" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const book = await BookModel.findById(id);

      if (!book) {
        res.status(404).json({ msg: "Book not found!" });
        return;
      }
      res.json(book);
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const { title, author, isbnNumber } = req.body;
      const book: IBook = new BookModel({
        _id: id,
        title,
        author,
        isbnNumber,
      });

      const updateBook = await BookModel.findByIdAndUpdate(id, book);

      if (!updateBook) {
        res.status(404).json({ msg: "Book not found!" });
        return;
      }

      res.status(200).json({ book, msg: "Book updated successfully!" });
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const book = await BookModel.findById(id);
      if (!book) {
        res.status(404).json({ msg: "Book not found!" });
        return;
      }

      const deleteBook = await BookModel.findByIdAndDelete(id);
      res.status(200).json({ deleteBook, msg: "Book deleted successfully!" });
    } catch (error) {
      console.log(error);
    }
  },
};

export default bookController;
