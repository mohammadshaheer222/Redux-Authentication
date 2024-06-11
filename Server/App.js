const express = require("express");
const app = express();
require("dotenv").config({ path: "Config/.env" });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );

//routes
const userRoute = require("./Routes/userRouter");
app.use("/api/v2/users", userRoute);

//for error handling
const notFound = require("./Middlewares/notFound");
const ErrorMiddleware = require("./Middlewares/Error");

app.use(notFound);
app.use(ErrorMiddleware);

//connection
const { connectDatabase } = require("./Db/connect");
connectDatabase();

//server creation
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
