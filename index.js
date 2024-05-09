import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// import { fileURLToPath } from 'url';
import path , { dirname } from 'path';

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

// deployment code
app.get("/", (req, res, next)=>{return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
})});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});