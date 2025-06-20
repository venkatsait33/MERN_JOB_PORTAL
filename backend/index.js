import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from './routes/company.route.js'
import jobRoutes from './routes/job.route.js'
import applicationRoutes from './routes/application.route.js'
import adminRoutes from './routes/admin.routes.js'
import path from 'path'

// Load environment variables
dotenv.config({});
const app = express();
const PORT = process.env.PORT || 8000;

const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

//✅ CORS Configuration (fixed)
const corsOptions = {
    origin: "*" || 'http://localhost:5173' || "https://job-portal-mern-frontend-zeta.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
}
app.use(cors(corsOptions));

//"localhost:8000/api/v1/user/"

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/admin", adminRoutes)

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.use((req, res) => {
    res.sendFile(path.join(_dirname, 'frontend', 'dist', 'index.html'));
});
  
  

// Test routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/home", (req, res) => {
    res.status(200).json({
        message: "I am coming from backend",
        success: true,
    });
});

// Start server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
