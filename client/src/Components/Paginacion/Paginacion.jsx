import React, { useState, useEffect } from "react";
import Card from "../Recipe/Recipe.jsx";
import './Paginacion.css'

//9 tarjetas por página
export default function Paginacion(props) {
    const data = props.data;
    const [pages, setPages] = useState(Math.ceil(data.length / 9));
    const [numPage, setNumPage] = useState(1);
    const [pagIndex, setPagIndex] = useState(1);
  
    useEffect(() => {
      setPages(Math.ceil(data.length / 9));
      setNumPage(1);
      setPagIndex(1)
    }, [data])
  
    function nextPage() {
       if(numPage < pages) {
           setNumPage(numPage => numPage + 1);
           setPagIndex(numPage + 1);
           window.scrollTo(0, 0);
       }
    };
  
    function prevPage() {
        if(numPage > 1) {
            setNumPage(numPage => numPage - 1);
            setPagIndex(numPage - 1);
            window.scrollTo(0, 0);
        }
    };
  
    const getPageData = () => {
      if(data.length > 0) {
        const startIndex = numPage * 9 - 9;
        const endIndex = startIndex + 9;
        return data.slice(startIndex, endIndex);
      }
    };

    const indexIncrement = (event) => {
      event.preventDefault();
      if(pagIndex < pages) {
        setPagIndex(pagIndex + 1)
    }
    };

    const indexDecrement = (event) => {
      event.preventDefault();
      if(pagIndex > 1) {
        setPagIndex(pagIndex - 1)
    }
    };

    function changePage(event) {
      event.preventDefault();
      setNumPage(pagIndex);
      window.scrollTo(0, 0);
    }
  
    return (
        <div>
            
            <div className="recetas">
                {getPageData().map((r, ind) => {
                    return (
                        <Card key={ind} data={r}/>
                    )
                })}
            </div>
    
            <div className="barra_pag">

                <div className="botones"> 
                     <button
                         onClick={prevPage}
                         className= {(numPage === 1) ? 'disabled' : 'boton_prev'}
                     >
                      prev
                     </button>

     
    
                     <button
                         onClick={nextPage}
                         className= {(numPage === pages) ? 'disabled' : 'boton_next'} 
                     >
                      next
                     </button>

                </div>
    
                <div className="paginas">
                  <p className="p_pag">página</p>
                  
                  <div className="cambiar_pag">
                    
                    <p className="pag_Acambiar">{pagIndex}</p>
                    <div className="bot_pag">
    
                      <button className="bot_pag_inc" onClick={(e) => indexIncrement(e)}>+</button>
                      <button className="bot_pag_dec" onClick={(e) => indexDecrement(e)}>-</button>
    
                    </div>
    
                  </div>

                  <p className="p_pag">de</p>
                  <p className="pag_cant">{pages}</p>
                  <button className='boton_ir' onClick={(e) => changePage(e)}>IR</button>
    
                </div>

            </div>
            
        
        </div>
    );
  }