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
