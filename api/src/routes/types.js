const { Router } = require('express');
const{Diet} = require('../db.js');
const router = Router();

//Obtener todos los tipos de dieta posibles
//En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos 
//con los tipos de datos indicados por spoonacular

router.get('/', async(req, res) => {
    let diets = await Diet.findAll({attributes: ["name"]});

    try {
        if (diets.length > 0) {
            res.json(diets)

        } else {
            let dietss = await Diet.bulkCreate([
                {name: 'gluten Free'},
                {name: 'dairy free'},
                {name: 'lacto ovo vegetarian'},
                {name: 'vegan'},
                {name: 'pescatarian'},
                {name: 'paleolithic'},
                {name: 'primal'},
                {name: 'fodmap friendly'},
                {name: 'whole 30'}
              
            ]);

            res.json(dietss);

        }

    } catch (error) {
        res.status(404).json( {error : 'No se pudo cargar la lista de dietas'})
    }

    
})

module.exports = router;