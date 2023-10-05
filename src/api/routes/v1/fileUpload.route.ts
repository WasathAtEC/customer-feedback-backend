import express from "express";
import { handleUpload } from "../../controller/fileUpload.controller";
import { uploadFile } from "../../middleware/fileUpload";

const router = express.Router();

router.post("/upload-file", uploadFile, handleUpload);

export default router;