import { Order } from '../../../model';
import db from '../../../model/db';

export default async function handler(req, res) {
  await db.connect();
  const order = await new Order(req.body);
  const newOrder = await order.save();
  await db.disconnect();
  res.json(newOrder);
}
