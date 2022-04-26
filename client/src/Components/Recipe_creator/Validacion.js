

export function validate(recipe) {
    let errors = {};
    if (!recipe.title) {
      errors.title = 'Debe ingresar el nombre de la receta'
    } else if (!/^[a-zA-Z0-9 ]+$/.test(recipe.title)) {
      errors.title = 'Nombre de receta inválido, no debe contener símbolos';
    }
    
    if(recipe.image){
      if(!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(recipe.image)) {
        errors.image = 'La imagen debe ser una dirección URL'
    }
    }
    
      
    if (recipe.spoonacularScore) {
      if(!/^[0-9]+(.[0-9]+)?$/.test(recipe.spoonacularScore)) {
      errors.spoonacularScore = 'Debe ingresar solo numeros enteros o decimales hasta el 100';
    } if ((Number(recipe.spoonacularScore) > 100.0)) {
      errors.spoonacularScore = 'Debe ingresar un número de 0 al 100.0'
    }
  }

    if (recipe.healthScore) {
      if(!/^[0-9]+(.[0-9]+)?$/.test(recipe.healthScore) ) {
        errors.healthScore = 'Debe ingresar solo numeros enteros o decimales hasta el 100';
      } if ((Number(recipe.healthScore) > 100.0)) {
        errors.healthScore = 'Debe ingresar un número de 0 al 100.0'
      }
    } 
  
    if (!recipe.summary) {
      errors.summary = 'Debe ingresar la descripción de la receta';
    }
  
    return errors;
  };