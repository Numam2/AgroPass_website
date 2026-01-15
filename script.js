const form = document.getElementById('form-eudr');
const submitBtn = document.getElementById('submit-btn');
const successMsg = document.getElementById('success-msg');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Cambiamos el estado del botón
    submitBtn.innerText = "Enviando...";
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // ÉXITO: Ocultamos formulario y mostramos mensaje
                form.style.display = "none";
                successMsg.style.display = "block";
            } else {
                console.log(response);
                alert("Hubo un error. Por favor intenta de nuevo.");
                submitBtn.innerText = "Solicitar Demo Gratis";
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            console.log(error);
            alert("Algo salió mal.");
        });
});