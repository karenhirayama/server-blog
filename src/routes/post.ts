import { Router } from "express";

import { postController } from "../controllers/postController";

import { isAdmin } from "../middleware/auth";

const router = Router()

router.post('/', postController.createPost)
router.get('/', postController.getPosts)
router.get('/:id', postController.getPostById)
router.put('/:id', isAdmin, postController.updatePost)

export const postRoutes = router