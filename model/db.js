import mongoose from 'mongoose';

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
const disconnect = async () => {
  await mongoose.disconnect();
};

const db = { connect, disconnect };

export default db;
