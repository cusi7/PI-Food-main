const { Router } = require('express');
const{Diet, Recipe} = require('../db.js');
const router = Router();

//Crea una receta en la base de datos

router.post('/', async(req, res) => {
   let{title, image, summary, dishTypes, spoonacularScore, healthScore, analyzedInstructions, dietsNames} = req.body;  //dietsNames lo traigo como array de names

   try {
       let newRecipe = await Recipe.create({
        title : title.toLowerCase(), 
        image, 
        summary,
        dishTypes, 
        spoonacularScore: Number(spoonacularScore) ,
        healthScore: Number(healthScore), 
        analyzedInstructions,
        DB: true
       });
       
       
       if(dietsNames.length > 0) {
        dietsNames.forEach( async(d) => {
            let dieta = d.toLowerCase();
            let [instance, created] = await Diet.findOrCreate({
                where: {name: dieta},
                default: {
                    name: dieta
                }  
            });
            if(instance) {
                newRecipe.addDiet(instance);}
                
    
            else if(created) {
                newRecipe.addDiet(created);

            }
           
           })
       }
       let dietsOk = dietsNames.map(d => d.toLowerCase());

       let recipe = {
        id: newRecipe.id,
        title: newRecipe.title, 
        image: newRecipe.image, 
        summary: newRecipe.summary,
        dishTypes: newRecipe.dishTypes, 
        spoonacularScore: newRecipe.spoonacularScore, 
        healthScore: newRecipe.healthScore, 
        analyzedInstructions: newRecipe.analyzedInstructions,
        diets: dietsOk,
        DB: newRecipe.DB
       }
    
       res.json(recipe );
   
    } catch (error) {
        res.status(404).json({error: 'Error post DB'})
   }
});


module.exports = router;