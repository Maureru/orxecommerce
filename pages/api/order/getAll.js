import { Order } from '../../../model';
import db from '../../../model/db';

export default async function handler(req, res) {
  await db.connect();
  const orders = await Order.find({})
    .sort({ createdAt: 'descending' })
    .populate('user');
  await db.disconnect();
  res.json(orders);
}
