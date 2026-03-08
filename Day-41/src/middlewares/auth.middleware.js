const authMiddleware = {
  requireLogin: (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    }
    return res.redirect("/dang-nhap");
  },
  requireGuest: (req, res, next) => {
    if (!req.session || !req.session.user) {
      return next();
    }
    return res.redirect("/");
  },
};

module.exports = authMiddleware;
