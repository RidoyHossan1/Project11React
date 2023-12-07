import connectToMongo from "./db.js";
import auth from "./routes/auth.js";
import notes from "./routes/notes.js";
import express from "express";
import cors from "cors";


connectToMongo();
const app = express();
const port = 4000;


app.use(cors())
app.use(express.json());

// Available Routes
app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.listen(port, () => {
  console.log(`iNoteBook app backend listening on port ${port}`);
});
