const { Op } = require('sequelize'); //preguntar si se puede usar
const axios = require ('axios');
require('dotenv').config();
const {API_KEY_1, API_KEY_2, API_KEY_3 } = process.env;
const { Router } = require('express');
const{Diet, Recipe} = require('../db.js');
const router = Router();

const apiKey = API_KEY_3;
// //Obtener un listado de las recetas que contengan la palabra ingresada 
// //como query parameter
router.get('/', async(req, res) => {
 let nombre = req.query.name;

 try {
     //recetas de la API
    const getRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
    .then((r) => r.data.results.map(e => {
        receta = {
            id: e.id, 
            title: e.title,
            image: e.image,
            spoonacularScore: e.spoonacularScore,
            healthScore: e.healthScore,
            diets: e.diets
           
        }
        return receta
    }));
    //si no se ingresa nombre devuelvo todas las recetas
    if(!nombre) {
        let recetasDb = await Recipe.findAll( {
            include: [{
                model: Diet,
                attributes: ['name'],
                through: {
                  attributes: []
                  }
            }]
        });
        let recetasOk = recetasDb.map(r => {
            let recipe = {
                 id: r.id,
                 title: r.title, 
                 image: r.image, 
                 summary: r.summary,
                 dishTypes: r.dishTypes, 
                 spoonacularScore: r.spoonacularScore, 
                 healthScore: r.healthScore, 
                 analyzedInstructions: r.analyzedInstructions,
                 diets: r.diets.map(d => d.name),
                 DB: r.DB 
             }
             return recipe
         });

        let recetas = recetasOk.concat(getRecipes);

        res.status(200).json(recetas);

    //busca recetas que contengan la palabra
    }else if(nombre !== undefined) {
        nombre = nombre.toLowerCase();

        let recetasApi = getRecipes.filter( r => r.title.toLowerCase().includes(nombre)); 

        let recetasDb = await Recipe.findAll( { 
            where: { title: {[Op.like]: `%${nombre}%`}  },
            include: [{
                model: Diet,
                attributes: ['name'],
                through: {
                  attributes: []
                  }
            }]
        });

        let recetasOk = recetasDb.map(r => {
           let recipe = {
                id: r.id,
                title: r.title, 
                image: r.image, 
                summary: r.summary,
                dishTypes: r.dishTypes, 
                spoonacularScore: r.spoonacularScore, 
                healthScore: r.healthScore, 
                analyzedInstructions: r.analyzedInstructions,
                diets: r.diets.map(d => d.name),
                DB: r.DB 
            }
            return recipe
        });

        let recetas = recetasOk.concat(recetasApi);
        
        if(recetas.length >= 1) {
              res.status(200).json(recetas)
        } else {
              res.json([])
         }
    
    }
    
} catch (error) {
    res.status(404).json({error: 'Error al traer info de la API y DB'}) 
}
});

// //Obtener el detalle de una receta en particular
// //Debe traer solo los datos pedidos en la ruta de detalle de receta
// //Incluir los tipos de dieta asociados
router.get('/:idReceta', async(req, res) => {
    const {idReceta} = req.params;
    try {
        if(idReceta.slice(0, 2) === 'DB') {
            let idRec = parseInt(idReceta.slice(2));

            let receta = await Recipe.findByPk(idRec, {
                include: [{
                    model: Diet,
                    attributes: ['name'],
                    through: {
                      attributes: []
                      }
                }]
            })  //receta de la DB

            let dietsOk = receta.diets.map(d => d.name);


            let recipeDB = {
                id: receta.id,
                title: receta.title, 
                image: receta.image, 
                summary: receta.summary,
                dishTypes: receta.dishTypes, 
                spoonacularScore: receta.spoonacularScore, 
                healthScore: receta.healthScore, 
                analyzedInstructions: receta.analyzedInstructions,
                diets: dietsOk,
                DB: receta.DB
                
            }
          
            if(receta) {
                res.status(200).json(recipeDB)
            } else {
                res.send('No se ha encontrado ninguna receta')
            }

        }
        else {
            let idRec = idReceta;
            const receta = await axios.get( `https://api.spoonacular.com/recipes/${idRec}/information?apiKey=${apiKey}`)
                .then ( (r) => r.data );
                    let instrucciones= [];
                    let recipe = {};
                    if(receta.analyzedInstructions.length > 0) {
                        instrucciones = receta.analyzedInstructions[0].steps
                    }
                    if(receta) {
                        recipe.spoonacularScore = receta.spoonacularScore;
                        recipe.healthScore = receta.healthScore;
                        recipe.title = receta.title;
                        recipe.image = receta.image;
                        recipe.summary = receta.summary;
                        recipe.dishTypes = receta.dishTypes;
                        recipe.diets = receta.diets;
                        recipe.analyzedInstructions = instrucciones
                    } 
                    

                if(receta) {
                    res.status(200).json(recipe)
                } else {
                    res.send('No se ha encontrado ninguna receta')
                }
        }
    } catch (error) {
        res.status(404).json({error: 'Error al traer info de la API y DB'})
    }


});


module.exports = router;