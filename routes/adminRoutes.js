import express from 'express';
import authenticateToken from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import {
    getAllProjects,
    getAllUsers,
    associateProjectToUsers,
    deactivateUser,
    disableProject
} from '../controllers/adminController.js';

const router = express.Router();


router.use(authenticateToken);


router.get('/projects',isAdmin, getAllProjects);

router.get('/users',isAdmin, getAllUsers);

router.post('/projects/:projectId/users', isAdmin ,associateProjectToUsers);

router.delete('/users/:userId', isAdmin,deactivateUser);

router.delete('/projects/:projectId',isAdmin , disableProject);

export default router;

