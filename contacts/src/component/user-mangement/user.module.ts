import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperService } from 'src/config/helper/helper.service';
import { ContactsRepositry } from 'src/config/schemas/contacts/contacts.repositry';
import { DevicesRepositry } from 'src/config/schemas/devices/devices.repositry';
import { UserRepositry } from 'src/config/schemas/user/user.repositry';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports:[TypeOrmModule.forFeature([DevicesRepositry,UserRepositry, ContactsRepositry])],
    controllers: [UserController],
    providers: [UserService,HelperService]
})
export class UserModule {}
