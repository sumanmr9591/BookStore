import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedYear
    ) {
      return response
        .status(500)
        .send({ message: "Send all mandatory fields" });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishedYear: request.body.publishedYear,
    };
    const book = await Book.create(newBook);
    return response.send(201).json(book);
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});

// Delete a Book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Book not Found" });
    }
    return response.status(201).send({ message: "Book Deleted successfully" });
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});

// Get all books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(201).send({
      count: books.length,
      data: books,
    });
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});

// Get book by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(201).send(book);
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});

// Update a Book
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedYear
    ) {
      return response
        .status(500)
        .send({ message: "Send all mandatory fields" });
    }
    const updateBook = {
      title: request.body.title,
      author: request.body.author,
      publishedYear: request.body.publishedYear,
    };
    const result = await Book.findByIdAndUpdate(id, updateBook);
    if (!result) {
      return response.status(404).json({ message: "Book not Found" });
    }
    return response.status(201).send({ message: "Book updated successfully" });
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});
export default router;
