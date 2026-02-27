let usuarios = [];
const loginForm = document.getElementById("loginForm");

document.querySelectorAll(".logbtn").forEach(btn => {
    btn.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const response = await fetch("/usuarios");
            usuarios = await response.json();

            console.log("Usuarios:", usuarios);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    });
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const usuarioInputs = {
        username: document.getElementById("user").value,
        password: document.getElementById("password").value,
    };

    let usuarioEncontrado = null;

    if (usuarioInputs.username && usuarioInputs.password) {
        for (let u of usuarios) {
            if (usuarioInputs.password === u.password &&
                (usuarioInputs.username === u.name || usuarioInputs.username === u.email)) {
                usuarioEncontrado = u;
            }
        }

        if (usuarioEncontrado) {
            // Guardar en localStorage
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
            alert("¡Bienvenido, " + usuarioEncontrado.name + "!");
            // cerrar modal si tenés función
            location.reload();
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    }
});