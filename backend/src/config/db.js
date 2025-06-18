import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const connectDB = async () => {
    try {
        const mongoDbUrl = process.env.MONGODB_URL;

        if (!mongoDbUrl) {
            console.error(
            "No MongoDB url provided. Make sure there is a MONGODB_URL environment variable set."
            );
            throw new Error("No connection string provided");
        }

        await mongoose.connect(mongoDbUrl);

        if (process.env.NODE_ENV !== "test") {
            console.log("Successfully connected to MongoDB");
        }
        
    } catch (error) {
        console.error("Error connecting to database", error)
        process.exit(1) //exit with failure
    }
}

