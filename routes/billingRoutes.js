const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  // calls the requireLogin middleware and runs it before this route handler when a request comes in
  // if a user isn't logged in, then requireLogin will prevent this from running
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });

    // Add 5 credits to the user and save the user
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
