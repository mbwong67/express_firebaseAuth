const signOutForm = document.getElementById('signOut_form');
const tbody = document.getElementById('tbody_products');

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
            console.log(response)
        }
    }).then( json => {
        console.log(JSON.stringify(json))

        const productsArray = Object.values(json);

        // Itera sobre los productos y agrega filas a la tabla
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
        });
    })
})
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
        
        }
    });
});
