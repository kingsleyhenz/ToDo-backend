import mongoose from "mongoose";

export const dbConnect = async (): Promise<void> => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect((process.env.MONGO_URL as string) || '');
        console.log('Database connected successfully');
    } catch (error: any) {
        console.log(error.message);
        process.exit(1);
    }
}