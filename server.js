import express from 'express'
import dotenv from "dotenv"
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRouters from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoute.js";
import roomRoutes from "./routes/roomRoute.js"
import productRoutes from "./routes/productRoute.js"
import cors from "cors"
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouters);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/product", productRoutes);


app.get("/", (req, res) => {
    res.send("<h1>Welcome</h1>");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is runing on ${PORT}`)
})