const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = 'aa7687256a4e74329eae72dbc3036f5a4d14aa7fd670b86fac79321a2666bab4'

function authenticateToken(request, response, next) {
 const token = request.body.Authorization;
 
 if (!token) {
   return response.status(401).json({ message: 'No token provided.' });
 }

 jwt.verify(token, secretKey, (err, user) => {
   if (err) {
     return response.status(403).json({ message: 'Failed to authenticate token.' });
   }

   // Si le token est valide, stockez les informations de l'utilisateur dans request.user
   request.user = user;
   next();
 });
}

module.exports = authenticateToken;