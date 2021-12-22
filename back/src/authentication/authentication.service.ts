import {HttpException, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, map, Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {User} from "../user/user.entity";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthenticationService {
  constructor(private httpService: HttpService,
              private userService: UserService) {}

  authenticate(code : string): Observable<AxiosResponse> {
    const formData = new URLSearchParams()
    formData.append('client_id', 'fdDqMKJwn3Y614MM3MxAFTuK')
    formData.append('client_secret', 'sec_5528B3u4KZlsyEcl72VcRxVziDhXAsXnTIDbroB2qfFtZaUFwCDMUismmow3LPa7s4BjTXZZo1ZLLorR')
    formData.append('redirect_uri', 'http://localhost:8080')
    formData.append('grant_type', 'authorization_code')
    formData.append('code', code)

    return this.httpService.post("https://wakatime.com/oauth/token", formData)
      .pipe(
        map(response => {
          this.userService.findOneByUid(response.data.uid)
            .then(r => {
              if (r !== undefined) {
                return response.data
              }
              let user: User = new User();
              user.uid = response.data.uid
              user.access_token = response.data.access_token
              user.expires_at = response.data.expires_at
              user.refresh_token = response.data.refresh_token
              this.userService.create(user).then(r => {
                console.log(r)
              })
            })
          return response.data
        })
      )
      .pipe(catchError(e => {
        throw new HttpException(e.response.data, e.response.status)
      }))
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
}
