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

app.use(cors(
    {
        origin: ['http://localhost:3000', 'https://tour-backend-hxhm.onrender.com','https://ripudamanrajput.github.io', '*'],
        credentials: true,
    }
))
app.use(morgan('dev'))
app.use('/images', express.static(path.join(__dirname, './Uploadmedia')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(cookieParser())
app.use(session({
    key: "user_sid",
    secret: "randomstr",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

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