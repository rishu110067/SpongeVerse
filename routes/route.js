const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


// @desc Login Page
// @route GET /
router.get("/", ensureGuest, (req, res) => {
  res.sendFile(path.join(__dirname + '/../views/login.html'));
});

// @desc metaverse
// @route GET /metaverse
router.get("/metaverse", ensureAuth, async (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

// @desc virtual try on
// @route GET /metaverse/try
router.get("/metaverse/try", ensureAuth, async (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/try.html"));
});

router.get("/metaverse/trypants", ensureAuth, async (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/try_pants.html"));
});

router.get("/metaverse/tryshoes", ensureAuth, async (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/try_shoes.html"));
});

// @desc    Auth with Google
// @route   GET /auth/google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // had to use complete uri instead of just /metaverse 
    // because callback uri uses http but redirect uri should have https
    res.redirect("https://spongeverse.herokuapp.com/metaverse");
  }
);

// @desc    Logout User
// @route   /auth/logout
router.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});



module.exports = router;
