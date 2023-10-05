import { Request, Response } from "express";
import { containerClient } from "../../api/middleware/fileUpload";
import { v4 as uuid4 } from "uuid";

export const handleUpload = async (req: Request, res: Response ) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const fileExtension = file.originalname.split(".").pop();

    const blobName = `${uuid4()}-${Date.now()}.${fileExtension}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    let contentType = "application/octet-stream";
    if (file.mimetype === "image/jpeg") {
      contentType = "image/jpeg";
    } else if (file.mimetype === "image/png") {
      contentType = "image/png";
    }

    const uploadBlobResponse = await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: {
        blobContentType: contentType,
      },
    });

    console.log(
      `Upload block blob ${blobName} successfully`,
      uploadBlobResponse.requestId
    );
    return res
      .status(201)
      .json({ message: "File uploaded successfully!", blobName: blobName });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
