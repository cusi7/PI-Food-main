import axios from 'axios';

const GET_RECIPES_NAME = 'GET_RECIPES_NAME';
const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
const GET_RECIPE_ID = 'GET_RECIPE_ID';
const GET_DIETS = 'GET_DIETS';
const CREATE_RECIPE = 'CREATE_RECIPE';
const ORDER_ALPH_ASC = 'ORDER_ALPH_ASC';
const ORDER_ALPH_DESC = 'ORDER_ALPH_DESC';
const ORDER_SCORE_ASC = 'ORDER_SCORE_ASC';
const ORDER_SCORE_DESC = 'ORDER_SCORE_DESC';
const ACORD_DIET = 'ACORD_DIET';

//recetas por nombre
export const getRecipesName = (name) => dispatch => {
    return axios.get(`http://localhost:3001/recipes?name=${name}`)
    .then(r => {
        dispatch({
            type: GET_RECIPES_NAME,
            payload: r.data
        })
     }
     )
};
//todas las recetas
export const getAllRecipes = () => dispatch => {
    return axios.get('http://localhost:3001/recipes')
    .then(r => {
        dispatch({
            type: GET_ALL_RECIPES,
            payload: r.data
        })
    } 
    )
};
//receta por ID
export const getRecipeId = (id) => dispatch => {
    return axios.get(`http://localhost:3001/recipes/${id}`)
    .then(r => {
        dispatch ({
            type: GET_RECIPE_ID,
            payload: r.data
        })
    } 
    )
};
//tipos de dieta
export const getDiets = () => dispatch => {
    return axios.get('http://localhost:3001/types')
    .then(r => {
        dispatch ({
            type: GET_DIETS,
            payload: r.data
        })
    } 
    )
};
//crear receta
export const createRecipe = (value) => dispatch => {
    const recipe= {
        "title": value.title,
        "summary": value.summary,
        "image": value.image,
        "dishTypes": value.dishTypes,
        "spoonacularScore": value.spoonacularScore,
        "healthScore": value.healthScore,
        "analyzedInstructions": value.analyzedInstructions,
        "dietsNames": value.dietsNames  
        

    }; console.log(value)
   
    return axios.post('http://localhost:3001/recipe', recipe )
    .then(r => {
        dispatch({
            type: CREATE_RECIPE,
            payload: r.data
        })
    } 
    )
};

//en orden alfabético ascendente
export const alphAsc = (recipes) => dispatch => {
    let data = recipes.sort(function (a, b) {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        return 0;
      });
    dispatch({
        type: ORDER_ALPH_ASC,
        payload: data
    })
};

//en orden alfabético descendente
export const alphDes = (recipes) => dispatch => {
    let data = recipes.sort(function (a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return 1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return -1;
        }
        return 0;
      });
    dispatch({
        type: ORDER_ALPH_DESC,
        payload: data
    })
};

//en orden por puntaje ascendente
export const scoreAsc = (recipes, score) => dispatch => {
    let data = recipes.sort(function (a, b) {
       return( a[score] - b[score] )
      });
    dispatch({
        type: ORDER_SCORE_ASC,
        payload: data
    })
};

//en orden por puntaje descendente
export const scoreDes = (recipes, score) => dispatch => {
    let data = recipes.sort(function (a, b) {
      return ( b[score] - a[score] )
      });
    dispatch({
        type: ORDER_SCORE_DESC,
        payload: data
    })
};

//segun dieta
export const acordDiet = (recipes, diet) => dispatch => {
    let data = recipes.filter(r => r.diets.includes(diet.toLowerCase()))
    dispatch({
        type: ACORD_DIET,
        payload: data
    })
};






