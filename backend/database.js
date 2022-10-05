import mongoose from "mongoose";

const URI = process.env.MONGO_URI

export const connectToDataBase = () => {
    mongoose.connect(URI, () => console.log(`Database Connected Succesfully!`))
}