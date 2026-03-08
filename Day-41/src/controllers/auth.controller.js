const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "123456";
const ADMIN_NAME = "Thái Hùng";

const authController = {
  showLogin: (req, res) => {
    const successMsgArr = req.flash("success_msg");
    const successMsg = successMsgArr.length > 0 ? successMsgArr[0] : "";
    const errorMsgArr = req.flash("error_msg");
    const errorMsg = errorMsgArr.length > 0 ? errorMsgArr[0] : "";
    res.render("login", {
      title: "Đăng nhập",
      layout: "layouts/main",
      success_msg: successMsg,
      error_msg: errorMsg,
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("error_msg", "Vui lòng nhập đầy đủ thông tin");
      return res.redirect("/dang-nhap");
    }
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      req.flash("error_msg", "Email hoặc mật khẩu không chính xác");
      return res.redirect("/dang-nhap");
    }
    req.session.user = { email: ADMIN_EMAIL, name: ADMIN_NAME };
    res.redirect("/");
  },
  logout: (req, res) => {
    req.session.user = null;
    req.flash("success_msg", "Đăng xuất thành công");
    res.redirect("/dang-nhap");
  },
};

module.exports = authController;
