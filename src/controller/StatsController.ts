import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Stats} from "../entity/Stats"

export class StatsController {
    private statsRepository = getRepository(Stats);

    async create(request: Request, response: Response, next: NextFunction) {
        return this.statsRepository.save(request.body)
    }
}