const { User } = require('../../sequelize')

module.exports = (app) => {
    app.get('/user', (req, res) => {
        User.findAll()
            .then(user => {
                const message = 'The user list has been retrieved.'
                res.json({ message, data: user })
            })
    })

}


