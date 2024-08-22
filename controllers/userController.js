import Usuario from '../models/Usuario.js';
import Proyecto from '../models/Proyecto.js';
import bcrypt from 'bcrypt';

export const updateUser = async (req, res) => {
    const { nombre, correo_electronico } = req.body;

    try {
        await Usuario.update(
            { nombre, correo_electronico },
            { where: { id_usuario: req.user.id } }
        );

        res.status(200).json({ message: 'Datos actualizados correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar los datos' });
    }
};

export const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await Usuario.findByPk(req.user.id);
        
        if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
            return res.status(400).json({ message: 'Contraseña actual incorrecta' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Usuario.update(
            { password: hashedPassword },
            { where: { id_usuario: req.user.id } }
        );

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la contraseña' });
    }
};


export const obtenerProyectosUsuario = async (req, res) => {
    const { id_usuario } = req.user; 

    try {
        const proyectos = await Proyecto.findAll({
            include: {
                model: Usuario,
                where: { id_usuario: id_usuario },
                attributes: []
            }
        });

        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los proyectos', error });
    }
};
