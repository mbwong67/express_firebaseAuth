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
        //TODO: probar que funce
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
  
    // authenticate(email, password) {
    //   signInWithEmailAndPassword(auth, email, password)
    //     .then((_) => {
    //       window.location.href = "index.html";
    //       // Mostrar alerta de inicio de sesión exitoso
    //       alert("Has iniciado sesión correctamente. Serás redirigido a la página principal.");
    //     })
    //     .catch((error) => {
    //       console.error(error.message);
    //               // Mostrar alerta de error de inicio de sesión
    //               alert("Error al iniciar sesión: " + error.message);
    //     });
    // }
    async authenticate(email, password) {
      try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        //gets user token jwt
        //TODO: Checar si jala
        const idToken = await user.getIdTokenResult();
        //Confirm is a common user
        if(!idToken.claims.admin){
          const uid = user.uid;
          //sets access to default (false)
          // console.log(idToken.claims);
          const updateClaim = await authAdmin.setCustomUserClaims(uid,{
            admin: idToken.claims.admin,
            commonUser: idToken.claims.commonUser,
            access: false
          });
        }
        console.log(`authenticate {${JSON.stringify(idToken.claims)}}`);
        return 1;

      }catch( error ){
        console.error( error.message)
        return 0;
      }
    }
  
    // signOut() {
    //   signOut(auth)
    //     .then((_) => {
    //       window.location.href = "index.html";
    //     })
    //     .catch((error) => {
    //       console.error(error.message);
    //     });
    // }
    //TODO: Probar que funce
    async signOut() {
      try{
        //gets user token jwt
        const idToken = await auth.currentUser.getIdTokenResult();
        //Confirm is a common user
        //TODO: checar si es mejor que este en el login
        if(!idToken.claims.admin){
          const uid = auth.currentUser.uid;
          //sets access to default (false)
          const updateClaim = await authAdmin.setCustomUserClaims(uid,{
            admin: idToken.claims.admin,
            commonUser: idToken.claims.commonUser,
            access: false
          });
        }

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