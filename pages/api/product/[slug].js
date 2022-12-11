import { Product } from '../../../model';
import db from '../../../model/db';

export default async function handler(req, res) {
  await db.connect();
  try {
    const product = await Product.find({ slug: req.query.slug });
    await db.disconnect();
    res.json(product[0]);
  } catch (err) {
    res.json(err);
  }
}
