import {Controller, Get, Req} from '@nestjs/common';
import {Request} from "express";
import {StatsService} from "./stats.service";

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get("")
  retrieveStats(@Req() request: Request): object {
    return this.statsService.retrieveYesterdayStats(request.session['uid'])
  }

}
