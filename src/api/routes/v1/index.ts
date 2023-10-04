import express, {Request, Response} from "express";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    res.send("Hello from backend!");
})

export default router;