import dbConnect from "@/data/connect";
import Url from "@/data/models/Urls";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const { shortUrl } = await request.query;
    const url = await Url.findOne({ shortURL: shortUrl });
    if (url) {
      return response.redirect(url.longURL);
    } else {
      return response.status(404);
    }
  } else {
    return response.status(400);
  }
}
