import express from 'express';
import { updateUser, updatePassword ,obtenerProyectosUsuario } from '../controllers/userController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.put('/actualizarUsuario', authenticateToken, updateUser);
router.put('/actualizarPassword', authenticateToken, updatePassword);
router.get('/proyectos', authenticateToken, obtenerProyectosUsuario);

export default router;
