const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = res.header('auth-token');
    if(!token) return res.status(401).send('Assess Denied !');
    try {
        const verified = jwt.verify(token, "PersonalToken");
        console.log(verified);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}