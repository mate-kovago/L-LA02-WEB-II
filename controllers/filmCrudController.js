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

exports.szerkesztes = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).send('Érvénytelen filmazonosító.');
        }

        const film = await Film.findById(id).exec();

        if (!film) {
            return res.status(404).send('A film nem található.');
        }

        res.render('filmEdit', {
            film: film
        });
    } catch (error) {
        next(error);
    }
};

exports.szerkesztesMentese = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).send('Érvénytelen filmazonosító.');
        }

        const film = await Film.findByIdAndUpdate(
            id,
            {
                $set: {
                    cím: req.body.cím,
                    gyartas: req.body.gyartas,
                    hossz: req.body.hossz === '' ? null : req.body.hossz,
                    bemutato: req.body.bemutato === ''
                        ? null
                        : req.body.bemutato,
                    youtube: req.body.youtube === 'on'
                }
            },
            {
                runValidators: true
            }
        ).exec();

        if (!film) {
            return res.status(404).send('A film nem található.');
        }

        res.redirect('/CRUD');
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).send('Hibás vagy hiányzó filmadatok.');
        }

        next(error);
    }
};

exports.create = (req, res) => {
    res.render('filmCreate', {
        errors:[],
        film:{}
    });

};



exports.save = async (req, res, next) => {

    const szoveg = (ertek) =>
        typeof ertek === 'string' ? ertek.trim() : '';

    const film = {
        _id: szoveg(req.body._id),
        cím: szoveg(req.body.cím),
        gyartas: szoveg(req.body.gyartas),
        hossz: szoveg(req.body.hossz),
        bemutato: szoveg(req.body.bemutato),
        youtube: req.body.youtube === 'on'
    };

    const errors = [];

    // Azonosító ellenőrzése
    if (film._id === '') {
        errors.push('A film azonosítójának megadása kötelező.');
    } else if (!Number.isSafeInteger(Number(film._id))) {
        errors.push('A film azonosítója egész szám legyen.');
    }

    // Cím ellenőrzése
    if (film.cím === '') {
        errors.push('A film címének megadása kötelező.');
    }

    // Gyártási év ellenőrzése
    if (film.gyartas === '') {
        errors.push('A gyártási év megadása kötelező.');
    } else if (!Number.isSafeInteger(Number(film.gyartas))) {
        errors.push('A gyártási év egész szám legyen.');
    }

    // A hossz opcionális, de nem lehet negatív.
    if (
        film.hossz !== '' &&
        (
            !Number.isFinite(Number(film.hossz)) ||
            Number(film.hossz) < 0
        )
    ) {
        errors.push('A film hossza nulla vagy pozitív szám legyen.');
    }

    // A bemutató opcionális, de valós dátumnak kell lennie.
    if (film.bemutato !== '') {
        const megfeleloFormatum =
            /^\d{4}-\d{2}-\d{2}$/.test(film.bemutato);

        const datum = new Date(film.bemutato + 'T00:00:00Z');

        const ervenyesDatum =
            megfeleloFormatum &&
            !Number.isNaN(datum.getTime()) &&
            datum.toISOString().slice(0, 10) === film.bemutato;

        if (!ervenyesDatum) {
            errors.push(
                'A bemutató valós dátum legyen, ÉÉÉÉ-HH-NN formátumban.'
            );
        }
    }

    if (errors.length > 0) {
        return res.status(400).render('filmCreate', {
            errors: errors,
            film: film
        });
    }

    try {
        await Film.create({
            _id: Number(film._id),
            cím: film.cím,
            gyartas: Number(film.gyartas),
            hossz: film.hossz === '' ? null : Number(film.hossz),
            bemutato: film.bemutato === '' ? null : film.bemutato,
            youtube: film.youtube
        });

        return res.redirect('/CRUD');
    } catch (error) {
        if (error.code === 11000) {
            errors.push('Ezzel az azonosítóval már létezik film.');
        } else if (error.name === 'ValidationError') {
            errors.push(
                ...Object.values(error.errors).map(hiba => hiba.message)
            );
        } else {
            return next(error);
        }

        return res.status(error.code === 11000 ? 409 : 400)
            .render('filmCreate', {
                errors: errors,
                film: film
            });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id)) {
            return res.status(400).send('Érvénytelen filmazonosító.');
        }

        const film = await Film.findByIdAndDelete(id).exec();

        if (!film) {
            return res.status(404).send('A törlendő film nem található.');
        }

        return res.redirect('/CRUD');
    } catch (error) {
        next(error);
    }
};
