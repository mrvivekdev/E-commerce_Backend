
const {jwtVerify} =  require('../services/authCookie');

function authCheck(req, res, next){
    const {cookie} = req.body;
    const verifyCookie = jwtVerify(cookie);
    
    console.log("middel",verifyCookie)
    req.user = verifyCookie;
    next();
}

function authCheckReal(req, res, next){
    const {cookie} = req.body;
    if(!cookie){
        console.log('Cookie Error Middleware');
    }

    const verifyCookie = jwtVerify(cookie);
    if(!cookie){
        console.log('Cookie Error Middleware');
    }

    req.user = verifyCookie;
    next();
}

module.exports = {
    authCheck,
    authCheckReal,
}