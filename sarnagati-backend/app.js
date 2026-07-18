
require("dotenv").config({ path: require("path").join(__dirname, ".env") });


const express = require("express"); const path = require("path"); const cors = require("cors"); const helmet = require("helmet"); const morgan = require("morgan");

const registrationRoutes = require("./routes/registrationRoutes"); const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"https://sharanagati-frontend-1.onrender.com",
		],
		credentials: true,
	})
);

app.use( helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }) );

app.use(morgan("combined"));

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/health", (req, res) => { res.status(200).json({ status: "OK" }); });

app.use("/api/registration", registrationRoutes); app.use("/api/admin", adminRoutes); app.use("/api", paymentRoutes);

app.use(errorHandler);

module.exports = app;