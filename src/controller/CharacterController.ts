import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Character} from "../entity/Character"

export class CharacterController {
    private characterRepository = getRepository(Character);

    async create(request: Request, response: Response, next: NextFunction) {
        return this.characterRepository.save(request.body)
    }
}