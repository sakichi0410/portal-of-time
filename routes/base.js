const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  if (req.session.user_id) {
    res.render('login/mainMenu',{
        uid: req.session.user_id
    });
}else{
    res.render('logout/mainMenu');
}
});

module.exports = router;