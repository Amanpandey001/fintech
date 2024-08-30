import mongoose from "mongoose";

let isconn=false
export const dbconnect = async () => {
    mongoose.set('strictQuery', true);
    if(isconn){
        console.log("Already connected");
        return new Response("Already connected")
    }

    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: 'fintech',
        });
        isconn=true
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        })
        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        })
        mongoose.connection.on("error", (error) => {
            console.log("MongoDB connection error:", error);
        })
    } catch (error) {
        console.log("An error occurred in dbconnect:", error);
    }
}