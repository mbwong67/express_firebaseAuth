const checkboxes = document.querySelectorAll('input[type=checkbox]');
// const messageContainer = document.getElementById('messageResponse');
const signOutForm = document.getElementById('signOut_form');
const productForm = document.getElementById('product_form');
const errorMessage = document.getElementById("errMessage");


//sign-out button
signOutForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const baseUrl = `${myUrl}/user/`;
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

//admin panel that gives access to users
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

        const ip = 'https://express-firebaseauth-embr.onrender.com'

        const baseUrl = `${ip}/`;
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
        });
    }else {
        programmaticChange = false;
    }
  });
});

productForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    // new formData obj
    const formData = new FormData(e.target);

    // Form data
    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });
    formDataObj.quantity = Number(formDataObj.quantity);
    formDataObj.price = Number(formDataObj.price);
    // JS obj to JSON obj
    const jsonData = JSON.stringify(formDataObj);
    

    const baseUrl = `${apiUrl}/`;
    fetch(baseUrl + "admin/shop/product", {
        method: "POST",
        body: jsonData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => {
        if( response.status === 200 ){

            console.log(response);
        }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
            e.preventDefault();
            errorMessage.textContent = 'Login Error';
            setTimeout(()=>{
                errorMessage.textContent = '';
            },3000);
        }
    }) 
})