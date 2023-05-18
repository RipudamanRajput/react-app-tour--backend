import prisma from "../../db";

// --- add hotel to db
export const addhotel = async (req, res) => {
    try {
        const { hotel_name, location, description, rating, single, double } = JSON.parse(req.body.data)
        const find = await prisma.hotels.findFirst({
            where: {
                hotel_name: hotel_name,
                location: location,
            }
        })
        let ar = [];
        req.files.forEach((item: any) => {
            ar.push({ src: `http://localhost:3001/images/${item.filename}` })
        })
        if (find) {
            res.json({ message: "hotel already exist", result: false })
        } else {
            if (hotel_name && rating) {
                await prisma.hotels.create({
                    data: {
                        hotel_name: hotel_name,
                        description: description,
                        location: location,
                        rating: rating,
                        single: single,
                        double: double,
                        images: ar
                    }
                })
                res.json({ message: "done" })
            } else {
                res.json({ message: "fill mendatory fields", result: false })
            }
        }
    } catch (error) {
        res.json({ error, result: false })
    }

}

// --- get all hotel details
export const gethotels = async (req, res) => {
    
    try {
        const data = await prisma.hotels.findMany();
        if (data) {
            res.json({ data })
        } else {
            res.json({ data: [] })
        }
    } catch (error) {
        res.json({ error, result: false })
    }
}

// --- get specific hotel data 
export const getahotel = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.hotels.findFirst({
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
        res.json({ error, result: false })
    }
}

// --- update a specific hotel data 
export const updateahotel = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.hotels.findFirst({
            where: {
                id: id
            }
        })
        if (id.length == 24 && data !== null) {
            const data = await prisma.hotels.update({
                where: {
                    id
                },
                data: {
                    hotel_name: req.body.hotel_name,
                    description: req.body.description,
                    location: req.body.location,
                    rating: req.body.rating,
                    single: req.body.single,
                    double: req.body.double
                }
            })
            if (data) {
                res.json({ status: "sucessfully updated", data })
            }
        } else {
            res.json({ message: "kindly provide proper id ", result: false })
        }
    } catch (error) {
        req.json({ message: "something goews wrong", result: false })
    }
}

// --- delete a specific hotel data
export const deleteahotel = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.hotels.findFirst({
            where: {
                id: id
            }
        })
        if (id.length == 24 && data !== null) {
            const data = await prisma.hotels.delete({
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
        req.json({ message: "something goews wrong", result: false })
    }
}