![Logo](https://flexxus.com.ar/wp-content/uploads/elementor/thumbs/logo-flexxus-header-pv8liah8khv6xfynvz03so9v98sk2tr50hts9we7dk.png)
# Prueba Técnica I+D Team - CRUD de Usuarios en React

¡Bienvenido a la prueba técnica para desarrolladores FullStack de Flexxus! 
En este proyecto, te desafiamos a construir un CRUD de usuarios utilizando React. 
`Sigue las instrucciones a continuación para comenzar`.


## Instrucciones

### 1. Fork del Repositorio

Haz un fork de este repositorio haciendo clic en el botón "Fork" en la esquina superior derecha de esta página. Esto creará una copia del repositorio en tu cuenta de GitHub.

Luego deberás seguir las instrucciones de github, para clonar el repositorio en tu maquina de manera local.


### 2. Inicializar el proyecto

Entra al directorio del proyecto, dentro del repositorio tendrás `dos carpetas`:

#### DOCS - `LEER CON ATENCIÓN`
En esta carpeta encontrarás `ejercicios de algoritmos y estructuras de datos en JavaScript`, con sus respectivos test, también tendrás un readme.md con las instrucciones del mismo.

Además tendrás tendrás una lista de `consultas SQL`que deberás resolver.

#### API


Tendras disponible un `json-server` con una lista de usuarios ficticios. 
Si nunca lo utilizaste te dejamos la documentación en la sección de [recursos](#sources).

Para inicializar el servidor deberas ejecutar los siguientes comandos:

```bash
cd ./api
npm install
npm run server
```
Por defecto se inicializará en el puerto 4000.

#### CLIENT
Dentro del repositorio deberas crear una carpeta llamada `client`. 
Dentro de la misma deberá estar el frontend en React. Podrás usar el comando que prefieras para inicializar el proyecto. 
Te dejamos una sugerencia.

```bash
npx create-react-app client
npm start
```
Tambien podrás usar otras alternativas como `vite` o similares. (opcional)

Deberas instalar la librería `antd`, donde tendrás muchos de los componentes que necesitaras para realizar el CRUD. Si nunca la utilizaste podes consultar la documentación que dejamos en la sección de [recursos](#sources).

```bash
npm install antd
```


### 3. Normas de desarrollo

Desarrolla la aplicación siguiendo las especificaciones proporcionadas. Asegúrate de seguir las siguientes normas de desarrollo:

- Utiliza React para construir la interfaz de usuario.
- La aplicación debe ser un CRUD completo, permitiendo crear, leer, actualizar y eliminar usuarios.
- Implementa validaciones en los formularios para garantizar la integridad de los datos.
- Utiliza componentes funcionales y hooks siempre que sea posible.
- Escribe código limpio y legible. Utiliza nombres de variables descriptivos y sigue las convenciones de estilo de código de JavaScript y React.
- Gestiona el estado de la aplicación de manera eficiente y evita el uso excesivo de prop drilling.
- Comenta tu código cuando sea necesario para explicar partes complejas o importantes del mismo.
- Utiliza React Context o Redux para el estado global de la aplicación.
- Recomendamos utilizar UUID para la generación de indentificadores únicos de los registros de los usuarios.
- Se debe respetar el diseño en Figma que se les adjunto en la sección de [recursos](#sources).
- Se debe utilizar la librería antd y css/less/sass en caso de ser necesario.
- Recomendamos reutilizar la mayor cantidad de componentes posibles, y evitar el codigo repetitivo.

## 4. Requerimientos del software

A continuación listaremos los requerimientos del software a desarrollar. 
Es necesario simular un tiempo de carga entre las peticiones con un setTimeOut, y mostrar un Loader en los componentes afectados.

- Listar usuarios.
- Crear usuarios.
- Editar usuarios.
- Eliminar usuarios.
- Buscar por nombre o apellido por coincidencia.
- Filtrar por el estado del usuario (active/inactive).
- Paginado de registros utilizando limit & offset.

### 5. Entrega del proyecto

Cuando hayas terminado el desarrollo y estés satisfecho con el resultado, sube tus cambios a un repositorio remoto utilizando los comandos de git:

```bash
git add .
git commit -m "[Mensaje del commit]"
git push origin main
```

¡Eso es todo! Esperamos que disfrutes trabajando en este proyecto y estamos ansiosos por ver tu solución. Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.

<a id="sources"></a>
## Recursos 
[🎨 Link al diseño de Figma](https://shorturl.at/rwxV4)

[🗄️ Documentación `antd`](https://4x.ant.design/components/overview/)

[🗄️ Documentación `json-server`](https://github.com/typicode/json-server)


## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.
