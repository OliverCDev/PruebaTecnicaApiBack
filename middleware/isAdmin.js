const isAdmin = (req, res, next) => {

    if(req.user && req.user.es_admin){
        return next();
    }
    res.status(403).json({message: 'No tienes permisos para acceder a esta ruta. '});
};

export default isAdmin;