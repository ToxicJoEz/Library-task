import { Router } from "express";
import * as bookController from "./book.controller.js";
import * as bookValidation from "./book.validation.js";
import { validateRequest } from "../../middleware/validationRequest.js";
import { tokenAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/",
  tokenAuth,
  validateRequest(bookValidation.addBookSchema),
  bookController.addBook
);

router.get("/", tokenAuth, bookController.listBooks);

router.put(
  "/:id",
  tokenAuth,
  validateRequest(bookValidation.updateBookSchema),
  bookController.updateBook
);

router.delete("/:id", tokenAuth, bookController.deleteBook);

export default router;
