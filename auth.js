const jwt = require("jsonwebtoken");
const Admin = require('./Models/Admin');

module.exports = (req, res, next) => {
  try {
    if (Object.keys(req.cookies).length !== 0 && req.cookies.email != undefined) {
                const email = req.cookies.email;
                Admin.findOne({ username: email }).then(admin => {
                    if (!admin) { 
                        res.render('login');
                    } else {

                        next();
                    }
                 })
            } else {
              next();
            }
    next();
  } catch (error) {
    res.render('login');
  }
};
