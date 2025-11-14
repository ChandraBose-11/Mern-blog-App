import express from "express";
import { test ,updateUser,deleteUser,signout,getUsers} from "../Controllers/userController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import upload from "../Middleware/multer.js";
const router = express.Router();

router.get('/test', test);
router.put("/update/:userId", verifyToken, upload.single("profilePicture"), updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/signout',signout)
router.get('/getusers',verifyToken, getUsers);


export default router;
