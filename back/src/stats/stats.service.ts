import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";
import {UserService} from "../user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Stats} from "./stats.entity";

@Injectable()
export class StatsService {
  constructor(private httpService: HttpService,
              private userService: UserService,
              @InjectRepository(Stats)
              private statsRepository: Repository<Stats>
              ) {}

  async retrieveYesterdayStats(uid: string): Promise<object> {
    const user = await this.userService.findOneByUid(uid)
    const token = user.access_token
    const param = new URLSearchParams()
    param.append('token', token)
    param.append('client_secret', process.env.CLIENT_SECRET)
    param.append('start', new Date().toDateString())
    param.append('end', new Date().toDateString())
    param.append('range', 'Yesterday')
    return this.httpService.get("https://wakatime.com/api/v1/users/current/summaries?" + param.toString())
      .pipe(
        map(r => {
          let stats: Stats = new Stats()
          console.log(Date.now())
          stats.timestamp = (Date.now() - 24*60*60*1000).toString()
          stats.json = JSON.stringify(r.data)
          stats.user = user
          this.statsRepository.save(stats)
          return r.data
        })
      )
  }
}
