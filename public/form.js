var form = document.getElementById("contactForm");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var contacto = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
    };
    if (contacto.name && contacto.email.includes("@")) {

        // enviar al servidor Node
        fetch("/guardar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contacto),
        })
            .then(function (res) { return res.text(); })
            .then(function (data) {
            alert(data); // Muestra el mensaje de respuesta del servidor
        });
    }
    else {
        alert("Datos inválidos ❌");
    }
});