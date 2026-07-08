import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
  adminName: { type: String, default: 'Zain (Author)' },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: null },
  rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
  comment: { type: String, required: true },
  type: { type: String, required: true, default: 'Kudos' },
  badge: { type: String, required: true, default: '❤️ Heart' },
  approved: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] }, // Array of IP addresses or fingerprints to prevent double likes
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', ReviewSchema);
export default Review;
