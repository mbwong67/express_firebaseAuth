const cookie = require('cookie');
const AES = require('crypto-js/aes');
const enc = require('crypto-js/enc-utf8');
const SHA256 = require('crypto-js/sha256');
const { S_KEY } = require('../helpers/config');

class CookieService {
    
    generateCookie(jwtToken){
        //secure = (https) ? true : false
        const secureCookie = false;
        const httpOnlyCookie = true;
        const cookieOptions = {
            secure: secureCookie,
            httpOnly: httpOnlyCookie,
            maxAge: 60 * 60 * 2 * 1000,
            sameSite: 'strict',
            path: '/'
        };
        // const cookieString = cookie.serialize('jwtToken', jwtToken, cookieOptions);
        //encrypt jwttoken before setting it as cookie
        const cryptedCookie = AES.encrypt(jwtToken, S_KEY).toString();

        return [cryptedCookie,cookieOptions];
    }
    parseCookie(headersCookie){
        try{
            const cookies = cookie.parse(headersCookie || '');
            const cookieToken = cookies.jwtToken;

            const bytes = AES.decrypt(cookieToken, S_KEY);
            const cookieString = bytes.toString(enc);

            return cookieString;
        }catch( error ){
            return '';
        }

    }
}

const cookieManager = new CookieService();
module.exports = { cookieManager }
