import express from "express";
import {
  addTask,
  deleteTask,
  editTask,
  getTask,
  getTasks,
} from "../controllers/taskController.js";

const router = express.Router();
router.post("/add", addTask);
router.get("/get", getTasks);
router.get("/get/:id", getTask);
router.put("/edit/:id", editTask);
router.delete("/delete/:id", deleteTask);

export default router;
