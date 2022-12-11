import { Product } from '../../../model';
import db from '../../../model/db';

export default async function handler(req, res) {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.json(products);
}
