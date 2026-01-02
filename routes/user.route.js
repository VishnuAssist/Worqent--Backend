import express from "express";
import {
  UserCreate,
  UserGet,
  UserGetById,
} from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users or search users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by username or email
 */
router.get("/", UserGet);

router.get("/:id", UserGetById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 */
router.post("/", UserCreate);

export default router;
