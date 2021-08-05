module.exports = (req, res, next) => {
  // If user is not logged in, returns and puts a stop
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }
  // next = callback function that's passed into the parameters
  next();
};
