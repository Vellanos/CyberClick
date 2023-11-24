const { Userhasbonus } = require('../../sequelize');

module.exports = (app) => {
    app.put('/userhasbonus/:id_user/:id_bonus', async (req, res) => {
        const userId = req.params.id_user;
        const bonusId = req.params.id_bonus;

        try {
            // Vérifier si l'enregistrement existe avant la mise à jour
            const existingRecord = await Userhasbonus.findOne({
                where: {
                    user_id: userId,
                    bonus_id: bonusId
                }
            });

            if (existingRecord) {
                // Mettre à jour l'enregistrement existant
                await Userhasbonus.update(req.body, {
                    where: {
                        user_id: userId,
                        bonus_id: bonusId
                    }
                });

                res.status(200).send('Userhasbonus record updated successfully.');
            } else {
                res.status(404).send('Userhasbonus record not found.');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });
};
