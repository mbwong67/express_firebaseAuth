import { BASE_URL } from "./config/config_scripts.json";

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const messageContainer = document.getElementById('messageResponse');
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
            errorMessage.textContent = 'Error in process sign out';
        
        }
    });
});


let programmaticChange = false;
// Iterate all checkboxes
let i = 0;
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function(e) {
    if( !programmaticChange ){
        e.preventDefault();
        // Verificar si el checkbox está marcado o no
        this.id
        this.checked
        const jsonData = JSON.stringify({
            uid: this.id,
            accessFlag: this.checked
        });
        // const ip = '192.168.137.83'
        const ip = 'localhost'

        const baseUrl = `http://${ip}:3000/`;
        fetch(baseUrl + "admin/modify", {
            method: "POST",
            body: jsonData,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if( response.status === 200 ){ //si es 200 redireccionar
                // return fetch(baseUrl + "login");
                // window.location.href = baseUrl + 'home';
            }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
                e.preventDefault();
                errorMessage.textContent = 'No se realizó el ajuste';
                setTimeout(()=>{
                    errorMessage.textContent = '';
                },3000);

                //reverts checkbox state if process failed
                //TODO: checar si jala
                programmaticChange = true;
                this.checked = !this.checked;//aqui tengo duda chatgpt
                programmaticChange = false;
            }
        })
    }else {
        programmaticChange = false;
    }
  });
});