import { BASE_URL } from "./config/config_scripts.json";

const errorMessage = document.getElementById("errMessage");
document.getElementById("SU_form").addEventListener("submit", (e) =>{
    e.preventDefault();
    // Crea un nuevo objeto FormData para obtener los datos del formulario
    const formData = new FormData(e.target);

    // Convierte el objeto FormData a un objeto JavaScript regular
    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    // Convierte el objeto JavaScript a una cadena JSON
    const jsonData = JSON.stringify(formDataObj);
    // const ip = '192.168.137.83';
    const ip = BASE_URL

    const baseUrl = `${ip}/user/`;
    fetch(baseUrl + "sign-up", {
        method: "POST",
        body: jsonData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => {
        console.log(response);
        console.log("try");
        if( response.status === 201 ){ //si es 201 redireccionar
            console.log(true);
            // return fetch(baseUrl + "login");
            window.location.href = baseUrl + 'login';
        }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
            errorMessage.textContent = 'Error authenticating';
            setTimeout(()=>{
                errorMessage.textContent = '';
            },3000);
        }
    })
    console.log('despuesde');
})