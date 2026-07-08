import express from 'express';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Admin login
router.post('/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'zainadmin123';

  if (password === adminPassword) {
    const token = jwt.sign(
      { admin: true },
      process.env.JWT_SECRET || 'zain_portfolio_secret_key',
      { expiresIn: '7d' }
    );
    return res.json({ token, message: 'Logged in successfully.' });
  }

  return res.status(401).json({ message: 'Invalid password. Access denied.' });
});

// Admin verify token
router.post('/verify', authMiddleware, (req, res) => {
  return res.json({ valid: true });
});

export default router;
