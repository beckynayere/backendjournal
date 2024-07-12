const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = async (req, res, next) => {
    const token = req.header ('Authorization ').replace(' Bearer', '');
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const user = await User.findByPk(decoded.id);
        if (!user) throw new Error();
        req.user=user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
    };


// exports.authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).json({ message: 'Access Denied' });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid Token' });
//   }
// };
