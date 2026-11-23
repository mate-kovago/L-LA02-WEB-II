const Uzenet = require('../models/Uzenet');

exports.lista = async (req, res, next) => {
    try {
        const uzenetek = await Uzenet.find()
            .sort({ bekuldve: -1 })
            .exec();

        res.render('uzenetek', {
            uzenetek: uzenetek
        });
    } catch (error) {
        next(error);
    }
};

exports.create = (req, res) => {
    res.render('kapcsolat', {
        errors:[],
        uzenet:{},
        success: req.query.success === '1'
    });

};

exports.save = async (req, res, next) => {
 
    const szoveg = (ertek) =>
        typeof ertek === 'string' ? ertek.trim() : '';

    const uzenet = {
        email : szoveg(req.body.email),
        uzenet : szoveg(req.body.uzenet)

    };

     const errors = [];

     
      if (uzenet.email === '') {
        errors.push('e-mail cím megadása kötelező');
    };
        if (uzenet.uzenet === '') {
        errors.push('üzenet írása kötelező');
    };
    
    
    if (errors.length > 0) {
        return res.status(400).render('kapcsolat', {
            errors: errors,
            uzenet: uzenet
        });
    };

    try {
            await Uzenet.create({
                email:uzenet.email,
                uzenet: uzenet.uzenet
            });
            return res.redirect('/kapcsolat?success=1');
        } catch(error){
            if(error.name === "ValidationError"){
                return res.status(400).render('kapcsolat', { 
                    errors:Object.values(error.errors)
                    .map(err=> err.message),
                    uzenet:uzenet
                });
            }
            next(error);
        }




}