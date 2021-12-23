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

  async getTodayStats(uid: string): Promise<object> {
    const user = await this.userService.findOneByUid(uid)
    const token = user.access_token
    const param = new URLSearchParams()
    param.append('token', token)
    param.append('client_secret', process.env.CLIENT_SECRET)
    param.append('start', new Date().toDateString())
    param.append('end', new Date().toDateString())
    param.append('range', 'Today')
    return this.httpService.get("https://wakatime.com/api/v1/users/current/summaries?" + param.toString())
      .pipe(
        map(r => {
          let stats: Stats = new Stats()
          stats.timestamp = Date.now()
          stats.json = JSON.stringify(r.data)
          stats.user = user
          this.statsRepository.save(stats)
          return r.data
        })
      )
  }
}
