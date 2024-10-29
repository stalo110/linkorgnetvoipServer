import dotenv from "dotenv";
dotenv.config();

import app from "../app";
import { createServer } from "http";
import mongoose from "mongoose";

const port: number = parseInt(process.env.PORT || "4000", 10);

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

//mongoDb connection
// const url = process.env.MONGO_URL as string
// mongoose.connect(url).then(() => console.log("Database connected")).catch((error) => console.log(error))