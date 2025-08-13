import { Router } from "express";
import * as transactionController from "./transaction.controller.js";
import { tokenAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/borrow", tokenAuth, transactionController.borrowBook);

router.put("/return/:id", tokenAuth, transactionController.returnBook);

router.get("/user", tokenAuth, transactionController.listUserTransactions);

export default router;
