import prisma from "../../db";

export const addicludeitem = async (req, res) => {
    try {
        const package_type = await prisma.includesType.findFirst({
            where: {
                include_id: req.body.include_id
            }
        })
        console.log(package_type)
        if (package_type == null) {
            await prisma.includesType.create(
                {
                    data: {
                        include_id: req.body.include_id,
                        title: req.body.title
                    }
                }
            )
            res.json({ message: "Include item type added", result: true })
        } else {
            res.json({ message: "Include item type already exists", result: false })
        }
    } catch (error) {
        console.log(error)

        res.json({ error, result: false })

    }
}

export const geticludeitem = async (req, res) => {
    try {
        const data = await prisma.includesType.findMany();
        if (data) {
            res.json({ data })
        } else {
            res.json({ data: [] })
        }
    } catch (error) {
        res.json({ error, result: false })
    }
}

export const removeicludeitem = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await prisma.includesType.findFirst({
            where: {
                id
            }
        })
        if (data !== null) {
            const data = await prisma.includesType.delete({
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