const withRoles = (handler, roles) => {
  return async (req, res) => {
    /*
    // Roles in an array
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.',
      });
    }
    */
    //console.log(roles);
    if (roles==='seller' && req.user.isSeller) {
      return handler(req, res);
    } else if (roles === 'sellerOrAdmin' && (req.user.isSeller || req.user.isAdmin)){
      return handler(req, res);
    } else if (roles === 'admin' && req.user.isAdmin) {
      return handler(req, res);
    } else {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.',
      });
    }
    
    
  };
};

export default withRoles;
