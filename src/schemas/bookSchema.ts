import { z, ZodError } from "zod";

const bookSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required!")
    .min(3, "Title must contain at least 3 characteres!"),
  author: z
    .string()
    .nonempty("Author is required!")
    .min(3, "Author must contain at least 3 characteres!"),
  isbnNumber: z.number().positive(),
});

type BookType = z.infer<typeof bookSchema>;

const validateBook = (book: BookType) => {
  return bookSchema.parse(book);
};

export { bookSchema, validateBook };
