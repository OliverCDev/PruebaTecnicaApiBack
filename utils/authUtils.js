import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const payload = {
        id: user.id_usuario,
        nombre: user.nombre,
        correo_electronico: user.correo_electronico
    };

    const secret = process.env.JWT_SECRET; 
    const options = { expiresIn: '1h' }; 

    return jwt.sign(payload, secret, options);
};

export default generateToken;