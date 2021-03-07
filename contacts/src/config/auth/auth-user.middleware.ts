import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from '../../config/helper/helper.service';
import { DevicesRepositry } from '../../config/schemas/devices/devices.repositry';
import { UserRepositry } from '../../config/schemas/user/user.repositry';

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
  constructor(
    private helperService: HelperService,
    @InjectRepository(DevicesRepositry)
    private deviceRepositry: DevicesRepositry,
    @InjectRepository(UserRepositry)
    private userRepositry: UserRepositry,
  ) { }

  async use(req: any, res: any, next: () => void) {
    const user = await this.userRepositry.findOne({
      userToken: req.body.token
    });
    if (!user)
      throw new HttpException("You don't have authority to access this page.", HttpStatus.UNAUTHORIZED);
    const fingerprint = await this.helperService.generateHash(req.body.fingerPrint);

    const data = {
      fingerPrint: fingerprint,
      userId: user.userId,
      token: req.body.token
    }

    const tokenDecript = await this.helperService.Decrept(data);

    if (!tokenDecript)
      throw new HttpException("You don't have authority to access this page.", HttpStatus.UNAUTHORIZED);

    req.me = user;

    next();
  }
}
