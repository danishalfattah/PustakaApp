import mongoose from "mongoose";

const Book = mongoose.model("Book", {
  judul: { type: String, required: true, unique: true },
  penulis: { type: String, required: true },
  penerbit: { type: String, required: true },
  tahun: { type: Number, required: true, max: new Date().getFullYear() },
  halaman: { type: Number, required: true },
});

export default Book;
