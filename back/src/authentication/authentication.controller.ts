import {Controller, Post, Req} from '@nestjs/common';
import {Request} from "express";
import {AuthenticationService} from "./authentication.service";

@Controller('authentication')
export class AuthenticationController {
    constructor(private authService: AuthenticationService) {}

    @Post()
    async authenticate(@Req() request: Request): Promise<object> {
        const t = await this.authService.authenticate(request.body['code'])
        request.session['uid'] = t['uid']
        return t
    }
}
