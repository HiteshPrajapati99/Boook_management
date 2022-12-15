const express = require("express");
const router = express.Router();
const User = require("../schemas/userschema");
let jwt = require("jsonwebtoken");
var secret = "Hiteshbhaiprajapati";

///////////////////////////////////////////////////////////////////////////////////

// Register Api

////////////////////////////////////////////////////////////////////////////////////

router.post("/register", async (req, res) => {
  try {
    if (
      req.body.name == null ||
      req.body.name == "" ||
      req.body.number == null ||
      req.body.number == "" ||
      req.body.email == null ||
      req.body.email == "" ||
      req.body.password == null ||
      req.body.password == ""
    ) {
      res.status(404).json({ success: false, message: "Plz Enter All Data" });
    } else {
      const preUser = await User.findOne({ email: req.body.email });
      if (preUser) {
        res.json({
          success: false,
          message: "This User Is Allredy Register !! Place Login",
        });
      } else {
        const user = new User();

        user.name = req.body.name;
        user.number = req.body.number;
        user.email = req.body.email;
        user.password = req.body.password;

        const Conm_password =
          (await req.body.password) === (await req.body.c_password);

        if (Conm_password) {
          user.save(function (err) {
            if (err) {
              if (err.errors != null) {
                if (err.errors.name) {
                  res.json({
                    success: false,
                    message: "Required minimum digits 3 of  Name",
                  });
                } else if (err.errors.email) {
                  res.json({
                    success: false,
                    message: err.errors.email.message,
                  });
                } else if (err.errors.password) {
                  res.json({
                    success: false,
                    message: err.errors.password.message,
                  });
                } else {
                  res.json({ success: false, message: err });
                }
              }
            } else {
              res.json({
                success: true,
                message: "Successfully Registered ! Please login now",
              });
            }
          });
        } else {
          res.json({
            success: false,
            message: "place confirm Your password !!",
          });
        }
      }
    }
  } catch (error) {
    res.status(404).send({ success: false, message: error });
  }
});

/////////////////////////////////////////////////////////////////////////////////

// Login Api

//////////////////////////////////////////////////////////////////////////////////

router.post("/login", function (req, res) {
  User.findOne({ email: req.body.email })
    .select("email password")
    .exec(function (err, user) {
      if (err) throw err;
      else {
        if (!user) {
          res.json({
            success: false,
            message: "Email and password not provided !!!",
          });
        } else if (user) {
          if (!req.body.password) {
            res.json({ success: false, message: "place Enter password " });
          } else {
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
              res.json({
                success: false,
                message: "Email and password are wrong",
              });
            } else {
              var token = jwt.sign(
                { email: user.email, id: user._id },
                secret,
                { expiresIn: "24h" }
              );
              res.json({
                success: true,
                message: "Login Successfull",
                token: token,
              });
            }
          }
        }
      }
    });
});

// jwt token veryfy

router.use(function (req, res, next) {
  var token = req.body.token || req.body.query || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).json({ success: false, message: "Token invalid" });
      } else {
        // console.log("Hitesh", decoded);
        req.decoded = decoded;

        next();
      }
    });
  } else {
    res.status(401).json({ success: false, message: "No token provided" });
  }
});

///////////////////////////////////////////////////////////////////////////////////

// Login User get data

////////////////////////////////////////////////////////////////////////////////////

router.get("/profile", (req, res) => {
  User.findOne({ email: req.decoded.email }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: "not found" });
    } else {
      res.json({ success: true, message: "User Found", User: user });
    }
  });
});

// edit login user

router.put("/profile/edit/:id", function (req, res) {
  User.findOne({ id: req.params._id }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: "No user found" });
    } else {
      user.name = req.body.name;
      user.number = req.body.number;
      user.email = req.body.email;
      user.save(function (err) {
        if (err) {
          if (err.errors.name) {
            res.json({ success: false, message: "place Enter Your Name" });
          } else if (err.errors.number) {
            res.json({ success: false, message: "place Enter Your Number" });
          } else if (err.errors.email) {
            res.json({ success: false, message: "place Enter Your Email" });
          }
        } else {
          res.json({ success: true, message: "Details has been updated!" });
        }
      });
    }
  });
});

module.exports = router;
