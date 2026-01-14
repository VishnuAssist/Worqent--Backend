import express from "express";
import {LeaveGet,LeaveCreate,LeaveUpdate,LeaveDelete} from "../controllers/leave.controller.js"
const router =express.Router();

router.get("/",LeaveGet);
router.post("/",LeaveCreate);
router.patch("/:id",LeaveUpdate);
router.delete("/:id",LeaveDelete);

export default router;