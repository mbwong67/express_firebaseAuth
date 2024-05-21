const signOutForm = document.getElementById("signOut_form");
const tbody = document.getElementById("tbody_products");
const buyMessage = document.getElementById("buyMessage");

document.addEventListener('DOMContentLoaded', (e)=>{
    e.preventDefault();

    const baseUrl = `${apiUrl}/`;
    axios.get(baseUrl + "shop/products",{
        headers:{
            "Content-Type": "application/json"
        },
        withCredentials: true
    })
    .then( response =>{
        if( response.status === 200 ){ //si es 201 redireccionar
            const data = response.data;
            const products_uids = Object.keys(data);
            const productsArray = Object.values(data);

            // Itera sobre los productos y agrega filas a la tabla
            let c = 0;
            productsArray.forEach(product => {
                // Crea una nueva fila
                console.log(product)
                const row = document.createElement('tr');

                // Crea celdas para el nombre, cantidad y precio
                const nameCell = document.createElement('td');
                const quantityCell = document.createElement('td');
                const priceCell = document.createElement('td');

                const addBtn = document.createElement('button');
                addBtn.textContent = 'Comprar';
                addBtn.id = products_uids[c];

                addBtn.addEventListener('click', (e)=>{
                    //TODO: fetch
                    e.preventDefault();
                    const dataObj = {};
                    dataObj['quantity'] = 1;
                    dataObj['productId'] = addBtn.id;

                    const jsonData = JSON.stringify(dataObj);

                    const baseUrl = `${apiUrl}/shop/`;
                    axios.post(baseUrl + 'buy', jsonData, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    })
                    .then( response => {

                        if( response.status === 201 ){ //si es 201 redireccionar
                            buyMessage.textContent = 'Se realizó la compra de '+ product.name
                            setTimeout(()=>{
                                buyMessage.textContent = '';
                            },8000);
                        }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
                            // errorMessage.textContent = 'Error in process sign out';
                            buyMessage.textContent = 'error en la compra de '+ product.name
                            setTimeout(()=>{
                                buyMessage.textContent = '';
                            },8000);
                        }
                    });
                    
                    
                })

                // Asigna los datos a las celdas
                nameCell.textContent = product.name;
                quantityCell.textContent = product.quantity;
                priceCell.textContent = product.price;
                

                // Agrega las celdas a la fila
                row.appendChild(nameCell);
                row.appendChild(quantityCell);
                row.appendChild(priceCell);
                row.appendChild(addBtn);

                // Agrega la fila al tbody
                tbody.appendChild(row);

                c++;
            });
        }else{
            console.log(response)
        }
    })
    
    // fetch(baseUrl + "shop/products", {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //         'Accept': 'application/json'
    //     }
    // })
    // .then( response => {

    //     if( response.status === 200 ){ //si es 201 redireccionar

    //         return response.json();
    //     }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
    //         console.log(response)
    //     }
    // }).then( json => {

    //     const products_uids = Object.keys(json);
    //     const productsArray = Object.values(json);

    //     // Itera sobre los productos y agrega filas a la tabla
    //     let c = 0;
    //     productsArray.forEach(product => {
    //         // Crea una nueva fila
    //         const row = document.createElement('tr');

    //         // Crea celdas para el nombre, cantidad y precio
    //         const nameCell = document.createElement('td');
    //         const quantityCell = document.createElement('td');
    //         const priceCell = document.createElement('td');

    //         const addBtn = document.createElement('button');
    //         addBtn.textContent = 'Comprar';
    //         addBtn.id = products_uids[c];

    //         addBtn.addEventListener('click', (e)=>{
    //             //TODO: fetch
    //             e.preventDefault();
    //             const dataObj = {};
    //             dataObj['quantity'] = 1;
    //             dataObj['productId'] = addBtn.id;

    //             const jsonData = JSON.stringify(dataObj);

    //             const baseUrl = `${apiUrl}/shop/`;
    //             fetch(baseUrl + 'buy', {
    //                 method: "POST",
    //                 body: jsonData,
    //                 credentials: "include",
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //             .then( response => {

    //                 if( response.status === 201 ){ //si es 201 redireccionar
    //                     buyMessage.textContent = 'Se realizó la compra de '+ product.name
    //                     setTimeout(()=>{
    //                         buyMessage.textContent = '';
    //                     },8000);
    //                 }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
    //                     // errorMessage.textContent = 'Error in process sign out';
    //                     buyMessage.textContent = 'error en la compra de '+ product.name
    //                     setTimeout(()=>{
    //                         buyMessage.textContent = '';
    //                     },8000);
    //                 }
    //             });
    //         })

    //         // Asigna los datos a las celdas
    //         nameCell.textContent = product.name;
    //         quantityCell.textContent = product.quantity;
    //         priceCell.textContent = product.price;
            

    //         // Agrega las celdas a la fila
    //         row.appendChild(nameCell);
    //         row.appendChild(quantityCell);
    //         row.appendChild(priceCell);
    //         row.appendChild(addBtn);

    //         // Agrega la fila al tbody
    //         tbody.appendChild(row);

    //         c++;
    //     });
    // })
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
