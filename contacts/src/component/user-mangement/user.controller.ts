import { Body, Controller, Delete, Get, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddDto, DeleteDto, EditDto, ListDto, LoginDto, LogoutDto, SignupDto, UserExistDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }
  @Post("/signup")
  @UsePipes(ValidationPipe)
  async signup(@Body() signupdto: SignupDto): Promise<any> {
    return await this.userService.signup(signupdto)
  }

  @Post('/exist')
  @UsePipes(ValidationPipe)
  async userExist(@Body() signupdto: UserExistDto): Promise<any> {
    return await this.userService.userExist(signupdto)
  }

  @Post("/login")
  @UsePipes(ValidationPipe)
  async login(@Body() logindto: LoginDto): Promise<any> {
    return await this.userService.login(logindto)
  }

  @Post("/logout")
  @UsePipes(ValidationPipe)
  async logout(@Req() req, @Body() logoutdto: LogoutDto): Promise<any> {
    return await this.userService.logout(req, logoutdto)
  }
  @Post("/add")
  @UsePipes(ValidationPipe)
  async add(@Req() req, @Body() adddto: AddDto): Promise<any> {
    return await this.userService.add(req, adddto)
  }
  @Get("/list")
  @UsePipes(ValidationPipe)
  async list(@Query() listdto: ListDto): Promise<any> {
    return await this.userService.list(listdto)
  }

  @Put("/delete")
  @UsePipes(ValidationPipe)
  async delete(@Req() req, @Body() deleteDto: DeleteDto): Promise<any> {
    return await this.userService.delete(req, deleteDto)
  }
  @Put("/edit")
  @UsePipes(ValidationPipe)
  async edit(@Req() req, @Body() editDto: EditDto): Promise<any> {
    return await this.userService.edit(req, editDto)
  }
}
