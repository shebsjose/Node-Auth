const express = require("express");
const router = new express.Router();
const verify = require("./varifyToken");

router.get('/', verify, (req, res) =>{
    res.json({
        posts : {
            title :" My First Post",
            description : 'Random data you should not access.'
        }
    });
})

module.exports = router;