import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
