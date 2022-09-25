const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session.uid) {
        console.log("login");
        res.render('base/login/mainMenu.ejs',{
            uid: req.session.uid
        });
    }else{
        console.log("logout");
        res.render('base/logout/mainMenu.ejs');
    }
});

module.exports = router;