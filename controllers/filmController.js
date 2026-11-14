const Film = require('../models/film');

require('../models/feladat');
require('../models/szemely');

exports.lista = async (req, res, next) => {
    try {
        const filmek = await Film.find()
            .populate({
                path: 'feladatok',
                match: {
                    megnevezes: 'rendező'
                },
                options: {
                    sort: { _id: 1 }
                },
                populate: {
                    path: 'szemely'
                }
            })
            .sort({ cím: 1 })
            .exec();

        res.render('filmek', {
            filmek: filmek
        });
    } catch (error) {
        next(error);
    }
};