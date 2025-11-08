Pasos para ejecutar el proyecto:
1. Desde la carpeta raiz del proyecto (donde se encuentra este archivo), ejecutar CMD o Powershell.
2. Escribir los comandos:
                npm install express cors mongoose
                npm install -D @types/express @types/cors @types/node
3. Luego escribir el comando:
                npm run start
4. Abrir el navegador e ir a la direccion "http://localhost:3000"

Si se quiere verificar que los datos enviados del formulario fueron cargados correctamente:
1. Ejecutar "MongoDB Compass" o mongosh.
2. Escribir en el shell "use tienda_cafe"
3. Seguido escribimos "db.contactos.fidn()"
