import express from "express";
import {
  DictionaryGet,
  DictionaryGetById,
  DictionaryCreate,
  DictionaryUpdate,
  DictionaryDelete,
} from "../controllers/dictionary.controller.js";
const router = express.Router();

router.get("/", DictionaryGet);
router.get("/:id", DictionaryGetById);
router.post("/", DictionaryCreate);
router.patch("/:id", DictionaryUpdate);
router.delete("/:id", DictionaryDelete);
export default router;