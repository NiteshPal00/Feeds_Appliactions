import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routers/users.routers";
import postRouter from "./routers/post.routers";

const app = express();
app.use(express.json());
app.use(cors());

const port = 8005;

app.get(`/`, (req, res) => {
  res.send(`Server ki duniya`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/InterView_Project")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(userRouter);
app.use(postRouter);
