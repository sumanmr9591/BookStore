import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/books", bookRouter);

app.get("/", (request, response) => {
  response.status(201).send("I am from Backend API");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Mongo DB connected successfully");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
