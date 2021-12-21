import {Controller, Post, Req} from '@nestjs/common';
import {Request} from "express";
import {AuthenticationService} from "./authentication.service";

@Controller('authentication')
export class AuthenticationController {
    constructor(private authService: AuthenticationService) {}

    @Post()
    authenticate(@Req() request: Request): object {
        return this.authService.authenticate(request.body['code'])
    }
}
