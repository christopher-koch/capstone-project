import dbConnect from "@/data/connect";
import Url from "@/data/models/Urls";

export default async function handler(request, response) {
  await dbConnect();
  const { shortUrl } = await request.query;

  if (request.method === "GET") {
    const url = await Url.findOne({ shortURL: shortUrl });
    if (url) {
      url.count += 1;
      url.save();
      return response.redirect(url.longURL);
    } else {
      return response.status(404).redirect("/404");
    }
  }

  if (request.method === "DELETE") {
    const urlToDelete = await Url.findOneAndDelete({ shortURL: shortUrl });
    response.status(200).json(urlToDelete);
  }

  if (request.method === "PUT") {
    const updatedUrl = await Url.findOneAndUpdate(
      { shortURL: shortUrl },
      {
        $set: request.body,
      }
    );
    console.log(updatedUrl);
    response.status(200).json(updatedUrl);
  }
}
