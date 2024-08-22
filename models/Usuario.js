import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Usuario = sequelize.define("Usuario", {
    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    correo_electronico: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,

    es_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    activo: {  // Campo para activar/desactivar el usuario
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},

{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'  
});

export default Usuario; 