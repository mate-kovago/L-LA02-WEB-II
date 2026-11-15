const Film = require('../models/film');

exports.lista = async (req, res, next) => {
    try {
        const filmek = await Film.find()
            .sort({ cím: 1 })
            .exec();

        res.render('filmCRUD', {
            filmek: filmek
        });
    } catch (error) {
        next(error);
    }
};