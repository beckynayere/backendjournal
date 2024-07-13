import jwt from 'jsonwebtoken';

const generateToken = (userId: string): string => {
  const secretKey = process.env.JWT_SECRET || 'your_secret_key';
  const expiresIn = '1h'; // Token expiration time

  const token = jwt.sign({ id: userId }, secretKey, {
    expiresIn: expiresIn,
  });

  return token;
};

export default generateToken;
