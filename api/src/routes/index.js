const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const newRecipe = require('./recipe.js');
const diets = require('./types.js');
const recipes = require('./recipes.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipe', newRecipe);

router.use('/types', diets);

router.use('/recipes', recipes);


module.exports = router;
