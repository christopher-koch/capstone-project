import dbConnect from "@/data/connect";
import Url from "@/data/models/Urls";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const { shortUrl } = await request.query;
    const url = await Url.findOne({ shortURL: shortUrl });
    if (url) {
      url.count += 1;
      url.save();
      return response.redirect(url.longURL);
    } else {
      return response.status(404);
    }
  }

  if (request.method === "DELETE") {
    const { shortUrl } = await request.query;
    console.log(shortUrl);
    const urlToDelete = await Url.findOneAndDelete({ shortURL: shortUrl });
    response.status(200).json(urlToDelete);
  }
}
