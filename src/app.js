import express from "express";
import dontenv from "dotenv";
import { errorHandler } from "./middleware/error.middleware.js";
import { sanitizeInput } from "./middleware/sanitize.middleware.js";
import userRoutes from "./modules/user/user.routes.js";
import bookRoutes from "./modules/book/book.routes.js";
import transactionRoutes from "./modules/transaction/transaction.routes.js";


dontenv.config();

const app = express();

app.use(express.json());

//sanitization middleware =>
app.use(sanitizeInput);

//test Api =>
app.get("/", (req, res) => {
  res.send("✅ Server is running !");
});

//user Apis =>
app.use("/api/users", userRoutes);

//book Apis =>
app.use("/api/books", bookRoutes);

//transaction Apis =>
app.use("/api/transactions", transactionRoutes);

// error handling catcher =>
app.use(errorHandler);

export default app;
