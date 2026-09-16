import express from "express";
import helmet from "helmet";
import morgan from "morgan"; 
import cors from "cors";
import dotenv from "dotenv"; 
import productRoutes from "./routes/productRoutes.js"
import { sql } from "./config/db.js";

dotenv.config();
const app = express();
const PORT=process.env.PORT || 3030;

app.use(express.json());     // parse the incoming json data and set into products creation , image set , price set ...// 
app.use(cors());
app.use(helmet());         //This helmet is a security middleware that helps you protect your app by setting various http headers//
app.use(morgan("dev"));    // log requests

app.use("/api/products",productRoutes);

async function initDB(){
    try{
        await sql`
        CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        console.log("Database initialized successfully.");

    }
    catch(error){
        console.error("Error initializing database:", error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
 });