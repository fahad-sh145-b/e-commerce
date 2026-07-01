require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtAuthmiddleware = (req,res,next)=>{

    const authorization = req.headers.authorization;


    if(!authorization){
        return res.status(401).json({error:'unauthorized'})
    }

    const token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({error:'Token not found'})
    }


    try {
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment');
            return res.status(500).json({ error: 'Server misconfiguration' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

        req.user = decoded;

        next();

    } catch (err) {
        console.error('JWT verification error:', err && err.message ? err.message : err);
        console.error('Token received:', token && token.slice ? token.slice(0, 40) + '...' : token);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
    }




    const generatetoken = (user)=>{
     

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }

    return jwt.sign(user, process.env.JWT_SECRET, { algorithm: 'HS256' });

    }





    module.exports= {jwtAuthmiddleware,generatetoken};