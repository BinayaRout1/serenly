import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
  console.error("MongoDB ERROR MESSAGE:", error.message);
  console.error("MongoDB ERROR NAME:", error.name);
  console.error("FULL ERROR:", error);
  process.exit(1);
}
};
