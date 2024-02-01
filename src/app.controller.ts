import {
  Body,
  Controller,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompanyRegister } from './app.interface';
import { AppService } from './app.service';

@Controller('company')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  register(@Body() userData: CompanyRegister): Promise<any> {
    try {
      if (!this.appService.isValidUEN(userData.uin)) {
        throw new HttpException('Invalid UIN number', 500);
      } else {
        return this.appService.registerCompany(userData);
      }
    } catch (error) {
      throw new HttpException(error.message || error, 500);
    }
  }

  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Body() userData: CompanyRegister) {
    // TODO : upload to server pending
    console.log(file, userData);
    return file;
  }
}
