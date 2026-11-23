const router = require("express").Router();
const controller = require("../controllers/mainController");
const filmController = require("../controllers/filmController");
const filmCrudController = require("../controllers/filmCrudController")
const uzenetController = require("../controllers/uzenetController")

isLoggedIn=(req,res,next)=>{
    if(req.session.user){return next();}
    res.redirect("/login");
}
isAdmin=(req,res,next)=>{
    if(req.session.user && req.session.user.role==="admin"){return next();}
    res.redirect("/");
}

// guest, user, admin
router.get("/", controller.homeIndex);
router.get("/register", controller.registerGet);
router.post("/register", controller.registerPost);
router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);
router.get("/logout", controller.logout);
router.get("/filmek", filmController.lista);
router.get("/kapcsolat", uzenetController.create);
router.post("/kapcsolat", uzenetController.save);


// user, admin
router.get("/uzenetek", isLoggedIn, uzenetController.lista );

//router.get("/user", isLoggedIn, controller.userIndex);
//router.get("/admin", isAdmin, controller.adminIndex);


//admin
router.get("/CRUD", isAdmin, filmCrudController.lista);
router.get("/filmCRUD/edit/:id", isAdmin, filmCrudController.szerkesztes);
router.post("/filmCRUD/edit/:id", isAdmin, filmCrudController.szerkesztesMentese);
router.get("/filmCRUD/create", isAdmin, filmCrudController.create );
router.post("/filmCRUD/create", isAdmin, filmCrudController.save );
router.post('/filmCRUD/delete/:id', isAdmin,  filmCrudController.delete);

module.exports = router;