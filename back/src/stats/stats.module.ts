import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import {HttpModule} from "@nestjs/axios";
import {UserModule} from "../user/user.module";

@Module({
  imports: [HttpModule, UserModule],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
