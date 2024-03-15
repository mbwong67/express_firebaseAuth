const checkboxes = document.querySelectorAll('input[type=checkbox]');
const messageContainer = document.getElementById('messageResponse');

let programmaticChange = false;
console.log('caca')
console.log(checkboxes)
// Iterate all checkboxes
let i = 0;
checkboxes.forEach(checkbox => {
    console.log(i)
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
                window.location.href = baseUrl + 'home';
            }else{//sino, quedarse en la vista de sign up y mostrar mensaje de error
                e.preventDefault();
                errorMessage.textContent = 'No se realizó el ajuste';

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