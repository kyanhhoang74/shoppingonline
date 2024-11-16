const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const customerRouter = require("./router/CustomerRouter");
const productsRouter = require("./router/ProductsRouter");
const categoriesRouter = require("./router/CategoriesRouter");
const adminRouter = require("./router/AdminRouter");
const ordersRouter = require("./router/OrdersRouter");

dotenv.config({ path: "./config.env" });
const connect = require("./db/connection");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/customer", customerRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/admin", adminRouter);
app.use("/api/oders", ordersRouter);

const port = process.env.PORT || 8080;

connect
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server is runing on PORT: ${port}`);
    });
  })
  .catch((err) => {
    console.log(`DB erro: ${err}`);
  });
