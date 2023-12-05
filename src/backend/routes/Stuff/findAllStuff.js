const { Stuff } = require('../../sequelize')

module.exports = (app) => {
    app.get('/stuff', (req, res) => {
        Stuff.findAll()
            .then(stuff => {
                const message = 'The stuff list has been retrieved.'
                res.json({ message, data: stuff })
            })
    })

}