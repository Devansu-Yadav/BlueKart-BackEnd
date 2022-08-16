const express = require('express');
const app = express();
const port = 3000;
const { connectDB } = require("./db/db.connect");
const { productsRouter } = require("./routes/products.route");
const { productCategoryRouter } = require("./routes/categories.route");

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/products", productsRouter);
app.use("/api/categories", productCategoryRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});