const { auth } = require("../helpers/firebase"); //verificar si sirve
const { authAdmin } = require('../helpers/firebase_admin');
const { createUserWithEmailAndPassword } = require("firebase/auth");

class AdminService{
    async register(email, password) {
        try{
          //user is created for Firebase Auth and returns user obj
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          //sets claims that are applied into the user jwt token
          //TODO: probar que funce
          const setClaims = await authAdmin.setCustomUserClaims(user.uid, { 
            ...user.claims,
            admin: true,
            commonUser: false,
            access: true
          });
          //do sth with userCredential
          return 1;
        }catch( error ){
          console.error( error.message );
          return 0;
        }
    }
    async modifyAccess(uid, accessFlag){
        try{
            //TODO: probar si funca
            const user = await authAdmin.getUser(uid);
            const userClaims = user.customClaims;

            const updateClaim = await authAdmin.setCustomUserClaims(uid,{
                admin: userClaims.admin,
                commonUser: userClaims.commonUser,
                access: accessFlag
            });
            return 1;
        }catch( error ){
            return 0;
        }
    }
    async allUsers(nextPageToken){
        try{
        const listUsersResult = await authAdmin.listUsers( 50, nextPageToken );
        let usersArr = [];
        listUsersResult.users.forEach( (userRecord) =>{
            if( !userRecord.customClaims.admin )    usersArr.push(userRecord);
        });
        //stringify converts to json string | parse converts json string to json Object
        // const usersJson = JSON.parse(JSON.stringify(usersArr));
        // return usersJson;
        return usersArr;
        }catch( error ){
            // return {};
            return [];
        }
    }
}
const adminManager = new AdminService();
module.exports = { adminManager };