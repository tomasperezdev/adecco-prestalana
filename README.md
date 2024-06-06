<h1 align="center"> 
  <img alt="Venue Logo" width='50' src="https://multiapoyo.zendesk.com/hc/theming_assets/01HZPB1BNDKDP2S7RYFEZ2FCDD"> Prestalana Technical Assessment
</h1>
<!-- <p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/tomasperezdev/venue-ta?color=1dbf73">
  <img alt="Github language count" src="https://img.shields.io/github/languages/count/tomasperezdev/venue-ta?color=1dbf73">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/tomasperezdev/venue-ta?color=1dbf73">
</p> -->

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Run</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/tomasperezdev" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

En este proyecto se incorporaron requirimientos de sistema para configurar un administrador de productos utilizando NextJS y Typescript como tecnologías bases. Como parte del proceso se estipularon varias features a incluir dentro del desarrollo y a continuación se enuncian cada una de ellas con sus respectivos detalles, trade offs, consideraciones y siguientes pasos.

## 🕵️ My Approach ##

**1. Lista de Productos y Favoritos:**

  1. Para la implementación de una lista de productos que se pudiera filtrar con un input de búsqueda y que incluyera propiedades para poder incorporar un carrito de compra, utilicé la herramienta de API provista [Reqres](https://reqres.in/) de manera que de manera simple se pudiera tener un set de información para trabajar.
  2. Como parte de los requerimientos, se incluyó una funcionalidad de Favoritos, utilizando Redux como state management tool, de forma que se pudiera visualizar la información de los productos que el usuario seleccionara para asignarlos como sus favoritos y una pantalla para desplegarlos.
  3. En la pantalla específica de los favoritos se implementó la funcionalidad de Drag and Drop para poder modificar el orden de los favoritos de manera sencilla, la cual se mantiene aún cuando el usuario sale de la página y regresa.
  4. Se utilizó también cookies para configurar información persistente, de lado de los productos, de manera que el sitio solo hace una carga de datos y guarda la información para futuro uso y administración en el carrito de compras y los favoritos.
  5. Para la eliminación de los favoritos se incluyó una validación para pedir confirmación del usuario ingresando el "año" del producto descrito en el mensaje para confirmar la eliminación.
  6. El API no incluía un dato de "Precio" para los productos que regresaba, de forma que se implemento un procesamiento de información antes del guardado para atribuirle un precio a los productos para fines del proyecto.
  7. El filtro de búsqueda funciona utilizando la propiedad del nombre de los productos para realizar el filtrado y se incluyo una configuración de "debounce" para evitar la llamada de la función de actualización y renderizado sucede con cada type que realiza el usuario.

**2. Lista de compras**
   
  1. Se creó la funcionalidad para que el usuario pueda agregar o quitar productos de un carrito de compras, guardando la selección y cantidad en las cookies del explorador para facilitar la comunicación entre los client y server components que componen el sistema.
  2. En la pantalla del carrito de compras el usuario puede administrar sus productos, agregando, quitando o modificando la cantidad y obtiene una sumatoria de total y un porcentaje dependiente que ejemplifica los impuestos a pagar por la compra.
  3. Así mismo se implementó un acceso directo en la parte superior derecha de la pantalla, para que cuando el usuario agregue productos a su carrito puede visualizar la cantidad y pueda acceder a la pantalla usando el mismo botón.

**3. Autenticación**
    
  1. Se implementó la base para la configuración de "Providers" usando NextAuthJs, de manera que se configura una sesión, acceso e incluso roles para los usuarios.
  2. Para fines del proyecto no se incluyo ningún tipo de validación, ya que se incluyo el CredentialsProvider básico de NextAuth para tener un esquema de login y logout en escena, disponible para futuras implementaciones.

**4. Testing**

  1. Se incluyeron test cases para la mayor parte de la business logic que contiene el proyecto. Todo el procesamiento de los datos, conversiones y parsing antes y después del guardado de datos se tiene contemplado en unit testing para verificar y certificar que funcionan correctamente.
  2. Se incluyeron tests cases para renderizado de componentes y respuestas de la llamada al API para identificar como fluye la información a lo largo de todo el proceso.
  2. Se utilizo Jest y React Testing Library para fines de realizar los test cases.

**5. Diseño**

  1. Para fines de diseño y estilos durante la implementación de las interfaces se utilizó TailwindCss para dar estilos a los diferentes elementos que conforman los JSX components del proyecto.
    
## :sparkles: Consideraciones Adicionales ##

:heavy_check_mark: No se incluyo el uso de una base de datos, las funciones y requirimientos estaban más enfocados a llevar a cabo la puesta en escena de la información, procesarla, mantenerla disponible y visualizarla de manera correcta, se crearon los hooks y los diferentes componentes para eventualmente simplemente cambiar el origen de los datos, que bien podria ser una llamada a la base de datos a través de los server components.

:heavy_check_mark: Se incluyó EsLint para la revisión y correción del formato del código con los estandares normales para typescript.

:heavy_check_mark: Al no contar con una base de datos la autenticación no requiere ningún usuario específico, la implementación de datos correspondientes a un usuario en particular se dejó para futuras implementaciones

## :rocket: Technologies ##

The following tools were used in this project:

- [ReactJs](https://react.dev/)
- [NextJs](https://nextjs.org/)
- [JestJS](https://jestjs.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## :white_check_mark: Set Up ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/tomasperezdev/adecco-prestalana

# Access
$ cd adecco-prestalana

# Install dependencies
$ npm install

# Run the project
$ npm run dev

# The server will initialize in the <http://localhost:3000>
```

## :memo: License ##

This project is under license from MIT.

Made with :heart: by <a href="https://github.com/tomasperezdev" target="_blank">Tomas Perez</a>

&#xa0;

<a href="#top">Back to top</a>