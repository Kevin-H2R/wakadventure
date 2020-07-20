import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Character} from "../entity/Character"

export class CharacterController {
    private characterRepository = getRepository(Character);

    async create(request: Request, response: Response, next: NextFunction) {
        return this.characterRepository.save(request.body)
    }

    async getInfos(request: Request, response: Response, next: NextFunction) {
        const character = await this.characterRepository.createQueryBuilder('character')
                            .innerJoinAndSelect('character.user', 'user')
                            .innerJoinAndSelect('user.activities', 'activity')
                            .where('character.id = :id', {id: request.body.character_id})
                            .getOne()
        const totalSeconds = character.user.activities.reduce((acc, cur) => {
            return acc + cur.total_seconds
        }, 0)
        response.json({character: character, level: this.computeLevel(totalSeconds)})
    }

    private computeLevel(totalSeconds: number) {
        return Math.floor(Math.sqrt(totalSeconds) / 100 + 1)
    }
}