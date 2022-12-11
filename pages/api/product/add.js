import { Product } from '../../../model';
import db from '../../../model/db';

export default async function handler(req, res) {
  try {
    console.log(req.body, 'y');
    await db.connect();
    console.log('to');
    const product = await new Product(req.body);
    await product.save();
    await db.disconnect();
    res.json({ message: 'added succesful' });
  } catch (err) {
    res.json({ err: err });
  }
}
