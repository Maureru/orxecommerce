import { Review } from '../../../model';
import db from '../../../model/db';

export default async function handler(req, res) {
  /* const {userName, userId, isAdmin, message} = req.body; */
  await db.connect();

  try {
    const review = await new Review(req.body);
    const newReview = await review.save();

    const getReview = await Review.findOne({ _id: newReview._id }).populate(
      'user'
    );
    await db.disconnect();
    res.json(getReview);
  } catch (err) {
    res.json({ Error: 'Network Error' });
  }
}
