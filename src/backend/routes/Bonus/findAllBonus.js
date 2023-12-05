const { Bonus } = require('../../sequelize')

module.exports = (app) => {
    app.get('/bonus', (req, res) => {
        Bonus.findAll({
            order: [['id', 'ASC']]
        })
            .then(bonus => {
                const message = 'The bonus list has been retrieved.'
                res.json({ message, data: bonus })
            })
    })
}


