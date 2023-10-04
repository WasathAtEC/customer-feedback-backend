import { app } from "./config/express";
import { connect } from "./config/db";

const PORT = 8000;
const HOST = "localhost";

connect()
  .then(() => {
    try {
      app.listen(PORT, HOST, () => {
        console.log(`Backend is running on http://${HOST}:${PORT}`);
      });
    } catch (error) {
      console.error("Error while starting up server", error);
    }
  })
  .catch((error) => {
    console.error("Error while connecting to database", error);
  });
