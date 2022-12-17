import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      slug: { type: String, required: true },
      category: [{type: String}],
      colors: [{type: String}],
      sizes: [{type: String }],
      image: { type: String, required: true },
      moreImage: [{type: String}],
      price: { type: Number, required: true },
      originalPrice: {type: Number},
      rating: { type: Number, required: true },
      numReviews: { type: Number, required: true },
      countInStock: { type: Number, required: true },
      numSold: {type: Number, required: true},
      description: { type: String, required: true },
      reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reviews'}]
    },
    {
      timestamps: true,
    }
  );


const Product =
mongoose.models.Product || mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      orderItems: [
        {
          _id: { type: String, required: true },
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          image: { type: String, required: true },
          color: { type: String, required: true },
          size: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
      shippingAddress: {
        fullName: { type: String, required: true },
        streetAddress: { type: String, required: true },
        streetAddress2: { type: String},
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: Number, required: true },
        email: { type: String },
      },
      itemsPrice: { type: Number, required: true },
      shippingPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      isPaid: { type: Boolean, required: true, default: false },
      isShipped: { type: Boolean, required: true, default: false },
      isDelivered: { type: Boolean, required: true, default: false },
      paidAt: { Type: Date },
      deliveredAt: { Type: Date },
    },
    {
      timestamps: true,
    }
  );
  
  const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

  const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isAdmin: { type: Boolean, required: true, default: false },
      itemsBought: { type: Number, required: true},
      totalSpent: { type: Number, required: true},
      orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
      reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
    },
    {
      timestamps: true,
    }
  );

  const User = mongoose.models.User || mongoose.model('User', userSchema);
  

  const reviewSchema = new mongoose.Schema(
    {
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
      product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
      
      productSlug: {type: String, required: true},
      isAdmin: {type: Boolean, required: true},
      rating: {type: Number, required: true},
      message: {type: String}
    },
    {
      timestamps: true,
    }
  );

  const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);



export {
    Product,
    Order,
    User,
    Review,
  };