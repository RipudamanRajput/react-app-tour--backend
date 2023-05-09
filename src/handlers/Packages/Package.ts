import prisma from "../../db";

// --- add package to db
export const addpackage = async (req, res) => {
    try {
        const find = await prisma.packages.findFirst({
            where: {
                package_name: req.body.package_name,
            }
        })
        if (find != null) {
            res.json({ message: "package already exist", result: false })
        } else {
            if (req.body) {
                await prisma.packages.create({
                    data: {
                        package_name: req.body.package_name,
                        description: req.body.description,
                        location: req.body.location,
                        cost: req.body.cost,
                        hotel: req.body.hotel
                    }
                })
                res.json({ message: "done" })
            } else {
                res.json({ message: "fill mendatory fields", result: false })
            }

        }
    } catch (error) {
        throw new Error(error)
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
                    package_name: req.body.package_name,
                    description: req.body.description,
                    location: req.body.location,
                    cost: req.body.cost,
                    hotel: req.body.hotel
                }
            })
            if (data) {
                res.json({ status: "sucessfully updated", data })
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