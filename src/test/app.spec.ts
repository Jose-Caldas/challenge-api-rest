import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app";

const book = {
  title: "New Book",
  author: "Test Author",
  isbnNumber: 123456789,
};

describe("app routes", () => {
  it("should be able to list all books", async () => {
    const response = await request(app).get("/books");

    expect(response.statusCode).toEqual(200);
    expect(response.body.msg).toEqual("Books loaded successfully!");
  });

  it("should be able user to create a new book", async () => {
    const response = await request(app).post("/books").send(book);

    expect(response.statusCode).toEqual(201);
    expect(response.body.msg).toEqual("Successfully created book!");
  });

  it("should be able to get a specific book", async () => {
    const response = await request(app).post("/books").send(book);

    const id = response.body.newBook._id;

    const bookResponse = await request(app).get(`/books/${id}`);

    expect(bookResponse.body).toMatchObject({
      title: "New Book",
      author: "Test Author",
      isbnNumber: 123456789,
    });
  });

  it("should be able to delete a specific book", async () => {
    const response = await request(app).post("/books").send(book);

    const id = response.body.newBook._id;

    const bookResponse = await request(app).delete(`/books/${id}`);

    expect(bookResponse.statusCode).toEqual(200);
    expect(bookResponse.body.msg).toEqual("Book deleted successfully!");
  });
});
