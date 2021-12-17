import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Observable} from "rxjs";
import {AxiosResponse} from "axios";

@Injectable()
export class AuthenticationService {
    constructor(private httpService: HttpService) {}

    authenticate(): Observable<AxiosResponse> {
        return this.httpService.post("")
    }
}
