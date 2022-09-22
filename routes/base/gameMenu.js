const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    console.log("test1");
    if (req.session.user_id) {
        console.log("test 1");
        res.render('base/login/gameMenu',{
            uid: req.session.user_id
        });
    }else{
        console.log("test 2");
        res.render('base/logout/mainMenu');
    }
});

module.exports = router;