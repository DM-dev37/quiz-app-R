import mongoose from "mongoose";

export const connectDB = async () => {
await mongoose.connect('mongodb+srv://dilanebertrand1_db_user:mabasedb@cluster0.vatp6ca.mongodb.net/Quiz')
.then(() => {console.log('BD CONNECTED')})
}