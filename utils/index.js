const jwt = require("jsonwebtoken");
const config = require("config");
// to save data in server from client when he sent it
const multer  = require("multer");

const auth = (req, res, next) => {
  // Get The Token From Reqest Header
  //  client should  the header with same name when recive him
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Token Is Not Available, authornization denied" });
  }

  try {
    jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ msg: "Token Is Not Valid, authornization denied" });
      } else {
        req.user = decoded.user;
        next();
        // must call when create midlle where function
        // To go to processing in next function
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// To save file from client (dis=> file from client,)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // (null حسب الدوكيمنتيشنو, "path of folder will download  inside him files")
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // name of image حسب ال Id
    cb(null,`${req.user.id}`);
  }
});

const upload = multer({storage: storage}).single("");



module.exports = { auth, upload };
