import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { authFirebase } from 'src/configs/firebase.config';
import { getAuth } from 'firebase/auth';
import { FirebaseAdminService } from 'src/utils/firebase.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,

  ) {}
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const ret = await this.authService.login(body);
    res.setHeader('Authorization', 'Bearer ' + ret.token);
    return res.json(ret.data);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const ret = await this.authService.register(body);

    return {
      message: 'Thanh cong',
    };
  }

  @Get('fetch-user')
  @UseGuards(AuthGuard)
  fetchData(@Req() req) {
    // --- có được token ---> parse --> userId --> findPk
    if (req?.userId) {
    }
    console.log(12111, req);
  }

  @Get('login-firebase')
  async loginFirebase(@Req() req: Request) {
    const token = req.headers['authorization'] as string;

    console.log(1111111, token);
    

    const decodedToken = await this.authService.verifyToken(token);
   
    return decodedToken;

  }

  @Get('fetch-firebase')
  async fetchFirebase(@Req() req: Request) {
   



  }
}
