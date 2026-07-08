import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'zain_portfolio_secret_key');
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token verification failed. Unauthorized.' });
  }
};

export default authMiddleware;
