import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Usuario from "./Usuario.js";
import Proyecto from "./Proyecto.js";

const UsuarioProyecto = sequelize.define("UsuarioProyecto", {
    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        references: {
            model: Usuario,
            key: 'id_usuario'   
        }
    },
    id_proyecto:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        references: {
            model: Proyecto,
            key: 'id_proyecto'   
        }
    }
},{
    tableName: 'UsuarioProyectos', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true, 
});

Usuario.belongsToMany(Proyecto, { 
    through: UsuarioProyecto, 
    foreignKey: 'id_usuario', // Asegurar que Sequelize use 'id_usuario'
    otherKey: 'id_proyecto'   // Asegurar que Sequelize use 'id_proyecto'
});

// Definir la relación belongsToMany en el modelo Proyecto
Proyecto.belongsToMany(Usuario, { 
    through: UsuarioProyecto, 
    foreignKey: 'id_proyecto', // Asegurar que Sequelize use 'id_proyecto'
    otherKey: 'id_usuario'     // Asegurar que Sequelize use 'id_usuario'
});
export default UsuarioProyecto; 