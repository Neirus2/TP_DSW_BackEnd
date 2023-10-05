function checkUserRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      // El usuario tiene el rol requerido, permite el acceso
      next();
    } else {
      // El usuario no tiene el rol requerido, devuelve un error
      res.status(403).json({ message: 'Acceso no autorizado' });
    }
  };
}

module.exports = checkUserRole;