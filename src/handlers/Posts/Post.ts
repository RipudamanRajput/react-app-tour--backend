import prisma from "../../db";

export async function Addpost(req, res) {
    try {
        if (req.body) {
            const data = await prisma.posts.create({
                data: {
                    blocks: req.body.blocks,
                    entityMap: req.body.entityMap
                }
            })
            if (data) {
                res.json({ message: "Sucessfully added " })
            } else {
                res.json({ message: "Some Error Occured" })
            }
        }
    } catch (error) {
        res.json({ message: error, result: false })
    }
}

export async function getallpost(req, res) {
    try {
        const data = await prisma.posts.findMany()
        if (data) {
            res.json({ data })
        } else {
            res.json({ data: [] })
        }
    } catch (error) {
        res.json({ message: error, result: false })
    }
}

export async function getapost(req, res) {
    const id = req.params.id;
    try {
        const data = await prisma.posts.findFirst({
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

export const updateapost = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.posts.findFirst({
            where: {
                id: id
            }
        })
        if (id.length == 24 && data !== null) {
            const data = await prisma.posts.update({
                where: {
                    id
                },
                data: {
                    blocks: req.body.blocks,
                    entityMap: req.body.entityMap
                }
            })
            if (data) {
                res.json({ status: "sucessfully updated", data })
            }
        } else {
            res.json({ message: "kindly provide proper data ", result: false })
        }
    } catch (error) {
        res.json({ message: "something goews wrong", result: false })
    }
}

export const deleteapost = async (req, res) => {
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