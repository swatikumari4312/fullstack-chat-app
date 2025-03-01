
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectedDB } from "./lib/db.js";
import cors from "cors";
import { app , server} from "./lib/socket.js";
import path from "path";



app.use(express.json({ limit: "50mb" }));  // Adjust limit as needed
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


if(process.env.Node_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));


    app.get("*" ,(res,req)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

server.listen(PORT, () =>{
    console.log("server is running on PORT:" +PORT);
    connectedDB();
});