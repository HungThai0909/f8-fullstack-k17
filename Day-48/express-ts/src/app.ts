import express from "express";
import indexRouter from "./routes/index.route";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(indexRouter);
app.listen(PORT, () => {
  console.log(`Server running with Port: ${PORT}`);
});
