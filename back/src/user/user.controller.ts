import {Controller, Get, Post, Req} from '@nestjs/common';
import { UserService } from './user.service';
import {Request} from "express";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getHello(): string {
        return "";
    }

    @Post("/username")
    setUsername(@Req() request: Request): Promise<boolean> {
        return this.userService.setUsername(
          request.body['uid'],
          request.body['username']
        )
    }
}
