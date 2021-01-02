const passportJwt = require('../config/passportJwt')
const userCtl = require('../controllers/userCtl')
const authCtl = require('../controllers/authCtl')


module.exports = app => {
    app.route('/signin')
      .post(authCtl.signin)
    
    app.route('/signup')
      .post(authCtl.signup)

    //private route, access only with token
    app.route('/')
      .all(passportJwt)
      .get(authCtl.msgLogin)
}