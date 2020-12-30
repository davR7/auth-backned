const controllers = require('../controllers/userCtl')

module.exports = app => {
    app.route('/users')
      .post(controllers.create)
    app.route('/users/:id')
      .get(controllers.findUser)
}