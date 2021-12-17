import {Controller, Get, Post, Req} from '@nestjs/common';
import {Request} from "express";

@Controller('authentication')
export class AuthenticationController {
    @Post()
    authenticate(@Req() request: Request): object {
        return {salut: 'coucou'}
    }
}
