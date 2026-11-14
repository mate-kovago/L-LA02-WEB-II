const Film = require('../models/film');
const Feladat = require('../models/feladat');
const Szemely = require('../models/szemely');

exports.lista = async (req, res, next) => {
  try {
    const filmek = await Film.aggregate([

      {
        $lookup: {
          from: Feladat.collection.name,
          localField: '_id',
          foreignField: 'filmid',
          pipeline: [
            { $match: { megnevezes: 'rendező' } },
            { $sort: { _id: 1 } },
            { $limit: 1 }
          ],
          as: 'elsoRendezoFeladat'
        }
      },


      {
        $lookup: {
          from: Szemely.collection.name,
          localField: 'elsoRendezoFeladat.szemelyid',
          foreignField: '_id',
          as: 'rendezoSzemely'
        }
      },

      {
        $project: {
          _id: 1,
          cím: 1,
          gyartas: 1,
          rendezo: {
            $ifNull: [
              { $arrayElemAt: ['$rendezoSzemely.nev', 0] },
              'Nincs adat'
            ]
          }
        }
      },

      { $sort: { cím: 1, _id: 1 } }
    ]).exec();

    res.render('filmek', { filmek });
  } catch (error) {
    next(error);
  }
};