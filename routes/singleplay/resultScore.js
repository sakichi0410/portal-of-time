const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session.user_id) {
        console.log("test 1");
        res.render('singleplay/login/gameMenu',{
            uid: req.session.user_id
        });
    }else{
        console.log("test 2");
        res.render('singleplay/logout/gameMenu');
    }
});

module.exports = router;