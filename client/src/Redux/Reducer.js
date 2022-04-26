
let initialState = {
    recipes: [],
    recipesName: [],
    theRecipe: {},
    diets: [],
    inOrder: [],
    recipesDiet: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PRUEBA': 
            return state
            ;
        case 'GET_RECIPES_NAME': 
            return {
                ...state,
                recipesName: action.payload
            };

        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes: action.payload
            };

        case 'GET_RECIPE_ID': 
            return {
                ...state,
                theRecipe: action.payload
            };

        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            };

        case 'CREATE_RECIPE':
            return {
                ...state,
                theRecipe: action.payload
            };

        case 'ORDER_ALPH_ASC':
            return {
                ...state,
                inOrder: action.payload
            };

        case 'ORDER_ALPH_DESC':
            return {
                ...state,
                inOrder: action.payload
            };

        case 'ORDER_SCORE_ASC':
            return {
                ...state,
                inOrder: action.payload
            };

        case 'ORDER_SCORE_DESC':
            return {
                ...state,
                inOrder: action.payload
            };

        case 'ACORD_DIET':
            return {
                ...state,
                recipesDiet: action.payload
            };
            
        default:
            return state;

    }

};

export default reducer;