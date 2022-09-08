import dbConnect from "../../../util/mongoDb";
import Product from "../../../models/product";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const { token } = cookies;

  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  if (method === "POST") {

    console.log(req.body.categories);

    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated");
    }

    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
