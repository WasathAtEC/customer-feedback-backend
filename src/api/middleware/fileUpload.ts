import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING!
);

export const containerClient =
  blobServiceClient.getContainerClient(process.env.BLOB_CONTAINER_NAME!);

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadFile = upload.single("file");
