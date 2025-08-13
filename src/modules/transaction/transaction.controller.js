import Transaction from "./transaction.model.js";
import Book from "../book/book.model.js";
import { CustomError } from "../../utils/customError.js";

export const borrowBook = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.body;

    if (!bookId) throw new CustomError("Book ID is required", 400);

    const book = await Book.findById(bookId);
    if (!book) throw new CustomError("Book not found", 404);
    if (book.availableCopies < 1)
      throw new CustomError("No available copies", 400);

    const transaction = new Transaction({
      userId,
      bookId,
      status: "borrowed",
      borrowDate: new Date(),
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    book.availableCopies -= 1;

    await Promise.all([transaction.save(), book.save()]);

    res.status(201).json({
      message: "Book borrowed successfully",
      transaction,
    });
  } catch (err) {
    next(err);
  }
};

export const returnBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);
    if (!transaction) throw new CustomError("Transaction not found", 404);

    if (transaction.status !== "borrowed") {
      throw new CustomError("Book already returned", 400);
    }

    transaction.status = "returned";
    transaction.returnDate = new Date();
    await transaction.save();

    const book = await Book.findById(transaction.bookId);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.status(200).json({
      message: "Book returned successfully",
      transaction,
    });
  } catch (err) {
    next(err);
  }
};

export const listUserTransactions = async (req, res, next) => {
  try {
    const userId = req.user._id; 

    const transactions = await Transaction.find({ userId }).populate("bookId");

    res.status(200).json({
      message: "User transactions retrieved successfully",
      transactions,
    });
  } catch (err) {
    next(err);
  }
};
