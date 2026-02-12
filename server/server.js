import express from "express";
import cors from "cors";
import Book from "./model/book.js";
import "./utils/db.js";
import mongoose from "mongoose";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ nama: "dnsadas" });
});

app.get("/api/books", async (req, res) => {
  const books = await Book.find();
  res.json({ status: "success", data: books });
});

app.get("/api/books/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ status: "error", msg: "ID tidak Valid" });
  }

  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json({ status: "success", data: book });
    } else {
      res.status(404).json({ msg: "Buku tidak ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
});

app.post("/api/books", async (req, res) => {
  const duplikat = await Book.findOne({ judul: req.body.judul });
  if (duplikat) {
    return res.status(400).json({ error: "Buku sudah ada" });
  }
  try {
    const newBook = await Book.insertMany(req.body);
    res.status(201).json({ status: "success", data: newBook });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
});

app.put("/api/books/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ status: "error", msg: "ID tidak Valid" });
  }

  const duplikat = await Book.findOne({
    judul: req.body.judul,
    _id: { $ne: req.params.id },
  });
  if (duplikat) {
    return res.status(400).json({ error: "Buku sudah ada" });
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: updatedBook });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.msg });
  }
});

app.delete("/api/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: deletedBook });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.msg });
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
