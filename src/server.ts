import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const PORT : number = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})

