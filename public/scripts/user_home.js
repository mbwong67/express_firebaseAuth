const { onAuthStateChanged } = require('../../helpers/firebase');

const unsubscribe = onAuthStateChanged( handleAuthStateChange );
const handleAuthStateChange = (user) => {
    try{
        if( user.customClaims.access ){
            location.reload();
            console.log(`onAuthStateChanged { ${JSON.stringify(user.customClaims)} }`);
        }
    }catch( error ){

    }
    unsubscribe();
}

// const noVis = document.getElementById("noVis");

// const accAttribute = noVis.getAttribute("accAttribute");

// const pollAccess = () => {
//     const baseUrl = 'http://localhost:3000/user/';
//     fetch( baseUrl + 'check-access')
// }