import { Router } from "express";

import { commentController } from "../controllers/commentController";
import { authenticateJWT, isAdmin } from "../middleware/auth";

const router = Router();

router.post("/", authenticateJWT, commentController.createComment);
router.get("/post/:postId", commentController.getCommentsByPostId);
router.delete("/post/:postId", isAdmin, commentController.deleteCommentsByPostId);

export const commentRoutes = router;