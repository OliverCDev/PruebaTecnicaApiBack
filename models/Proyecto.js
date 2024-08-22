import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Proyecto = sequelize.define("Proyecto", {
    id_proyecto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_proyecto: DataTypes.STRING,
    fecha_inicio: DataTypes.DATE,   
    fecha_fin: DataTypes.DATE,  
    descripcion: DataTypes.STRING,  
    objetivos: DataTypes.STRING,    
    departamento_ejecucion : DataTypes.STRING,
    monto_ejecucion: DataTypes.DECIMAL(15,2),
    activo: {  
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'  
});

export default Proyecto;
