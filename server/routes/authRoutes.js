import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/signup",(req,res)=>{
    res.send("Signup Page");
})

export default router;
