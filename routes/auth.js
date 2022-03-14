const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");

// For Register
router.post("/register", async (req, res) => {

  // Validate data before user.
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is already in the database.
  const emailExit = await User.findOne({email :req.body.email});
  if(emailExit) return res.status(400).send('Email is already Exit');

// Hash the Password.
const salt = await bcrypt.genSalt(10);
const hasedPassword = await bcrypt.hash(req.body.password,salt);

  // Create a new user.
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hasedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});


// For Login.
router.post('/login', async (req, res) =>{
  // Validate data before user.
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

   // Checking if the email is exiting.
   let user = await User.findOne({email : req.body.email})
   if(!user) return res.status(400).send('Invalid Email');

   // Checking the Password.
   const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password');

   // Create and assign token
   const token = jwt.sign({_id :user._id}, "PersonalToken");
   res.header('auth-token').send(token)

});


module.exports = router;
 