import { Product } from '../../../model';
import db from '../../../model/db';

export default async function handler(req, res) {
  await db.connect();
  const products = await Product.aggregate([{ $sample: { size: 5 } }]);
  await db.disconnect();
  res.json(products);
}
