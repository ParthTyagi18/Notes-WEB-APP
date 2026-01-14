import dotenv from "dotenv"
import noteRoute from "./routes/noteRoute.js" 
import express from "express"
import {connectDB} from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
import path from "path"

dotenv.config();
const app = express();

const __dirname = path.resolve()

const PORT = process.env.PORT || 5001;

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173"
    }));
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/notes-react-frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/notes-react-frontend/dist", "index.html"))
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT ",PORT);
    });
});