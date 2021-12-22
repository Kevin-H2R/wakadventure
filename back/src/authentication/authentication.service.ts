import {HttpException, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, lastValueFrom, map, Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {User} from "../user/user.entity";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthenticationService {
  constructor(private httpService: HttpService,
              private userService: UserService) {}

  async authenticate(code : string): Promise<User> {
    const formData = new URLSearchParams()
    formData.append('client_id', 'fdDqMKJwn3Y614MM3MxAFTuK')
    formData.append('client_secret', 'sec_5528B3u4KZlsyEcl72VcRxVziDhXAsXnTIDbroB2qfFtZaUFwCDMUismmow3LPa7s4BjTXZZo1ZLLorR')
    formData.append('redirect_uri', 'http://localhost:8080')
    formData.append('grant_type', 'authorization_code')
    formData.append('code', code)

    const tokenPromise = await lastValueFrom(this.httpService.post("https://wakatime.com/oauth/token", formData))
    // let that = this
    // const insertUser = async function () {
    //   let user: User = new User();
    //   user.uid = tokenPromise.data.uid
    //   user.access_token = tokenPromise.data.access_token
    //   user.expires_at = tokenPromise.data.expires_at
    //   user.refresh_token = tokenPromise.data.refresh_token
    //   return await that.userService.create(user).then(r => {
    //     return r
    //   })
    // }

    return await this.userService.findOneByUid(tokenPromise.data.uid)
      .then(r => {
        if (r !== undefined) {
          return r
        }
        return this.insertUser(tokenPromise.data)
      })
  }

  refresh(refreshToken: string): Observable<AxiosResponse> {
    const formData = new URLSearchParams()
    formData.append('client_id', 'fdDqMKJwn3Y614MM3MxAFTuK')
    formData.append('client_secret', 'sec_5528B3u4KZlsyEcl72VcRxVziDhXAsXnTIDbroB2qfFtZaUFwCDMUismmow3LPa7s4BjTXZZo1ZLLorR')
    formData.append('redirect_uri', 'http://localhost:8080')
    formData.append('grant_type', 'refresh_token')
    formData.append('refresh_token', refreshToken)

    return this.httpService.post("https://wakatime.com/oauth/token", formData)
      .pipe(map(response => response.data))
      .pipe(catchError(e => {
        throw new HttpException(e.response.data, e.response.status)
      }))
  }

  async insertUser(data): Promise<User> {
    let user: User = new User();
    user.uid = data.uid
    user.access_token = data.access_token
    user.expires_at = data.expires_at
    user.refresh_token = data.refresh_token
    return await this.userService.create(user).then(r => {
      return r
    })
  }
}
