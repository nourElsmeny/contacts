import { Test, TestingModule } from '@nestjs/testing';
import { HelperService } from '../../config/helper/helper.service';
import { DevicesRepositry } from '../../config/schemas/devices/devices.repositry';
import { UserRepositry } from '../../config/schemas/user/user.repositry';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [ HelperService,UserRepositry,DevicesRepositry],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
