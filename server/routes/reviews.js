import express from 'express';
import Review from '../models/Review.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get client IP helper
const getClientIp = (req) => {
  return req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
};

// GET /api/reviews - Get all approved reviews
router.get('/', async (req, res) => {
  try {
    const ip = getClientIp(req);
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    
    // Map reviews to include userLiked indicator for this IP
    const formatted = reviews.map(r => ({
      id: r._id,
      name: r.name,
      email: r.email,
      rating: r.rating,
      comment: r.comment,
      type: r.type,
      badge: r.badge,
      likes: r.likes,
      date: r.createdAt.toISOString(),
      replies: r.replies.map(rep => ({
        id: rep._id,
        adminName: rep.adminName,
        comment: rep.comment,
        date: rep.createdAt.toISOString()
      })),
      userLiked: r.likedBy.includes(ip)
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews.', error: error.message });
  }
});

// POST /api/reviews - Add a new review (defaults to approved: false)
router.post('/', async (req, res) => {
  try {
    const { name, email, rating, comment, type, badge } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ message: 'Name and comment are required.' });
    }

    const review = new Review({
      name: name.trim(),
      email: email ? email.trim() : null,
      rating: Number(rating) || 5,
      comment: comment.trim(),
      type: type || 'Kudos',
      badge: badge || '❤️ Heart',
      approved: false // Moderate by default
    });

    const saved = await review.save();
    res.status(201).json({
      id: saved._id,
      name: saved.name,
      email: saved.email,
      rating: saved.rating,
      comment: saved.comment,
      type: saved.type,
      badge: saved.badge,
      approved: saved.approved,
      likes: saved.likes,
      date: saved.createdAt.toISOString(),
      replies: [],
      userLiked: false
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving review.', error: error.message });
  }
});

// POST /api/reviews/:id/like - Toggle like on a review (using IP tracking)
router.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const ip = getClientIp(req);
    
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    const likeIndex = review.likedBy.indexOf(ip);
    let userLiked = false;

    if (likeIndex > -1) {
      // Unlike
      review.likedBy.splice(likeIndex, 1);
      review.likes = Math.max(0, review.likes - 1);
      userLiked = false;
    } else {
      // Like
      review.likedBy.push(ip);
      review.likes += 1;
      userLiked = true;
    }

    await review.save();
    res.json({ id: review._id, likes: review.likes, userLiked });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling like.', error: error.message });
  }
});

// DELETE /api/reviews/user/:id - Public user deletion of their own review
router.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }
    res.json({ id, message: 'Review deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review.', error: error.message });
  }
});

/* ── Admin Moderation Endpoints (Require Auth Middleware) ── */

// GET /api/reviews/admin/pending - Get all reviews pending approval
router.get('/admin/pending', authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find({ approved: false }).sort({ createdAt: -1 });
    const formatted = reviews.map(r => ({
      id: r._id,
      name: r.name,
      email: r.email,
      rating: r.rating,
      comment: r.comment,
      type: r.type,
      badge: r.badge,
      likes: r.likes,
      date: r.createdAt.toISOString()
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending reviews.', error: error.message });
  }
});

// PATCH /api/reviews/:id/approve - Approve a review
router.patch('/:id/approve', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(id, { approved: true }, { new: true });
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }
    res.json({ id: review._id, approved: true, message: 'Review approved.' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving review.', error: error.message });
  }
});

// DELETE /api/reviews/:id - Delete a review
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }
    res.json({ id, message: 'Review deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review.', error: error.message });
  }
});

// POST /api/reviews/:id/reply - Add admin reply to a review
router.post('/:id/reply', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment || !comment.trim()) {
      return res.status(400).json({ message: 'Reply comment is required.' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    const newReply = {
      adminName: 'Zain (Author)',
      comment: comment.trim(),
      createdAt: new Date()
    };

    review.replies.push(newReply);
    await review.save();

    // Return formatting of the newly added reply
    const added = review.replies[review.replies.length - 1];
    res.status(201).json({
      id: added._id,
      adminName: added.adminName,
      comment: added.comment,
      date: added.createdAt.toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding reply.', error: error.message });
  }
});

export default router;
