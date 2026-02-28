interface Usuario {
    name: string;
    email: string;
    password: string;
} 

let usuarios: Usuario[] = [];
const loginForm = document.getElementById("loginForm") as HTMLFormElement;

loginForm.addEventListener("submit",  async function (event) {
    event.preventDefault();
    const username = (document.getElementById("user") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error("Credenciales inválidas");
        }

        const usuario = await response.json();

        // Guardar sesión
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

        alert("Bienvenido " + usuario.name);
        location.reload();

    } catch (error) {
        alert("Usuario o contraseña incorrectos");
    }
});