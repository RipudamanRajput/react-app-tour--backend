import { Prisma } from "@prisma/client";
import prisma from "../db";
import { comaprepasswords, createJWT, hashpassword } from "../module/auth";
import nodemailer from 'nodemailer';


export const createNewUser = async (req: any, res: any) => {
    const detail: Prisma.UsersCreateInput[] | Prisma.UsersUncheckedCreateInput[] | any = {
        username: req.body.username
    }
    const usercheck = await prisma.users.findUnique({
        where: detail
    })

    if (usercheck) {
        res.json({ message: "user alredy exist" })
        return
    }

    let users: Prisma.UsersCreateInput[] | Prisma.UsersUncheckedCreateInput[] | any =
    {
        username: req.body.username,
        password: await hashpassword(req.body.password)
    }

    const user = await prisma.users.create({
        data: users,
    })

    const token = createJWT(user)
    res.json({ token })
}

export const signin = async (req: any, res: any) => {
    try {
        const user = await prisma.users.findUnique({
            where: { username: req.body.username }
        })

        if (user == null) {
            res.status(401)
            res.json({ message: "Username Does not Exist !" })
            return
        }

        const isValid = await comaprepasswords(req.body.password, user.password)

        if (!isValid) {
            res.status(401)
            res.json({ message: "Wrong username & password !" })
            return
        }

        req.session.user = user;
        const token = createJWT(user)
        const { id, username } = user;
        res.json({ id, username, token })
    } catch (error) {
        res.json({ error })
    }
}

export const generateOTP = async (req: any, res: any) => {
    try {
        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_GMAIL,
                pass: process.env.ADMIN_GMAILPASS
            }
        });

        const OTP = Math.floor(1000 + Math.random() * 9000);
        req.session.OTP = OTP;
        var mailOptions = {
            from: process.env.ADMIN_GMAIL,
            to: req.body.email,
            subject: "testing message",
            text: "hi there :" + OTP
        };

        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.json({ error: err })
            } else {
                res.json({ data: "OTP send to " + req.body.email })
            }
        })
    } catch (error) {
        res.json({ error, result: false })
    }
}

export const Optmmatch = async (req: any, res: any, next) => {
    if (req.session.OTP == req.body.OTP) {
        next()
    } else {
        res.json({ message: "OTP is Incorrect ", result: false })
    }
}

export const resetpass = async (req: any, res: any) => {
    try {
        const uname = await prisma.users.findUnique({
            where: { username: req.body.username }
        })
        if (uname !== null) {
            let users: Prisma.UsersCreateInput[] | Prisma.UsersUncheckedCreateInput[] | any =
            {
                username: req.body.username,
                password: await hashpassword(req.body.password)
            }
            const user = await prisma.users.update({
                where: { username: req.body.username },
                data: users,
            })
            res.json(user);
        } else {
            res.json({ message: "User does not exist with this username ", result: false })
        }
    } catch (error) {
        res.json({ error, result: false })
    }
}