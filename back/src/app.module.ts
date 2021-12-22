import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpModule} from "@nestjs/axios";
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import {User} from "./user/user.entity";
import { UserModule } from "./user/user.module";
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
      AuthenticationModule,
      UserModule,
      HttpModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'wakaland',
        entities: [User],
        synchronize: true,
        autoLoadEntities: true
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
