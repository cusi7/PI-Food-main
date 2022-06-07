import React from "react";
import { Link } from "react-router-dom";
import "./Recipe.css"

export default function Card (props) {
  const{title, id, image, diets, spoonacularScore, healthScore, DB} = props.data;
    return(
        
            <div className="card">
                <div>
                   {DB === true ? (
                       <Link to= {`/Recipe_Book/Recipe/DB${id}`} className='linkRecipe'><h3 className="recipeTitle">{title}</h3></Link>) 
                        : 
                       (<Link to= {`/Recipe_Book/Recipe/${id}`} className='linkRecipe'><h3 className="recipeTitle">{title}</h3></Link> )
                         }  
                </div>
                          
                <div>
                    <img src={image} alt='Recipe image' className="imageRec"/>
                </div>
                            
                <div className="scores">
                    {/* <h3 className="h3_recipe">Score: </h3>
                    <p className="p_recipe_s">{spoonacularScore}</p> */}
                    <h3 className="h3_recipe">Health-Score: </h3>
                     <p className="p_recipe_s">{healthScore}</p>
                </div>

                <div className="recipe_diets">
                    <h3 className="h3_recipe">Diets:</h3>
                      <div className="list_dietss">
                          {
                           diets && diets.map((d, ind) => {
                               return (
                                   <p key={'dt' + ind} className="p_recipe">
                                     * {d}
                                   </p>
                                      )
                               })
                           }
                           
                      </div> 
                
                </div>     
                          
             </div> 
            
    )  

}