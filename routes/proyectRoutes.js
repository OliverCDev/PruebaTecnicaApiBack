import { Router } from "express";
import {
    createProject,
    getAllProjects, 
    updateProject,
    disableProyect,
    associateProjectWithUser
} from "../controllers/proyectoController.js";

const router = Router();

router.post('/createNewP', createProject);
router.get('/getAllP', getAllProjects);
router.put('/:id_proyecto', updateProject);
router.put('/:id_proyecto/disable', disableProyect);
router.put('/:id_proyecto/associate', associateProjectWithUser);

export default router;