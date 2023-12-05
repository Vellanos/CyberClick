const { Userhasstuff } = require('../../sequelize');

module.exports = (app) => {
    app.put('/userhasstuff/:id_user/:id_stuff', async (req, res) => {
        const userId = req.params.id_user;
        const stuffId = req.params.id_stuff;

        try {
            const existingRecord = await Userhasstuff.findOne({
                where: {
                    user_id: userId,
                    stuff_id: stuffId
                }
            });

            if (existingRecord) {
                await Userhasstuff.update(req.body, {
                    where: {
                        user_id: userId,
                        stuff_id: stuffId
                    }
                });

                res.status(200).send('Userhasstuff record updated successfully.');
            } else {
                res.status(404).send('Userhasstuff record not found.');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error 500');
        }
    });
};
