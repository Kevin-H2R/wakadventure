import {Controller, Get, Req} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from "express";
import {UserService} from "./user/user.service";

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(@Req() request: Request): object {
    const uid = request.session['uid']
    if (uid === undefined) return null
    return this.userService.findOneByUid(request.session['uid'])
  }
}
