import prisma from "../../db";

// ------------ sports
export async function addspot(req: any, res: any) {

    try {
        const find = await prisma.sports.findFirst({
            where: {
                value: req.body.value
            }
        })
        if (find == null) {
            await prisma.sports.create({
                data: {
                    label: req.body.label,
                    value: req.body.value,
                    island: req.body.island,
                    Beach: req.body.Beach
                }
            })
            res.json({ mssage: "Sport Added", result: true })
        } else {
            res.json({ message: "Sport is already added", result: false })
        }
    } catch (error) {
        res.json({ error: error, result: false })

    }

}

export async function getsports(req: any, res: any) {
    try {
        const data = await prisma.sports.findMany();
        if (data) {
            res.json(data)
        } else {
            res.json([])
        }
    } catch (error) {
        res.json({ error: error, result: false })
    }
}

export async function deletesport(req, res) {
    const id = req.params.id;
    try {
        const data = await prisma.sports.findFirst({
            where: {
                id: id
            }
        })
        if (id.length == 24 && data !== null) {
            const data = await prisma.sports.delete({
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
        req.json({ message: "something goes wrong", result: false })
    }
}

// ------------ Islands
export async function addislands(req: any, res: any) {
    try {
        const find = await prisma.islandsplaces.findFirst({
            where: {
                value: req.body.value
            }
        })
        if (find == null) {
            await prisma.islandsplaces.create({
                data: {
                    label: req.body.label,
                    value: req.body.value
                }
            })
            res.json({ mssage: "Island Added", result: true })
        } else {
            res.json({ message: "Island is already added", result: false })
        }
    } catch (error) {
        res.json({ error: error, result: false })

    }

}

export async function getislands(req: any, res: any) {
    try {
        const data = await prisma.islandsplaces.findMany();
        if (data) {
            res.json(data)
        } else {
            res.json([])
        }
    } catch (error) {
        res.json({ error: error, result: false })
    }
}

export async function deleteisland(req, res) {
    const id = req.params.id;
    try {
        const data = await prisma.islandsplaces.findFirst({
            where: {
                id: id
            }
        })
        if (id.length == 24 && data !== null) {
            const data = await prisma.islandsplaces.delete({
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
        req.json({ message: "something goes wrong", result: false })
    }
}

// ------------ Beaches
export async function addbeaches(req: any, res: any) {
    try {
        const find = await prisma.beachesplaces.findFirst({
            where: {
                value: req.body.value
            }
        })
        if (find == null) {
            await prisma.beachesplaces.create({
                data: {
                    label: req.body.label,
                    value: req.body.value,
                    island: req.body.island,
                }
            })
            res.json({ mssage: "Beach Added", result: true })
        } else {
            res.json({ message: "Beach is already added", result: false })
        }
    } catch (error) {
        res.json({ error: error, result: false })

    }

}

export async function getBeachs(req: any, res: any) {
    try {
        const data = await prisma.beachesplaces.findMany();
        if (data) {
            res.json(data)
        } else {
            res.json([])
        }
    } catch (error) {
        res.json({ error: error, result: false })
    }
}

export async function deletebeach(req, res) {
    const id = req.params.id;
    try {
        const data = await prisma.beachesplaces.findFirst({
            where: {
                id: id
            }
        })
        if (id.length == 24 && data !== null) {
            const data = await prisma.beachesplaces.delete({
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
        req.json({ message: "something goes wrong", result: false })
    }
}