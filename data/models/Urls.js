import mongoose from "mongoose";

const { Schema } = mongoose;

const UrlSchema = new Schema({
  longURL: String,
  shortURL: String,
  count: Number,
});

const Url = mongoose.models.Url || mongoose.model("Url", UrlSchema);

export default Url;
