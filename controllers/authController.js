import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import generateToken from '../utils/authUtils.js';

export const register = async(req, res)=> {
    try {
        const {nombre, correo_electronico, password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await Usuario.create({nombre, correo_electronico, password: passwordHash});  
        res.status(201).json({message: `Se creo el usuario correctamente: ${newUser.nombre}`});
    } catch(error){
        res.status(500).json({error: 'Error al registrar el usuario'});
        }
}

export const login = async(req, res)=> {
    const {correo_electronico, password} = req.body;
    
    try{
        const user = await Usuario.findOne({where: {correo_electronico}});
        
        if(!user){
            return res.status(401).json({error: 'Usuario no encontrado'});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = generateToken(user);
        res.json({token});
    }catch(error){
        res.status(500).json({error: 'Error al iniciar sesión'});
    }

}

export const getMe = async (req, res) => {
    try {
        const user = req.user; 

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { password, ...userData } = user.toJSON();
        
        res.json(userData);
    } catch (err) {
        console.error('Error al obtener la información del usuario:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

