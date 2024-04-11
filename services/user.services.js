const { auth } = require("../helpers/firebase"); //verificar si sirve
const { authAdmin } = require('../helpers/firebase_admin');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");


class UserService {

    async register(email, password) {
      try{
        //user is created for Firebase Auth and returns user obj
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        //sets claims that are applied into the user jwt token
        const setClaims = await authAdmin.setCustomUserClaims(user.uid, { 
          ...user.claims,
          admin: false,
          commonUser: true,
          access: false
        });
        //do sth with userCredential
        return 1;
      }catch( error ){
        console.error( error.message );
        return 0;
      }
    }

    async authenticate(email, password) {
      try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //gets user token jwt
        const idToken = await user.getIdTokenResult();
        //Confirm is a common user
        //TODO: este codigo permite que cada que se logea, no se tiene acceso
        // if(!idToken.claims.admin){
        //   const uid = user.uid;
        //   //sets access to default (false)
        //   // console.log(idToken.claims);
        //   const updateClaim = await authAdmin.setCustomUserClaims(uid,{
        //     admin: idToken.claims.admin,
        //     commonUser: idToken.claims.commonUser,
        //     access: false
        //   });
        // }
        const jwtToken = await user.getIdToken(true);
        return jwtToken;

      }catch( error ){
        console.error( error.message)
        return '';
      }
    }

    async signOut() {
      try{
        const signOutFunction = await signOut(auth);
        return 1

      }catch( error ){
        console.error( error.message );
        return 0
      }
    }
};
const userManager = new UserService();
module.exports = { userManager };