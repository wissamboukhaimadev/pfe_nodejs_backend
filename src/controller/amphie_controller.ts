import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IAmphieData } from "../utils/types/body_data_type"
import { validate_amphie_data } from "../utils/validation/type_validator"


const prisma = new PrismaClient()


export const getAmphi_data = async (req: Request, res: Response) => {
    const amphie_data: IAmphieData[] = await prisma.amphie.findMany()
    res.send(amphie_data)
}

export const insertAmphi_data = async (req: Request, res: Response) => {
    const data: IAmphieData = req.body;
    const valid_data = validate_amphie_data(data)
    if (valid_data) {
        const data_inserted = await prisma.amphie.create({
            data
        })
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}

