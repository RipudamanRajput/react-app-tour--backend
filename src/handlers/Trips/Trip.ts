import prisma from "../../db";

export async function Addtrip(req, res) {
    try {
        if (req.body) {
            const data = await prisma.mytrip.create({
                data: {
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                    date: req.body.date,
                    number_of_days: req.body.number_of_days,
                    adults: req.body.adults,
                    big_childs: req.body.big_childs,
                    small_childs: req.body.small_childs,
                    hotel_type: req.body.hotel_type,
                    ac_non_Ac: req.body.ac_non_Ac,
                    No_of_Rooms: req.body.No_of_Rooms,
                    water_sports: req.body.water_sports,
                    islands: req.body.islands,
                    beaches: req.body.beaches
                }
            })
            if (data) {
                res.json({ message: "Sucessfully send " })
            } else {
                res.json({ message: "kindly fill all the fields" })
            }
        }
    } catch (error) {
        res.json({ message: error, result: false })
    }
}

export async function getallquery(req, res) {
    try {
        const data = await prisma.mytrip.findMany()
        if (data) {
            res.json({ data })
        } else {
            res.json({ data: [] })
        }
    } catch (error) {
        res.json({ message: error, result: false })
    }
}

export async function getaquery(req, res) {
    const id = req.params.id;
    try {
        const data = await prisma.mytrip.findFirst({
            where: {
                id: id
            }
        })
        if (data) {
            res.json({ data })
        } else {
            res.json({ data: [] })
        }
    } catch (error) {
        res.json({ message: error, result: false })
    }
}

export const deleteaquery = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.mytrip.findFirst({
            where: {
                id: id
            }
        })
        if (id.length == 24 && data !== null) {
            const data = await prisma.mytrip.delete({
                where: {
                    id
                }
            })
            if (data) {
                res.json({ status: "sucessfully deleted", data })
            }
        } else {
            res.json({ message: "kindly provide proper id ", result: false })
        }
    } catch (error) {
        // throw new Error(error)
        req.json({ message: "something goes wrong", result: false })
    }
}