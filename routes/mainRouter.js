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

router.get("/", controller.homeIndex);
router.get("/register", controller.registerGet);
router.post("/register", controller.registerPost);
router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);
router.get("/logout", controller.logout);
router.get("/user", isLoggedIn, controller.userIndex);
router.get("/admin", isAdmin, controller.adminIndex);

router.get("/filmek", filmController.lista);
router.get("/CRUD", filmCrudController.lista);
router.get("/filmCRUD/edit/:id", filmCrudController.szerkesztes);
router.post("/filmCRUD/edit/:id", filmCrudController.szerkesztesMentese);
router.get("/filmCRUD/create", filmCrudController.create );
router.post("/filmCRUD/create", filmCrudController.save );
router.post('/filmCRUD/delete/:id', filmCrudController.delete);
router.get("/uzenetek", uzenetController.lista );
router.get("/kapcsolat", uzenetController.create);
router.post("/kapcsolat", uzenetController.save);

module.exports = router;