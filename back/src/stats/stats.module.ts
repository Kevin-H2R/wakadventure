import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import {HttpModule} from "@nestjs/axios";
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Stats} from "./stats.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Stats]), HttpModule, UserModule],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
