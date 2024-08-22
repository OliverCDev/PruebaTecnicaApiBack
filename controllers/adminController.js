import Proyecto from '../models/Proyecto.js';
import Usuario from '../models/Usuario.js';
import UsuarioProyecto from '../models/UsuarioProyecto.js'; // Relación muchos a muchos

export const getAllProjects = async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll();
        res.json(proyectos);
    } catch (err) {
        console.error('Error al obtener los proyectos:', err);
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (err) {
        console.error('Error al obtener los usuarios:', err);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

export const associateProjectToUsers = async (req, res) => {
    const { projectId } = req.params;
    const { userIds } = req.body; 

    try {
        for (const userId of userIds) {
            await UsuarioProyecto.create({ id_usuario: userId, id_proyecto: projectId });
        }
        res.status(200).json({ message: 'Proyecto asociado a usuarios correctamente' });
    } catch (err) {
        console.error('Error al asociar proyecto a usuarios:', err);
        res.status(500).json({ error: 'Error al asociar proyecto a usuarios' });
    }
};

export const deactivateUser = async (req, res) => {
    const { userId } = req.params;

    try {
        await Usuario.update({ activo: false }, { where: { id_usuario: userId } });
        res.status(200).json({ message: 'Usuario desactivado correctamente' });
    } catch (err) {
        console.error('Error al desactivar el usuario:', err);
        res.status(500).json({ error: 'Error al desactivar el usuario' });
    }
};


export const disableProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        await Proyecto.update({ activo: false }, { where: { id_proyecto: projectId } });
        res.status(200).json({ message: 'Proyecto deshabilitado correctamente' });
    } catch (err) {
        console.error('Error al deshabilitar el proyecto:', err);
        res.status(500).json({ error: 'Error al deshabilitar el proyecto' });
    }
};