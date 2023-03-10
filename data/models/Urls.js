import mongoose from "mongoose";

const { Schema } = mongoose;

const urlSchema = new Schema({ url: { type: String, required: true } });

const Url = mongoose.models.Url || mongoose.model("url", urlSchema);

export default Url;
