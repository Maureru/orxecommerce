import { Product } from '../../../../model';
import db from '../../../../model/db';

export default async function handler(req, res) {
  await db.connect();
  console.log(req.body.search);
  try {
    const products = await Product.find({
      $or: [
        { name: new RegExp(req.body.search, 'i') },
        { description: new RegExp(req.body.search, 'i') },
      ],
    });
    await db.disconnect();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.json([]);
  }
}
