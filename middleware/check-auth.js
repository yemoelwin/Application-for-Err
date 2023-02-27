// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const decoded = jwt.verify(req.body.token, "superSecrect");
//     req.userData = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Unautorization" });
//   }
// };
