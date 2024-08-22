import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.error('Token inválido:', err);
                return res.status(403).json({ message: 'Token inválido o expirado' }); 
            }

            try {
                const user = await Usuario.findByPk(decoded.id);

                if (!user) {
                    return res.status(404).json({ message: 'Usuario no encontrado' }); 
                }

                req.user = user; 
                next(); 
            } catch (dbErr) {
                console.error('Error al buscar el usuario:', dbErr);
                res.status(500).json({ message: 'Error al buscar el usuario' }); 
            }
        });
    } else {
        res.status(401).json({ message: 'No se proporcionó el token' }); 
    }
};

export default authenticateToken;