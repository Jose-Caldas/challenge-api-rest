import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app";

describe("app routes", () => {
  it("should be able to list all books", async () => {
    const response = await request(app).get("/books");

    expect(response.statusCode).toEqual(200);
  });

  it("should be able user to create a new book", async () => {
    const response = await request(app).post("/books").send({
      title: "New Book",
      author: "Test Author",
      isbnNumber: 123456789,
    });

    expect(response.statusCode).toEqual(201);
  });
});
