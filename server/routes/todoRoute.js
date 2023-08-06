import { Router } from "express";
import { addTodo, getTodos, completeTodo, deleteTodo } from "../controllers/todoController.js";
import userAuth from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/addTodo", userAuth , addTodo);
router.get("/getTodos", userAuth , getTodos);
router.put("/completeTodo/:id", userAuth , completeTodo);
router.delete("/deleteTodo/:id", userAuth , deleteTodo);

export default router;