import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { IStage1Data } from "../utils/types/body_data_type"
import { validate_stage_data } from "../utils/validation/type_validator"


const prisma = new PrismaClient()


export const getStage1_data = async (req: Request, res: Response) => {
    const stage1_data: IStage1Data[] = await prisma.stage1.findMany()
    res.send(stage1_data)
}

export const insertStage1_data = async (req: Request, res: Response) => {
    const data: IStage1Data = req.body
    const validate_data = validate_stage_data(data)
    if (validate_data) {
        const data_inserted = await prisma.stage1.create({ data })
        res.send(data_inserted)
    } else {
        res.status(500).send("data type error")
    }
}