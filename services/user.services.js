const { auth } = require("../helpers/firebase"); //verificar si sirve
const { authAdmin } = require('../helpers/firebase_admin');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");


class ManageAccount {
    async register(email, password) {
      try{
        //user is created for Firebase Auth and returns user obj
        const user = await createUserWithEmailAndPassword(auth, email, password).user;
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
        const user = await signInWithEmailAndPassword(auth, email, password).user;
        //do sth with userCredential
        //gets user token jwt
        //TODO: Checar si jala
        const idToken = user.getIdTokenResult();
        //Confirm is a common user
        if(!idToken.claims.admin){
          const uid = user.uid;
          //sets access to default (false)
          const updateClaim = await authAdmin.setCustomUserClaims(uid,{
            ...auth.currentUser.claims,
            access: false
          });
        }

        return 1;

      }catch( error ){
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
            ...auth.currentUser.claims,
            access: false
          });
        }

        const signOutFunction = await signOut(auth);

        return 1
      }catch( error ){
        return 0
      }
    }
};
const UserManager = new ManageAccount();
module.exports = { UserManager };