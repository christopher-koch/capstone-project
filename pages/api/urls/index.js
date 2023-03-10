import dbConnect from "@/data/connect";
import Url from "@/data/models/Urls";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const urls = await Url.find();
    response.status(200).json(urls);
  }

  if (request.method === "POST") {
    try {
      const urlData = request.body;
      const url = new Url(urlData);
      url.save();
      response.status(201).json({ status: "Url created." });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
