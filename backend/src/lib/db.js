import mongoose from "mongoose";

export const connectedDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.log("MOngoDB connection error:", error);
    }
}