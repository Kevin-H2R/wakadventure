import {Controller, Post, Req} from '@nestjs/common';
import {Request} from "express";
import {AuthenticationService} from "./authentication.service";

@Controller('authentication')
export class AuthenticationController {
    constructor(private authService: AuthenticationService) {}

    @Post()
    authenticate(@Req() request: Request): object {
        const t = this.authService.authenticate(request.body['code'])
        return t
    }
}
