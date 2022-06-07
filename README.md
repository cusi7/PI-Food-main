<p align='left'>
    <img width= '25%' src='https://github.com/cusi7/PI-Recipe-Book/blob/main/Img/rec-book-logo.jpg' </img>
</p>

# 


### En Recipe Book puedes acceder a los detalles de las recetas, ordenarlas tanto alfabeticamente como por puntaje, filtrarlas por tipo de dieta o palabras clave, y puedes crear tus propias recetas y compartirlas con el resto de los usuarios.
#


## Tecnologías utilizadas

+ JavaScript 
+ React 
+ Redux 
+ ExpressJS
+ NodeJS 
+ PostgreSQL
+ Sequelize 
+ Git
+ HTML
+ CSS
#
+ API: [spoonacular](https://spoonacular.com/food-api)
#


## ¿Cómo probarlo?

+ Debes clonar el repositorio y tener PostgreSQL instalado en tu ordenador 

+ Instalar el package, colocando `npm install` en la consola

+ Crear un archivo `.env` dentro de la carpeta `api`. El archivo debe contener lo siguiente:

```
DB_USER = "coloca tu usuario de postgres"
DB_PASSWORD = "coloca tu password de postgres"
DB_HOST = localhost

API_KEY_1 = c8c50c82a3bb4436928bdeaee3440757
API_KEY_2 = a1c3aca61b0e4f5e8bb0c0a6adb86966 
API_KEY_3 = 3ffdfb254ab34fdcb6b5342124214f24
```
Las Api key tienen un numero de peticiones limitadas, por lo que si no emite respuesta debes cambiar el numero de api key en `api/src/routes/recipes.js`
#


## Imágenes
<p>
  <a><img width="45%" src="https://github.com/cusi7/PI-Recipe-Book/blob/main/Img/rec-book-1.jpg"></a>
  <a><img width="45%" src="https://github.com/cusi7/PI-Recipe-Book/blob/main/Img/rec-book-2.jpg"></a>
</p>

<p>
  <a><img width="45%" src="https://github.com/cusi7/PI-Recipe-Book/blob/main/Img/rec-book-3.jpg"></a>
  <a><img width="45%" src="https://github.com/cusi7/PI-Recipe-Book/blob/main/Img/rec-book-4.jpg"></a>
</p>

<p>
  <a><img width="45%" src="https://github.com/cusi7/PI-Recipe-Book/blob/main/Img/rec-book-5.jpg"></a>
  <a><img width="45%" src="https://github.com/cusi7/PI-Recipe-Book/blob/main/Img/rec-book-6.jpg"></a>
</p>



