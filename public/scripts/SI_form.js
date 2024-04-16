const errorMessage = document.getElementById("errMessage");

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

    const baseUrl = `${myUrl}/`;
    fetch(baseUrl + "user/login", {
        method: "POST",
        body: jsonData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => {
        if( response.status === 200 ){ //si es 200 redireccionar
            // return fetch(baseUrl + "login");
            window.location.href = baseUrl + 'home';
        }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
            e.preventDefault();
            errorMessage.textContent = 'Login Error';
            setTimeout(()=>{
                errorMessage.textContent = '';
            },3000);
        }
    })
})