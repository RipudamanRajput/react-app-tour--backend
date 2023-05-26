import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import router from './router';
import { Optmmatch, createNewUser, generateOTP, resetpass, signin } from './handlers/user';
import { protect, sessionChecker } from './module/auth';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { mailer } from './module/Middleware/expressValidation';
import Mediarouter from './module/Mediarouter';

const app = express();

app.use(morgan())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.enable('trust proxy');
app.use(session({
    name: "user_sid",
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 6000000,
        sameSite: 'none',
        secure: true,
    }
}));

app.use(cors(
    {
        origin: [
            'http://localhost:3000',
            'https://ripudamanrajput.github.io',
            "https://tour-frontend-yqo0.onrender.com",
            '*'],
        credentials: true,
    }
))



app.get('/', (req, res) => {
    res.status(200)
    res.json({ message: "Server" })
})
app.use('/images', express.static(path.join(__dirname, './Uploadmedia')))
app.use('/mailto', mailer)
app.use('/api', sessionChecker, protect, router)
app.use('/user', createNewUser)
app.use('/signin', protect, signin)
app.use('/userupdate', generateOTP)
app.use('/resetpass', Optmmatch, resetpass)
app.use('/media', Mediarouter)

app.use((err, req, res, next) => {
    res.json({ message: "oops Something went wrong" })
})

export default app;
