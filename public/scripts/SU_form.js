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


    const baseUrl = `${myUrl}/user/`;
    fetch(baseUrl + "sign-up", {
        method: "POST",
        body: jsonData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => {

        if( response.status === 201 ){ //si es 201 redireccionar

            // return fetch(baseUrl + "login");
            window.location.href = baseUrl + 'login';
        }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
            errorMessage.textContent = 'Error authenticating';
            setTimeout(()=>{
                errorMessage.textContent = '';
            },3000);
        }
    })

})