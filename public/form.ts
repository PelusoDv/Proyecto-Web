interface Contacto {
    name: string;
    email: string;
}

const form = document.getElementById("contactForm") as HTMLFormElement;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const contacto: Contacto = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
    };

    if (contacto.name && contacto.email.includes("@")) {

        alert("Datos válidos ✅");
        // enviar al servidor Node
        fetch("/guardar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contacto),
        })
            .then((res) => res.text())
            .then((data) => {
                alert(data); // Muestra el mensaje de respuesta del servidor
            })
            
    } else {
        alert("Datos inválidos ❌");
    }
});