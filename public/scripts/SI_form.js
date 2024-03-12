// import { BASE_URL } from "../../helpers/config";
const errorMessage = document.getElementById("errMessage");
const errContainer = document.getElementById("errMessage");
console.log('fuera dle submite');
document.getElementById("SI_form").addEventListener("submit", (e) =>{
    e.preventDefault();
    // new formData obj
    const formData = new FormData(e.target);

    // Form data
    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    // JS obj to JSON obj
    const jsonData = JSON.stringify(formDataObj);
    const baseUrl = 'http://localhost:3000/user/';
    fetch(baseUrl + "login", {
        method: "POST",
        body: jsonData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => {
        if( response.status === 200 ){ //si es 200 redireccionar
            // return fetch(baseUrl + "login");
            window.location.href = baseUrl + 'login';
        }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
            e.preventDefault();
            console.error('console');
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Login Error';
            
            errContainer.appendChild(errorMessage);
        }
    })
    console.log('despuesde');
})