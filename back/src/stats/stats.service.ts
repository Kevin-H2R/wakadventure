import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";
import {UserService} from "../user/user.service";

@Injectable()
export class StatsService {
  constructor(private httpService: HttpService, private userService: UserService) {}

  async getAllTimeStats(uid: string): Promise<object> {
    const token = await this.userService.getToken(uid)
    const param = new URLSearchParams()
    param.append('token', token)
    param.append('client_secret', process.env.CLIENT_SECRET)
    return this.httpService.get("https://wakatime.com/api/v1/users/current/all_time_since_today?" + param.toString())
      .pipe(map(r => r.data)
    )
  }
}
