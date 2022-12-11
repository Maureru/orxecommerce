import { Product } from '../../../model';
import db from '../../../model/db';

export default async function handler(req, res) {
  try {
    console.log(req.body, 'y');
    await db.connect();
    console.log('to');
    await Product.findOneAndUpdate(
      { _id: req.body._id },
      {
        name: req.body.name,
        slug: req.body.slug,
        category: req.body.category,
        colors: req.body.colors,
        description: req.body.description,
        image: req.body.image,
        moreImage: req.body.moreImage,
        price: req.body.price,
        originalPrice: req.body.originalPrice,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        sizes: req.body.sizes,
        numReviews: req.body.numReviews,
        numSold: req.body.numSold,
      }
    );
    await db.disconnect();
    res.json({ message: 'added succesful' });
  } catch (err) {
    res.json({ err: err });
  }
}
