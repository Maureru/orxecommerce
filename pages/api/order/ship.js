import { Order } from '../../../model';
import db from '../../../model/db';

export default async function handler(req, res) {
  await db.connect();
  await Order.findOneAndUpdate(
    { _id: req.body.id },
    {
      isShipped: true,
    }
  );
  await db.disconnect();
  res.json({ message: 'Shipped succesful!' });
}
