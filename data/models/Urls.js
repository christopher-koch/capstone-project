import mongoose from "mongoose";

const { Schema } = mongoose;

const urlSchema = new Schema({
  longURL: String,
  shortURL: String,
  count: Number,
});

const Url = mongoose.models.Url || mongoose.model("url", urlSchema);

export default Url;
