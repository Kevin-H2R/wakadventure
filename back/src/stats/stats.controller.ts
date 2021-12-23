import {Controller, Get, Post, Req} from '@nestjs/common';
import {Request} from "express";
import {StatsService} from "./stats.service";
import {Observable} from "rxjs";

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Post("")
  getStats(@Req() request: Request): object {
    return this.statsService.getAllTimeStats(request.body['uid'])
  }

}
