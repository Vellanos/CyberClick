const { Bonus } = require('../../sequelize')

module.exports = (app) => {
    app.get('/bonus', (req, res) => {
        Bonus.findAll()
            .then(bonus => {
                const message = 'La Liste des bonus a bien été récupérée.'
                res.json({ message, data: bonus })
            })
    })

}