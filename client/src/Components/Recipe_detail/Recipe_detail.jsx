import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getRecipeId } from "../../Redux/Actions.js";
import pizza from '../../images/pizza.png';
import './Recipe_detail.css';


function RecipeDetail(props) {
    
    const {getRecipeId, recipe} = props;
    const {id} = useParams();
    const [load, setLoad] = useState(true); 
    
    async function recipe_mount(id) {
        try {
            await getRecipeId(id);
            setLoad(false)
        } catch (error) {
            console.log(error)
        }        
    }
    
    useEffect(() => {
        recipe_mount(id)
    },[]);

    const summaryOk = () => {
		if (recipe.summary) {
			return recipe.summary.replace(/<[^>]+>/g, "");
		}
	};
   
    return(
        <div className="todo">
            <div 
            className={(load ===true) ? 'mensaje_load' : 'oculto'}>
                 <img src={pizza} alt='imagen load' className="img_loader"/>
            </div>
            {recipe ? (<div 
            className={(load === true) ? 'oculto' : "hoja"}>

                <div>
                    <h1 className="titulo_detalle">{recipe.title}</h1>
                </div>

                <div className="resto">

                       <div className="uno">
                             
                             <img src={recipe.image} alt='Sorry, img not found' className="detalle_img"/>
                             
                             <div className="columna-der">

                                      <h3 className="h3_detalle">Score: </h3>
                                      {recipe.spoonacularScore ? <p className='p_detalle'>* {recipe.spoonacularScore} *</p> : <p className='p_detalle'>--</p>}

                                      <h3 className="h3_detalle">Health-Score: </h3>
                                      {recipe.healthScore ? <p className='p_detalle'>* {recipe.healthScore} *</p> : <p className='p_detalle'>--</p>}

                                 <h3 className="h3_detalle">Dish types: </h3>
                                 <div className="lista_detalle">
                                     
                                     {recipe.dishTypes && recipe.dishTypes.map((p, index) => {
                                         return(
                                             <p key={'p' + index} className='p_detalle'> * {p}</p>
                                         )
                                     })}
                 
                                 </div>

                                 <h3 className="h3_detalle">Diets: </h3>
                                 <div className="lista_detalle">
                                 
                                 {
                                 recipe.diets && recipe.diets.map((d, index) => {
                                     return(
                                         <p key={'d' + index} className='p_detalle'>
                                             * {d}
                                         </p>
                                     )
                                 })
                                 }
             
                                 </div>
                                 
                                 
                             </div>
             
                      </div>

                            <div className="descripcion">
                                 <p className='p_descripcion'>{summaryOk()}</p>
                            </div>

                            
                                  <h3 className="h3_detalle">Instructions: </h3>
                                  <div className="contenedor_steps">
                                         {recipe.analyzedInstructions ? recipe.analyzedInstructions.length && recipe.analyzedInstructions.map((s, index) => {
                                             return (
                                                 <div key={'s' + index} className='step'>
                                                     <div>
                                                         <p className='p_num_step'>{s.number}*</p>
                                                     </div>
                                                     <p className='p_descripcion'>{s.step}</p>
                                                 </div>
                                             )
                                             }) : <p className='p_descripcion'>--</p>
                                         }

                                  </div>
                                  
                 </div>
                  

            </div>)
            : <p
             className={(load === true) ? 'oculto' : 'mensaje_load'}>
                 Sorry, recipe not found</p>}
            
            
        </div>
    )

};

function mapStateToProps(state){
    return {
        recipe: state.theRecipe
    }

};
function mapDispatchToProps(dispatch){
    return {
        getRecipeId: (id) => dispatch(getRecipeId(id))
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);