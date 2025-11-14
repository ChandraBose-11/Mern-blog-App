import express from 'express'
import { verifyToken } from '../Middleware/verifyToken.js'
import { create,getposts,deletepost,updatePost,getPostById} from '../Controllers/postController.js'
import multer from 'multer'
const router = express.Router()

const upload = multer({ dest: "uploads/" });

router.post("/create", verifyToken, upload.single("image"), create);
router.get("/getposts", getposts);
router.get("/:postId", getPostById)
router.delete('/deletepost/:postId/:userId',verifyToken,deletepost)
router.put("/update/:postId", verifyToken, upload.single("image"), updatePost);
export default router;