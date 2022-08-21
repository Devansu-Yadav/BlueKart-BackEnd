const express = require('express');
const app = express();
const { connectDB } = require("./db/db.connect");
const { productsRouter } = require("./routes/products.route");
const { productCategoryRouter } = require("./routes/categories.route");
const { authRouter } = require("./routes/auth.route");
const { userRouter } = require("./routes/user.route");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

connectDB();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use("/api/products", productsRouter);
app.use("/api/categories", productCategoryRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(function (req, res) {
	res.status(404).json({ message: "404 route not found!" });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});