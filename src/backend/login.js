const { User } = require('./sequelize');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
app.post('/login', async (request, response) => {
  const { email, mdp } = request.body;

  try {
    
    const user = await User.findOne({ where: { email } });
    

    if (!user) {
      return response.status(401).json({ message: 'Adresse mail incorrecte' });
    }


    const isPasswordValid = await bcrypt.compare(mdp, user.mdp);

    if (!isPasswordValid) {
      return response.status(401).json({ message: 'Mot de passe incorrect' });
    }


    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '24h' });

    response.json({ token });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Une erreur s est produite' });
  }
})};

