import React, { useEffect, useState }from "react";
import './Buscador.css';
// import { useDispatch, useSelector } from 'react-redux';
import {getAllRecipes, getRecipesName, getDiets, alphAsc, alphDes, scoreAsc, scoreDes, acordDiet} from '../../Redux/Actions.js';
import Paginacion from "../Paginacion/Paginacion.jsx";
import { connect } from "react-redux";
import pizza from '../../images/pizza.png';

function Buscador (props) {
    // const dispatch = useDispatch();
    // const recetas = useSelector( (state) => state.recipes);
    
    const {recipes, recipesName, diets, inOrder, recipesDiet, getAllRecipes, getRecipesName, getDiets, alphAsc, alphDes, scoreAsc, scoreDes, acordDiet} = props;

    const [title, setTitle] = useState('');
    const [rec, setRec] = useState('');

    const [recetas, setRecetas] = useState([]);

    const [load, setLoad] = useState(true);
    
    const mount = async function () {
        try {
            await getAllRecipes();
            await getDiets();
            setRec('all');
            recipeBook();
           setLoad(false)  
        } catch (error) {
           console.log(error) 
        }};
        
   
    useEffect(() => {
            console.log('Bienvenido');
            mount();
        }, []);

    //va a setear recetas q se renderizaran
    function recipeBook(){
        if(rec === 'all') {
            setRecetas(() => recipes);
            console.log('mostrando todas las recetas');
         } else if(rec === 'name') {
             setRecetas(() => recipesName);
             console.log('mostrando recetas segun nombre');
         } else if(rec === 'alphAsc' || rec === 'alphDesc' || rec === 'spoonAsc' || rec === 'spoonDesc' || rec === 'healthAsc' || rec === 'healthDesc' ) {
            setRecetas(() => inOrder); 
            console.log('mostrando recetas ordenadas');
         } else if(rec === 'diet') {
            setRecetas(() => recipesDiet);
            console.log('mostrando recetas segun dieta');
        }
    };

    useEffect( () => {
        console.log('Actualizando recetas')
        recipeBook()
    }, [rec]);

    //buscar por nombre
   function handleChange (event) {
        setTitle(event.target.value);
      };
    //buscar por nombre  
   async function handleSubmit(event) {
        event.preventDefault(); 
        setRec('')
        try {
            setLoad(true);
            setRecetas([]);
            await getRecipesName(title);
            setRec('name');
                     
        } catch (error) {
            console.log(error)
        } setLoad(false)  
      };
      
      //cambia el orden
   function changeOrd(event) {
       event.preventDefault();
       let ord = event.target.value;
       if (ord === 'alphAsc') {
           alphAsc(recetas);
           setRec('alphAsc')
       }else if (ord === 'alphDesc') {
           alphDes(recetas);
           setRec('alphDesc')
       }else if (ord === 'spoonAsc') {
           scoreAsc(recetas, 'spoonacularScore');
           setRec('spoonAsc')
       }else if (ord === 'spoonDesc') {
           scoreDes(recetas, 'spoonacularScore');
           setRec('spoonDesc')
       }else if (ord === 'healthAsc') {
           scoreAsc(recetas, 'healthScore');
           setRec('healthAsc')
       }else if (ord === 'healthDesc') {
           scoreDes(recetas, 'healthScore');
           setRec('healthDesc')
       } 
        };

        //busca recetas por dieta
   async function changeDiet(event) {
        event.preventDefault();
        let diet = (event.target.value).toLowerCase();
        let name = title;
        setRec('');
            if(rec === 'name') {
                try {
                    setLoad(true)
                    await getRecipesName(name); 
                    await acordDiet(recipesName, diet);
                    setRec('diet')
                    setLoad(false)
                } catch (error) {
                   console.log(error) 
                }}
            else {
                try {
                    setLoad(true)
                    await getAllRecipes()
                    await acordDiet(recipes, diet);
                    setRec('diet')
                    setLoad(false) 
                } catch (error) {
                   console.log(error) 
                }             
        }};


    return (
        <div className="contenedor">
           <div className="barra">
               <div className="divOpciones">
                   <h3 className="titulosBarra">Ordenar:</h3>
                   
                   <select name='inOrder' className="selector" onChange={(e) => changeOrd(e)}>Elige una opción...
                            <option>Elige una opcion...</option>
                            <option value='alphAsc'>A-Z</option>
                            <option value='alphDesc'>Z-A</option>
                            <option value='spoonAsc'>Score Min-Max</option>
                            <option value='spoonDesc'>Score Max-Min</option>
                            <option value='healthAsc'>Health-Score Min-Max</option>
                            <option value='healthDesc'>Health-Score Max-Min</option>
                   </select>
				
		        </div>

                <div className="divOpciones">
                    <h3 className="titulosBarra">Dietas:</h3>
                    
                    <select name='diets' className="selector" onChange={(e) => changeDiet(e)}>
                            <option value='ninguna'>Elige una opcion...</option>
                               {diets.map((d, index) => {
                                     return (
                                     <option key={'diet' + index} value={d.name}>{d.name}</option>
                                     )
                                     })}
                    </select>

                </div>

                <button className="botonApp" onClick={() => setRec('all')}>Todas las recetas</button>
             
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                        
                        <label htmlFor="title"></label>
                        <input
                           type="text"
                           id="title"
                           autoComplete="off"
                           value={title}
                           className= 'input'
                           onChange={(e) => handleChange(e)}
                        />

                    <button type="submit" className="botonInput">BUSCAR</button>
                </form>

            </div> 

            <div 
            className={(load ===true) ? 'mensaje_load' : 'oculto'}>
                <img src={pizza} alt='imagen load' className="img_loader"/>
            </div>

            <div 
            className={(load === true) ? 'oculto' : 'ok'}>
               
               {recetas.length > 0 ? (
                   <Paginacion data={recetas} />) 
                   : (<p className= 'mensaje_load'>No hay recetas</p>)}

            </div>
       
        </div>
    )
};

function mapStateToProps(state) {
return {
    recipes: state.recipes,
    recipesName: state.recipesName,
    diets: state.diets,
    inOrder: state.inOrder,
    recipesDiet: state.recipesDiet
}
};

function mapDispatchToProps(dispatch) {
    return {
        getAllRecipes: () => dispatch(getAllRecipes()),
        getRecipesName: (title) => dispatch(getRecipesName(title)),
        getDiets: () => dispatch(getDiets()),
        alphAsc: (r) => dispatch(alphAsc(r)),
        alphDes: (r) => dispatch(alphDes(r)),
        scoreAsc: (r, s) => dispatch(scoreAsc(r, s)),
        scoreDes: (r, s) => dispatch(scoreDes(r, s)),
        acordDiet: (r, d) => dispatch(acordDiet(r, d)),        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Buscador)