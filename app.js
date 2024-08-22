import express from 'express';
import bcrypt from "bcrypt";
import sequelize from './config/database.js';
import authenticateToken from './middleware/auth.js'
import cors from 'cors';

import Usuario from './models/Usuario.js';

import routers from './routes/authRoutes.js';
import proyectRoutes from './routes/proyectRoutes.js';  
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
app.use(cors({
    origin: 'http://localhost:4000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/auth', routers);
app.use('/api/proyectos',authenticateToken, proyectRoutes);
app.use('/api/admin', authenticateToken , adminRoutes);
app.use('/api/user', authenticateToken, userRoutes);

async function createAdminUser() {
    const adminEmail = 'admin@example.com';
    
    const adminUser = await Usuario.findOne({ where: { correo_electronico: adminEmail } });
    
    if (!adminUser) {
        const hashedPassword = await bcrypt.hash('admin_password', 10);
        await Usuario.create({
            nombre: 'Admin',
            correo_electronico: adminEmail,
            password: hashedPassword,
            es_admin: true
        });
        console.log('Usuario administrador creado.');
    }
}

sequelize.sync({force: false }).then(() => {
    console.log("Base de datos sincronizada");
    createAdminUser();

}).catch(err => console.log("Error al sincronizar la base de datos: ", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`);	
});