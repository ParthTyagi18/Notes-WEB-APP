import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://tyiparth74_db_user:D1j3Pi9qH0SxT81h@cluster0.oespxwe.mongodb.net/?appName=Cluster0");
        console.log("MongoDB connected successfully!!");
    }
    catch(error){
        console.error("Error occured :",error);
        process.exit(1);
    }
} 