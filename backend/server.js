import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from 'express-session'
import onestore from './api/onestore.route.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express();

const corsOptions= {
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
    allowedHeader:['X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept']
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 60*60*1000}
})) 
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('image')); 
app.use("/api/v1/onestore", onestore);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;