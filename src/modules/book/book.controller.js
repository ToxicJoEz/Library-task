import Book from "./book.model.js";
import { CustomError } from "../../utils/customError.js";

export const addBook = async (req, res, next) => {
  try {
    const { title, author, publishedYear, availableCopies } = req.body;

    const existingBook = await Book.findOne({ title, author });

    if (existingBook) {
      existingBook.availableCopies += availableCopies;
      await existingBook.save();

      return res.status(200).json({
        message: "Book updated successfully",
        book: existingBook,
      });
    }

    const newBook = new Book({
      title,
      author,
      publishedYear,
      availableCopies,
    });

    await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (err) {
    next(err);
  }
};

export const listBooks = async (req, res, next) => {
  try {
    const { sortBy } = req.query;
    let sortOption = {};

    if (sortBy === "title") sortOption.title = 1;
    else if (sortBy === "publishedYear") sortOption.publishedYear = 1;

    const books = await Book.find().sort(sortOption);

    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const book = await Book.findById(id);
    if (!book) throw new CustomError("Book not found", 404);

    Object.keys(updates).forEach((key) => {
      book[key] = updates[key];
    });

    await book.save();

    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) throw new CustomError("Book not found", 404);

    await book.deleteOne();

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
