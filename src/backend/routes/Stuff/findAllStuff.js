const { Stuff } = require('../../sequelize')

module.exports = (app) => {
    app.get('/stuff', (req, res) => {
        Stuff.findAll()
            .then(stuff => {
                const message = 'La Liste des stuff a bien été récupérée.'
                res.json({ message, data: stuff })
            })
    })

}