import prisma from "../../db";

// --- add package to db
export const addpackage = async (req, res) => {
    const { package_type, duration, title, price, discount_type, discount_value, Final_price, includes, itineraries, } = JSON.parse(req.body.data)
    const ar = [];
    itineraries.forEach((item, index) => {
        ar.push({
            title: item.title,
            description: item.description,
            activities: Activityimages(item.activities)
        })
    })
    function Activityimages(data) {
        const arr = [];
        data.forEach((item, index) => {
            arr.push({
                // images: item.images !== "" ? item.images : `${process.env.PORT}/images/${item.activitie_name.replace(/ /g, '_')}_${index}.png`,
                images: !Object.keys(item).includes("images") ?
                    "https://tour-backend-ddw8.onrender.com/images/dsfdsf_0.png" :
                    item.images != "" ?
                        item.images :
                        `${process.env.PORT}/images/${item.activitie_name.replace(/ /g, '_')}_${index}.png`,
                activitie_name: item.activitie_name,
                description: item.description,
                location: item.location,
                timings: item.timings,
            })

        })
        return arr;
    }

    try {
        const find = await prisma.packages.findFirst({
            where: {
                title,
            }
        })
        if (find != null) {
            res.json({ message: "package already exist", result: false })
        } else {
            if (req.body.data) {
                await prisma.packages.create({
                    data: {
                        package_type: package_type,
                        duration: duration,
                        title: title,
                        price: price,
                        discount_type: discount_type,
                        discount_value: discount_value,
                        Final_price: Final_price,
                        // description: req.body.description,
                        // overview: req.body.overview,
                        includes: includes,
                        itineraries: ar
                    }
                })
                res.json({ message: "done" })
            } else {
                res.json({ message: "fill mendatory fields", result: false });
            }

        }
    } catch (error) {
        // throw new Error(error)
        res.json({ error, result: false })
    }

}

// --- get all package details
export const getpackages = async (req, res) => {
    try {
        const data = await prisma.packages.findMany();
        if (data) {
            res.json({ data })
        } else {
            res.json({ data: [] })
        }
    } catch (error) {
        res.json({ error, result: false })
    }
}

// --- get specific package data 
export const getapackage = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.packages.findFirst({
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

// --- update a specific package data 
export const updateapackage = async (req, res) => {
    const id = req.params.id;
    const { package_type, duration, title, price, discount_type, discount_value, Final_price, includes, itineraries } = JSON.parse(req.body.data)
    const ar = [];
    itineraries.forEach((item, index) => {

        ar.push({
            title: item.title,
            description: item.description,
            activities: Activityimages(item.activities)
        })
    })
    function Activityimages(data) {
        const arr = [];
        data.forEach((item, index) => {
            arr.push({
                images: !Object.keys(item).includes("images") ?
                    "https://tour-backend-ddw8.onrender.com/images/dsfdsf_0.png" :
                    item.images != "" ?
                        item.images :
                        `${process.env.PORT}/images/${item.activitie_name.replace(/ /g, '_')}_${index}.png`,
                activitie_name: item.activitie_name,
                description: item.description,
                location: item.location,
                timings: item.timings,
            })

        })
        return arr;
    }
    try {
        const data = await prisma.packages.findFirst({
            where: {
                id: id
            }
        })
        if (id.length == 24 && data !== null) {
            const data = await prisma.packages.update({
                where: {
                    id
                },
                data: {
                    package_type: package_type,
                    duration: duration,
                    title: title,
                    price: price,
                    discount_type: discount_type,
                    discount_value: discount_value,
                    Final_price: Final_price,
                    // description: req.body.description,
                    // overview: req.body.overview,
                    includes: includes,
                    itineraries: ar
                }
            })
            if (data) {
                res.json({ status: "sucessfully updated", data })
                // res.json(req.body.data)
            }
        } else {
            res.json({ message: "kindly provide proper data ", result: false })
        }
    } catch (error) {
        // throw new Error(error)
        req.json({ message: "something goews wrong", result: false })
    }
}

// --- delete a specific package data
export const deleteapackage = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.packages.findFirst({
            where: {
                id: id
            }
        })
        if (id.length == 24 && data !== null) {
            const data = await prisma.packages.delete({
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