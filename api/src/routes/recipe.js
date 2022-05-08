const { Router } = require('express');
const{Diet, Recipe} = require('../db.js');
const router = Router();

//Crea una receta en la base de datos

router.post('/', async(req, res) => {
   let{title, image, summary, dishTypes, spoonacularScore, healthScore, analyzedInstructions, dietsNames} = req.body;  //dietsNames lo traigo como array de names
   let score = null;
   let hScore = null;
   if(spoonacularScore !== null) score = Number(spoonacularScore);
   if(healthScore !== null) hScore = Number(healthScore);

   try {
       let newRecipe = await Recipe.create({
        title: title.toLowerCase(), 
        image, 
        summary,
        dishTypes, 
        spoonacularScore: score,
        healthScore: hScore, 
        analyzedInstructions,
        DB: true
       });
       let dietsOk = null;

       if( dietsNames && dietsNames.length > 0) {
        dietsNames.forEach( async(d) => {
            let dieta = d.toLowerCase();
            let [instance, created] = await Diet.findOrCreate({
                where: {name: dieta},
                default: {
                    name: dieta
                }  
            });
            if(instance) {
                newRecipe.addDiet(instance)}   
            else if(created) {
                newRecipe.addDiet(created);
            };
           })
           dietsOk = dietsNames.map(d => d.toLowerCase());
        };

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
    
       res.json(recipe);
   
    } catch (errors) {
        res.send(errors.message)
   }
});


module.exports = router;