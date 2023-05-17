import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import router from './router';
import { createNewUser, signin } from './handlers/user';
import { protect, sessionChecker } from './module/auth';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

app.use(morgan())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.set("trust proxy", 1);
app.use(session(
    {
        key: "user_sid",
        secret: 'randomstr',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 6000000,
            sameSite: 'lax',
            secure: false 
        }
    }
))

app.use(cors(
    {
        origin: ['http://localhost:3000', 'https://ripudamanrajput.github.io', '*'],
        credentials: true,
    }
))
app.use('/images', express.static(path.join(__dirname, './Uploadmedia')))
app.get('/', (req, res) => {
    res.status(200)
    res.json({ message: "data" })
})

app.use('/api', sessionChecker, protect, router)
app.use('/user', createNewUser)
app.use('/signin', protect, signin)

app.use((err, req, res, next) => {
    console.log(err);
    res.json({ message: "oops Something went wrong" })

})

export default app;
