import mongoose from "mongoose";

import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${}/${}`);
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);        
    } catch (error) {
        console.log("MONGODB connection failed", error);
        process.exit(1);
    }
}

export default connectDB;