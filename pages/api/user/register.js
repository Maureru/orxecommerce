import { User } from '../../../model';
import db from '../../../model/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { name, email, isAdmin } = req.body;
  await db.connect();

  try {
    const isEmailExist = await User.findOne({ email: email });
    if (isEmailExist) return res.json({ Error: 'Email already exist!' });

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = await new User({
      name: name,
      email: email,
      password: hashPassword,
      isAdmin: isAdmin,
      itemsBought: 0,
      totalSpent: 0,
    });
    const newUser = await user.save();
    await db.disconnect();
    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      itemsBought: newUser.itemsBought,
      totalSpent: newUser.totalSpent,
    });
  } catch (err) {
    res.json({ Error: 'Network Error, try again' });
  }
}
