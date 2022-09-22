const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session.user_id) {
        console.log("test 1");
        res.render('login/mainMenu',{
            uid: req.session.user_id
        });
    }else{
        console.log("test 2");
        res.render('logout/mainMenu');
    }
});

module.exports = router;