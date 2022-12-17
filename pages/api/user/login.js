import { User } from '../../../model';
import { signToken } from '../../../middleware';
import db from '../../../model/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    db.connect();
    const user = await User.findOne({ email: email });
    db.disconnect();
    if (!user) {
      res.json({ Error: 'You are not registered!' });
    } else {
      if (await bcrypt.compare(password, user.password)) {
        const token = signToken(user);
        res.json({
          token,
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      } else {
        res.json({ Error: 'Wrong Password!' });
      }
    }
  } catch (err) {
    res.json({ Error: 'Try again!' });
  }
}
