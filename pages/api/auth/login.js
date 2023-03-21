import dbConnect from "@/data/connect";
import User from "@/data/models/Users";

export default async function handler(request, response) {
  await dbConnect();

  const checkIfUserExist = await User.findOne({ email: request.body.email });
  if (checkIfUserExist)
    return response.status(422).json({ message: "User already Exists" });

  if (request.method === "POST") {
    try {
      const userData = request.body;
      const user = new User(userData);
      user.save();
      response.status(201).json({ status: "User created." });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
