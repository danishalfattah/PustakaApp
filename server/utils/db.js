import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/pustaka")
  .then(console.log("koneksi berhasil"))
  .catch((err) => "database tidak terkoneksi" + err);
