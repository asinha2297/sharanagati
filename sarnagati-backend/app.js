

const express = require("express"); const cors = require("cors"); const helmet = require("helmet"); const morgan = require("morgan");

const registrationRoutes = require("./routes/registrationRoutes"); const adminRoutes = require("./routes/adminRoutes");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());

app.use( helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }) );

app.use(morgan("combined"));

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/health", (req, res) => { res.status(200).json({ status: "OK" }); });

app.use("/api/registration", registrationRoutes); app.use("/api/admin", adminRoutes);

app.use(errorHandler);

module.exports = app;