import { Review } from '../../../model';
import db from '../../../model/db';

export default async function handler(req, res) {
  /* const {userName, userId, isAdmin, message} = req.body; */
  await db.connect();

  try {
    
    const review = await Review.find({
      productSlug: req.body.productSlug,
    })
      .sort({ createdAt: 'desc' })
      .populate('user');
    await db.disconnect();
    res.json(review);
  } catch (err) {
    res.json({ Error: 'Network Error' });
  }
}
