import Proyecto from "../models/Proyecto.js";
import UsuarioProyecto from "../models/UsuarioProyecto.js";

export const createProject = async(req, res)=> {   
    try {
        const newProject = await Proyecto.create(req.body);
        res.status(201).json({ "message" : "Se creo el proyecto correctamente", newProject });
    } catch(error){
        res.status(500).json({error: 'Error al crear el proyecto'});
    }
};

export const getAllProjects = async(req, res)=> {  
    try {
        const projects = await Proyecto.findAll();
        res.json(projects);
    } catch(error){
        res.status(500).json({error: 'Error al obtener los proyectos'});
    }
};

export const updateProject = async(req, res)=> {
    try {
        const {id_proyecto } = req.params;
        const updateProject = await Proyecto.update(req.body, {where: {id_proyecto}});
        res.json({"message": "Se actualiza correctamente el proyecto"})
    } catch(error){
        res.status(500).json({error: 'Error al actualizar el proyecto'});
    }
};

export const disableProyect = async(req, res)=> {
    try{
        const {id_proyecto} = req.params;
        await Proyecto.update({activo: false}, {where: {id_proyecto}});
        res.json({message: 'Proyecto deshabilitado. '});
        
    }catch(error){
        res.status(500).json({error: 'Error al deshabilitar el proyecto'});
    }

};

export const associateProjectWithUser = async(req, res)=> {
    try{
        const {id_proyecto} = req.params;  
        const {id_usuario} = req.body; 
        const associations = id_usuario.map(id_usuario => {
            return UsuarioProyecto.create({id_proyecto, id_usuario});
        });
        await Promise.all(associations);
        res.json({message : 'Proyecto asociado al usuario'});

    }catch(error){
        res.status(500).json({ error : 'Error al asociar el proyecto.' });
    }

};