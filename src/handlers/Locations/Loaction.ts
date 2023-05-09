import prisma from "../../db";

// --- add location to db
export const addlocation = async (req, res) => {
    try {
        const find = await prisma.locations.findFirst({
            where: {
                location_name: req.body.location_name,
            }
        })
        if (find) {
            res.json({ message: "location already exist", result: false })
        } else {
            if (req.body) {
                await prisma.locations.create({
                    data: {
                        location_name: req.body.location_name,
                        description: req.body.description,
                        coordinates: {
                            longitude: req.body.coordinates.longitude,
                            latitude: req.body.coordinates.latitude
                        },
                        active: req.body.active
                    }
                })
                res.json({ message: "done" })
            } else {
                res.json({ message: "fill mendatory fields", result: false })
            }

        }
    } catch (error) {
        // throw new Error(error)
        res.json({ error, result: false })
    }

}

// --- get all location details
export const getlocations = async (req, res) => {
    try {
        const data = await prisma.locations.findMany();
        if (data) {
            res.json({ data })
        } else {
            res.json({ data: [] })
        }
    } catch (error) {
        res.json({ error, result: false })
    }
}

// --- get specific location data 
export const getalocation = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.locations.findFirst({
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

// --- update a specific location data 
export const updatealocation = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.locations.findFirst({
            where: {
                id: id
            }
        })
        if (id.length == 24 && req.body.coordinates.longitude && req.body.coordinates.latitude && data !== null) {
            const data = await prisma.locations.update({
                where: {
                    id
                },
                data: {
                    location_name: req.body.location_name,
                    description: req.body.description,
                    coordinates: {
                        longitude: req.body.coordinates.longitude,
                        latitude: req.body.coordinates.latitude
                    },
                    active: req.body.active
                }
            })
            if (data) {
                res.json({ status: "sucessfully updated", data })
            }
        } else {
            res.json({ message: "kindly provide proper data ", result: false })
        }
    } catch (error) {
        throw new Error(error)
        req.json({ message: "something goews wrong", result: false })
    }
}

// --- delete a specific location data
export const deletealocation = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.locations.findFirst({
            where: {
                id: id
            }
        })
        if (id.length == 24 && data !== null) {
            const data = await prisma.locations.delete({
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