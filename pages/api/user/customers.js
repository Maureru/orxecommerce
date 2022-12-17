import { User } from '../../../model';
import db from '../../../model/db';

export default async function handler(req, res) {
  await db.connect();
  const customers = await User.find({ isAdmin: { $ne: true } });
  await db.disconnect();
  res.json(customers);
}
