const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      // get() {
      //   return `DB${this.getValue('id')}`
      // }
    },
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // set(value) {
      //   this.setValue('title', value.toLowerCase())
      // }
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
        isDecimal: true,
        puntaje(value) {
          if(value > 100) throw new Error('El puntaje debe ser menor a 100')
        }
      }
    },
    
    healthScore: {   //Nivel de "comida saludable"
      type: DataTypes.DECIMAL,  // // //al mandarlo
      validate: {
        isDecimal: true,
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
