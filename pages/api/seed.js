import { Product } from '../../model';
import db from '../../model/db';
import { Products } from '../../data/products';

export default async function handler(req, res) {
  try {
    await db.connect();
    await Product.deleteMany({});
    await Product.insertMany(Products);
    await db.disconnect();
    res.send({ message: 'seeded succesful' });
  } catch (err) {
    res.send(err);
  }
}
