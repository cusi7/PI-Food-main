const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true     
    },
   
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
   
    summary: {   //resumen del plato
      type: DataTypes.STRING(2000),
      allowNull: false
    },

    dishTypes: {   //tipo de plato (almuerzo, cena, etc)
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    
    spoonacularScore: {   //puntuación
      type:  DataTypes.DECIMAL,
      validate: {
        puntaje(value) {
          if(value > 100) throw new Error('El puntaje debe ser menor a 100')
        }
      }
    },
    
    healthScore: {   //Nivel de "comida saludable"
      type: DataTypes.DECIMAL,  
      validate: {
        puntaje(value) {
          if(value > 100.0) throw new Error('El puntaje debe ser menor a 100')
        }
      }
    },

    analyzedInstructions: {    //paso a paso
      type: DataTypes.ARRAY(DataTypes.JSON)
    },

    DB: {
      type: DataTypes.BOOLEAN
    }

  }, {
    timestamps: false
  });
};
