import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import {Character} from "../entity/Character";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

    async getInfos(request: Request, response: Response, next: NextFunction) {
        const infos = await this.userRepository.createQueryBuilder("user")
                    .innerJoinAndSelect("user.characters", "character")
                    .innerJoinAndSelect("user.activities", "activity")
                    .getMany()


        response.json({})
    }

}