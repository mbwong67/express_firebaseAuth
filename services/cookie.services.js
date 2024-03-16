const cookie = require('cookie');

class CookieService {
    
    generateCookie(jwtToken){
        //secure = (https) ? true : false
        const secureCookie = false;
        const httpOnlyCookie = true;
        const cookieOptions = {
            secure: secureCookie,
            httpOnly: httpOnlyCookie,
            maxAge: 60 * 60 * 2,
            sameSite: 'strict',
            path: '/'
        };
        const cookieString = cookie.serialize('jwtToken', jwtToken, cookieOptions);
        return cookieString;
    }
    parseCookie(headersCookie){
        try{
            const cookies = cookie.parse(headersCookie || '');
            const cookieToken = cookies.jwtToken;
            return cookieToken;
        }catch( error ){
            return '';
        }

    }
}

const cookieManager = new CookieService();
module.exports = { cookieManager }
