const checkboxes = document.querySelectorAll('input[type=checkbox]');
// const messageContainer = document.getElementById('messageResponse');
const signOutForm = document.getElementById('signOut_form');
const productForm = document.getElementById('product_form');
const tbody = document.getElementById('tbody_products');
const errorMessage = document.getElementById("errMessage");

document.addEventListener('DOMContentLoaded', (e)=>{
    e.preventDefault();

    const baseUrl = `${apiUrl}/`;
    fetch(baseUrl + "shop/products", {
        method: "GET",
        headers: {
            'Accept': 'application/json'
        }
    })
    .then( response => {

        if( response.status === 200 ){ //si es 201 redireccionar

            return response.json();
        }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
        }
    }).then( json => {
        console.log(json);
        const products_uids = Object.keys(json);
        const productsArray = Object.values(json);
        // Itera sobre los productos y agrega filas a la tabla
        let c = 0;
        productsArray.forEach(product => {
            // Crea una nueva fila
            const row = document.createElement('tr');
            
            // Crea celdas para el nombre, cantidad y precio
            const nameCell = document.createElement('td');
            const quantityCell = document.createElement('td');
            const priceCell = document.createElement('td');

            
            
            // Asigna los datos a las celdas
            nameCell.textContent = product.name;
            quantityCell.textContent = product.quantity;
            priceCell.textContent = product.price;

            // Agrega las celdas a la fila
            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);

            // Agrega la fila al tbody
            tbody.appendChild(row);

            c++;
        });
    })
})


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
        if( response.status === 201 ){


        }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
            e.preventDefault();
            errorMessage.textContent = 'new product error';
            setTimeout(()=>{
                errorMessage.textContent = '';
            },3000);
        }
    }) 
})