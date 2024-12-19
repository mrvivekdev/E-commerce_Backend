const {jwtVerify} =  require('../services/authCookie');

function authCheck(req, res, next){
    const cookieToken = req.cookies.uid;
    const verifyCookie = jwtVerify(cookieToken);
    
    req.user = verifyCookie;
    next();
}

function authCheckReal(req, res, next){
    console.log(req.cookies)
    const cookieToken = req.cookies?.uid;
    if(!cookieToken){
        console.log('Cookie Error Middleware');
    }

    const verifyCookie = jwtVerify(cookieToken);
    if(!verifyCookie){
        console.log('Cookie Error Middleware');
    }

    next();
}

module.exports = {
    authCheck,
    authCheckReal,
}