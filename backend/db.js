import mongoose from "mongoose";

// const mongoURI = "mongodb+srv://root:admin@cluster0.hbxohlh.mongodb.net/iNoteBook";
const mongoURI = "mongodb://localhost:27017/iNoteBook";

const connectToMongo = () => {
  mongoose.connect(mongoURI);

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  db.once("open", () => {
    console.log("MongoDB Connected Successfully");
  });
};

export default connectToMongo;
