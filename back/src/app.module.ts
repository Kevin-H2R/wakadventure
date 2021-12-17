import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpModule} from "@nestjs/axios";
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, AuthenticationController],
  providers: [AppService, AuthenticationService],
})
export class AppModule {}
