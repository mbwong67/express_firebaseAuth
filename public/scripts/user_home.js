import { BASE_URL } from "../../helpers/config_scripts.js";

const signOutForm = document.getElementById('signOut_form');


signOutForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const ip = BASE_URL

    const baseUrl = `${ip}/user/`;
    fetch(baseUrl + "sign-out", {
        method: "POST",
    })
    .then( response => {

        if( response.status === 200 || response.status === 400){ //si es 201 redireccionar
            window.location.href = baseUrl + 'login';
        }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
        
        }
    });
});
// // module.exports = { authFront };