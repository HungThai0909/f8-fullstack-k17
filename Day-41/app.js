const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  }),
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
const routes = require("./src/routes/index");
app.use("/", routes);

app.listen(3000, () => {
  console.log("Đang chạy với port 3000");
});
