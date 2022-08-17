const express = require('express');
const app = express();
const port = 3000;
const { connectDB } = require("./db/db.connect");
const { productsRouter } = require("./routes/products.route");
const { productCategoryRouter } = require("./routes/categories.route");
const { authRouter } = require("./routes/auth.route");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use("/api/products", productsRouter);
app.use("/api/categories", productCategoryRouter);
app.use("/api/auth", authRouter);

app.use(function (req, res) {
	res.status(404).json({ message: "404 route not found!" });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});