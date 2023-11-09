const { User } = require('./sequelize');
require('dotenv').config();
// const secretKey = process.env.SECRET_KEY;
const secretKey = 'aa7687256a4e74329eae72dbc3036f5a4d14aa7fd670b86fac79321a2666bab4'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
app.post('/login', async (request, response) => {
  const { email, mdp } = request.body;

  try {
    // Rechercher l'utilisateur par e-mail dans la base de données
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return response.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    // Comparer le mot de passe haché avec celui fourni par l'utilisateur
    const isPasswordValid = await bcrypt.compare(mdp, user.mdp); //vérifier comapre mdp en clair

    if (!isPasswordValid) {
      return response.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Si les informations de connexion sont valides, générez un token JWT
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

    // Retournez le token en réponse
    response.json({ token });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Une erreur s est produite' });
  }
})};
