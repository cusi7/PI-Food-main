import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getDiets, createRecipe} from '../../Redux/Actions.js';
import { validate } from './Validacion';
import ok from '../../images/ok.png';
import './Recipe_creator.css';
import './model_recipe.css';


function Creator(props){
    const {getDiets, createRecipe, diets} = props;

    //dishTypes
    const [type, setType] = useState('');
    const [dTypes, setDTypes] = useState([]);
    
    //Diets
    const [diet, setDiet] = useState('');
    const [listDiets, setListDiets] = useState([]);
    
    //instructions
    const [inst, setInst] = useState('');
    const [nStep, setNStep] = useState(1)
    const [instructions, setInstructions] = useState([]);
    
    const [recipe, setRecipe] = useState({});

    const [errors, setErrors] = useState({});
    const [created, setCreated] = useState(false);

    async function mount() {
        try {
            await getDiets();
            setRecipe({
                title: null,
                image: null,
                summary:null,
                dishTypes:[],
                spoonacularScore: null,
                healthScore: null,
                analyzedInstructions:[],
                dietsNames:[]
            })     
        } catch (error) {
           console.log(error) 
        }
    };
   
    useEffect(() => {
        console.log('Bienvenido al creador de recetas!')
        mount();    
    }, [])

    console.log (recipe);
    function recipeValues(event){
       event.preventDefault();
       setRecipe({
           ...recipe,
           [event.target.name]: event.target.value
       })
       setErrors (validate({
        ...recipe,
        [event.target.name]: event.target.value
        }) 
      )

    };
 
    function setStates (event) {
        event.preventDefault();
        if (event.target.id === 'dish') setType(event.target.value);
        else if (event.target.id === 'step') {
            setInst(event.target.value);}
       else if (event.target.id === 'diet') setDiet(event.target.value); 
    };
//lista de dietas
    function checkDiet (event) {
        if(event.target.checked) {
            setListDiets([...listDiets, event.target.value])
        } else if(!event.target.checked) {
            setListDiets(listDiets.filter(d => d !== event.target.value))
        }       
    };

    function dietSubmit (event) {
        event.preventDefault();
        if(diet && !listDiets.includes(diet)) {
            setListDiets([...listDiets, diet])
            setDiet('')
        } 
    };

//lista de tipo de platos
    function typesSubmit (event) {
        event.preventDefault();
        if(type && dTypes.includes(type) === false) {
            setDTypes([...dTypes, type])
            setType('')
        } else setType('')
    };

    //instrucciones
    function stepSubmit (event) {
        event.preventDefault();
        if(inst) {
            setInstructions([...instructions,
             {
                 number:nStep,
                 step: inst
             }]);
            setNStep(() => nStep + 1);
            setInst('')
        }
    };

     //crear receta
  async function submit(e) {
    e.preventDefault();

    recipe.analyzedInstructions = instructions;
    recipe.dietsNames= listDiets;
    recipe.dishTypes=  dTypes;
    if(recipe.spoonacularScore !== null) {
        recipe.spoonacularScore= Number(recipe.spoonacularScore);
    }
    if (recipe.healthScore !== null) {
        recipe.healthScore= Number(recipe.healthScore);
    }
    if(!recipe.image) recipe.image = 'https://www.nicepng.com/png/detail/131-1314271_food-icon-food-court-icon-png.png';

    try {
        await createRecipe(recipe);
        setCreated(true)
    } catch (error) {
        console.log(error)
    }
    setRecipe({
        title:'',
        image: '',
        summary:'',
        dishTypes:[],
        spoonacularScore: null,
        healthScore:null,
        analyzedInstructions:[],
        dietsNames:[]
    })
  }

    
    function disabledButton() {
        if (Object.keys(errors).length > 0 || !recipe.title) return true
        else return false
    }

    return (

        <div className="cont_creator">
            
            <div className= {(created ===true) ? 'oculto' : 'creator'}>
                <form className='form_1'>
                    <ul>
                        <li>
                            <div className="items_form">
                                <label htmlFor="title" className="p_form_title">Nombre: </label>
                                <input type="text" id="title" name="title" autoComplete="off" className="input_small" value={recipe.title} onChange={(e)=>recipeValues(e)}/>    
                            </div>
                            
                            <p className='danger'>{errors.title}</p>  
                        </li>
                        <li>
                            <div className="items_form">
                                <label htmlFor="image" className="p_form_title">Imagen: </label>
                                <input type="text" id="image" name="image" autoComplete="off" className="input_small" value={recipe.image} onChange={(e)=>recipeValues(e)} />
                            </div>
                            
                            <p className='danger'>{errors.image}</p>
                        </li>
                        <li>
                            <div className="items_big_form">
                                 <label htmlFor="summary" className="p_form_title">Descripción: </label>
                                 <textarea id="summary" name="summary" rows="4" cols="35" className="big_text" value={recipe.summary} onChange={(e)=>recipeValues(e)}/>
                            </div>
                            
                            <p className='danger'>{errors.summary}</p>
                        </li>
                        <li>
                            <div className="items_form">
                                <label htmlFor="spoonacularScore" className="p_form_title">Score: </label>
                                <input type="text" id="spoonacularScore" name="spoonacularScore" autoComplete="off" className="input_small" value={recipe.spoonacularScore} onChange={(e)=>recipeValues(e)}/>
                            </div>
                            
                            <p className='danger'>{errors.spoonacularScore}</p>
                        </li>
                        <li>
                            <div className="items_form">
                                <label htmlFor="healthScore" className="p_form_title">Health-Score: </label>
                                <input type="text" id="healthScore" name="healthScore" autoComplete="off" className="input_small" value={recipe.healthScore} onChange={(e)=>recipeValues(e)}/>
                            </div>
                            
                            <p className='danger'>{errors.healthScore}</p>
                        </li>
    
                    </ul>
                </form>         
            
                <form onSubmit={(e) => typesSubmit(e)} className='ingresar'>
                       <label htmlFor="dish" className="p_form_title">Tipos de plato:</label>
                       <input type="text" id="dish" autoComplete="off" className="input_ingresar" value={type} onChange={(e)=>setStates(e)}/>
                       <button type="submit" className="boton_ingresar">Agregar</button>
                       
                </form>
                     <p className='danger'>{errors.dishTypes}</p>
                <h3 className="p_form_title">Dieta: </h3>
                <form id= 'fDiets' className="fDiets" onSubmit = {(e)=> checkDiet(e)}>
                    {diets.length > 0 ? diets.map((d, index) => {
                         return(
                             <div key={'dt'+ index}>
                                 <label className="p_diet_check">{d.name}</label>
                                 <input form='fDiets' type= "checkbox" name= {d.name} value= {d.name} className="check" onClick= {(e)=> checkDiet(e)}/>
                            </div>
                                )

                      }) : <p className="p_diet_check">SORRY, diets not found</p>
                    }
                           
                </form>          
                <p className='danger'>{errors.dietsNames}</p>
                <form onSubmit={(e) => dietSubmit(e)} className='ingresar'>
                     <input type="text" id="diet" autoComplete="off" value={diet} className="input_ingresar" onChange={(e)=>setStates(e)}/>
                     <button type="submit" className="boton_ingresar">Agregar dieta</button>
                </form>   
                
                <div className="items_big_form">
                      <h3 className="p_form_title">Instrucciones: </h3> 
                        
                     <div className="num_paso">
                             <h3 className="p_step">Paso numero:</h3>
                             <h3 className="p_num_step_creator">{nStep}</h3>
                     </div>
                     
                     <div className="text_inst">

                             <label htmlFor="step"></label>

                             <textarea name='step' id='step' rows="4" cols="35" className="big_text" value={inst} onChange={(e)=>setStates(e)}/>
                             <p className='danger'>{errors.analyzedInstructions}</p>
                             <button onClick={(e) => stepSubmit(e)} className="boton_ins">Agregar</button>
                    </div>
                      
                </div>

                <button className="boton_crear_rec" onClick= {(e) => submit(e)} disabled= {disabledButton()} >CREAR RECETA</button>

            </div>

            <div className= {(created ===true) ? 'oculto' : 'receta'}>
                <h3 className='title_model'>{recipe.title}</h3>
                <div className="box_1">
                     <div className="recuadro_img">
                         {recipe.image ? 
                         <img src={recipe.image} alt='Imagen de receta' className="img_model"/>
                        : <img src='https://www.nicepng.com/png/detail/131-1314271_food-icon-food-court-icon-png.png' alt='image recipe' className="img_model"/>}
                         
                     </div>
                     <div className="box_score">
                          <h3 className="h3_model">Score: </h3>
                            {recipe.spoonacularScore ? <p className='p_model'>* {recipe.spoonacularScore} </p> : <p className='p_detalle'>--</p>}

                          <h3 className="h3_model">Health-Score: </h3>
                            {recipe.healthScore ? <p className='p_model'>* {recipe.healthScore} </p> : <p className='p_detalle'>--</p>}
                     </div>
                </div>
                <div className="box_2">
                    <div className="box_fragment">
                        <h3 className="h3_model">Dish types: </h3>
                                     <div className="lista_detalle">                      
                                         {dTypes && dTypes.map((p, index) => {
                                             return(
                                                 <p key={'pc' + index} className='p_model'> * {p}</p>
                                             )
                                         })}
                                     </div>
                    </div>
                    <div className="box_fragment">
                          <h3 className="h3_model">Diets: </h3>
                                       <div className="lista_model">                                 
                                       {
                                       listDiets && listDiets.map((d, index) => {
                                           return(
                                               <p key={'dc' + index} className='p_model'>
                                                   * {d}
                                               </p>
                                           )
                                       })
                                       }
                   
                                       </div>

                    </div>
                    
                    <h3 className="h3_model">Summary:</h3>
                    <div className="cont_desc">
                    <p className='p_model'>{recipe.summary}</p>
                    </div>
                    <div className="box_fragment">
                      <h3 className="h3_model">Instructions: </h3>
                                        <div className="contenedor_steps_creator">
                                               {instructions ? instructions.length > 0 && instructions.map((s, index) => {
                                                   return (
                                                       <div key={'sc' + index} className='step'>
                                                           <div>
                                                               <p className='p_num_step_model'>{s.number}*</p>
                                                           </div>
                                                           <div className="box_fragment">
                                                               <p className='p_model'>{s.step}</p>
                                                           </div>
                                                           
                                                       </div>
                                                   )
                                                   }) : <p className='p_model'>--</p>
                                               }
      
                                        </div>
                    </div>
                </div>  

            </div>

            <div
            className={(created ===true) ? 'cuadro_creado' : 'oculto'}>
                <img src={ok} alt='ok' className="img_ok"/>
                <h1 className="mensaje_creado">Su receta fue creada con éxito!!!</h1>
                <Link to="/Recipe_Book"><button className="boton_crear_rec">Home</button></Link>
            </div>
             
        </div>
    )

};
function mapStateToProps(state){
    return {
        diets: state.diets
    }

};
function mapDispatchToProps(dispatch){
    return {
        getDiets: () => dispatch(getDiets()),
        createRecipe: (value) => dispatch(createRecipe(value))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);