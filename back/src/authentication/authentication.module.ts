import { Module } from '@nestjs/common';
import {AuthenticationController} from "./authentication.controller";
import {AuthenticationService} from "./authentication.service";
import {HttpModule} from "@nestjs/axios";
import {UserModule} from "../user/user.module";

@Module({
    imports: [HttpModule, UserModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationModule {}
