// import { BASE_URL } from "../../helpers/config";
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
    console.log(jsonData);
    const baseUrl = 'http://localhost:3000/user/';
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
        
        }
    })
    console.log('despuesde');
})