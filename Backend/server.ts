import "dotenv/config";
import { app } from "./src/app.js";
import config from "./src/config/config.js";
import { connectDb } from "./src/config/database.js";

const PORT: string | number = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is starting on PORT : ${PORT}`);
    });
  } catch (error) {
    console.log("Error while starting server !");
    process.exit(1);
  }
}
startServer();
