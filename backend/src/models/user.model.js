import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Ensures emails are stored in lowercase
    },
    fullName: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing spaces
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: null, // More appropriate than an empty string
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;