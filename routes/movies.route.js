import express from "express";
import { MovieCreate, MovieDelete, MovieGet, MovieGetById, MovieUpdate } from "../controllers/movies.controller.js";

const router = express.Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies or search by title
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search movie by title (partial & case-insensitive)
 *     responses:
 *       200:
 *         description: List of movies
 */

router.get("/", MovieGet);

router.get("/:id",MovieGetById);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - desc
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 10
 *               desc:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       400:
 *         description: Validation error
 */

router.post("/", MovieCreate);



router.put("/:id", MovieUpdate);

router.delete("/:id", MovieDelete);

export default router;
