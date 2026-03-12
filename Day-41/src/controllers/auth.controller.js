const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "123456";
const ADMIN_NAME = "Thái Hùng";

const authController = {
  showLogin: (req, res) => {
    const successMsg =
      req.query.logout === "success" ? "Đăng xuất thành công" : "";
    res.render("login", {
      title: "Đăng nhập",
      layout: "layouts/main",
      success_msg: successMsg,
      error_msg: "",
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("error_msg", "Vui lòng nhập đầy đủ thông tin");
      return res.redirect("/login");
    }
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      req.flash("error_msg", "Email hoặc mật khẩu không chính xác");
      return res.redirect("/login");
    }
    req.session.user = { email: ADMIN_EMAIL, name: ADMIN_NAME };
    res.redirect("/");
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect("/");
      }
      res.clearCookie("connect.sid");
      res.redirect("/login?logout=success");
    });
  },
};

module.exports = authController;
