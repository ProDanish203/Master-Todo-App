// Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import multer from "multer";
import "express-async-errors";
// Config Imports
import connDb from "./config/db.js";
// Routes Imports
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRouter.js";
import todoRoute from "./routes/todoRoute.js";
// Controllers Imports
import { register } from "./controllers/authController.js";
// Middleware Imports
import errorMiddleware from "./middlewares/errorMiddleware.js";
// Security Imports
import helmet from "helmet";
import xss from "xss-clean";
import expMongoSanitize from "express-mongo-sanitize";
import path from "path";
import { fileURLToPath } from "url";


// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// .env config
dotenv.config();

// Database connection
connDb()

// Initializing the app
const app = express();

// Using middlewares for app
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(xss());
app.use(expMongoSanitize());
app.disable('x-powered-by')


app.use("", express.static(path.join(__dirname, '')));

// Routes

const upload = multer({dest: "uploads"});

app.post("/api/v1/auth/register", upload.single("picture"), register);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v2/todo", todoRoute);


// Validation middleware
app.use(errorMiddleware);

// Defining the port
const port = process.env.PORT;
// Listening on port
app.listen(port, () => {
    console.log(`Server is listening live on port:${port}`)
})