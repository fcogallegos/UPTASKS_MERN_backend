import express from "express";
const router = express.Router();


router.get("/", (req, res) => {
    res.send("from api/users")
});


export default router;