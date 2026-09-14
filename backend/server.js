import express from "express";
import helmet from "helmet";
import morgan from "morgan"; 
import cors from "cors";
import dotenv from "dotenv"; 
import productRoutes from "./routes/productRoutes.js"

dotenv.config();
const app = express();
const PORT=process.env.PORT || 3030;

app.use(express.json());     // parse the incoming json data and set into products creation , image set , price set ...// 
app.use(cors());
app.use(helmet());         //This helmet is a security middleware that helps you protect your app by setting various http headers//
app.use(morgan("dev"));    // log requests

app.use("/api/products",productRoutes);

app.listen(3030,()=>{
    console.log("the server is running on port 3030");
});