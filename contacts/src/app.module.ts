import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './component/user-mangement/user.controller';
import { UserService } from './component/user-mangement/user.service';
import { UserModule } from './component/user-mangement/user.module';
import { HelperService } from './config/helper/helper.service';
import { AuthUserMiddleware } from './config/auth/auth-user.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database-config/typeOrm.config';
import { DevicesRepositry } from './config/schemas/devices/devices.repositry';
import { UserRepositry } from './config/schemas/user/user.repositry';
import { ContactsRepositry } from './config/schemas/contacts/contacts.repositry';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([DevicesRepositry,UserRepositry, ContactsRepositry]),
    UserModule],
  controllers: [AppController,UserController],
  providers: [AppService, UserService, HelperService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthUserMiddleware)
      .forRoutes("user/add","user/delete");

  }
}
