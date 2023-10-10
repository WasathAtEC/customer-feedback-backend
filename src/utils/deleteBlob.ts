import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

dotenv.config();

const azureBlobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING!
);
const containerClient = azureBlobServiceClient.getContainerClient(
  process.env.BLOB_CONTAINER_NAME!
);

export const deleteBlob = async (blobName: string) => {
  const blobClient = containerClient.getBlockBlobClient(blobName);
  await blobClient.delete();
};
