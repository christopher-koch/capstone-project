import dbConnect from "@/data/connect";
import Url from "@/data/models/Urls";

export default async function handler(request, response) {
  console.log("trying to connect");
  await dbConnect();
  console.log("connected!");

  const urls = await Url.find();
  response.status(200).json(urls);
}
