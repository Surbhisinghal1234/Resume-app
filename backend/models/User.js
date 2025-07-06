import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
uid: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  agreedToTerms: Boolean,
});

export default mongoose.model('User', userSchema);