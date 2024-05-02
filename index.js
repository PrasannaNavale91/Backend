import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// import { fileURLToPath } from 'url';
// import path ,{ dirname } from 'path';

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

try{
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
} catch (error) {
    console.log("Error: ", error);
}

app.use("/book", bookRoute);
app.use("/user", userRoute);

// Get the directory name of the current module
// const __dirname = dirname(fileURLToPath(import.meta.url));

// app.get("/", (req, res) => {
//     app.use(express.static(path.resolve(__dirname, "Frontend", "dist")));
//     res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});