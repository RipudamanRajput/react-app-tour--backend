import prisma from "../../db";

export const addpackagestype = async (req, res) => {
    try {
        const package_type = await prisma.packageType.findFirst({
            where: {
                label: req.body.label
            }
        })
        if (package_type == null) {
            await prisma.packageType.create(
                {
                    data: {
                        label: req.body.label,
                        value: req.body.value
                    }
                }
            )
            res.json({ message: "Package type added", result: true })
        } else {
            res.json({ message: "Package type already exists", result: false })
        }
    } catch (error) {
        res.json({ error, result: false })

    }
}

export const getallproducttype = async (req, res) => {
    try {
        const data = await prisma.packageType.findMany();
        if (data) {
            res.json({ data })
        } else {
            res.json({ data: [] })
        }
    } catch (error) {
        res.json({ error, result: false })
    }
}

export const deleteproducttype = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.packageType.findFirst({
            where: {
                id
            }
        })
        if (data !== null) {
            const data = await prisma.packageType.delete({
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