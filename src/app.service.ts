import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './app.entity';
import { CompanyRegister } from './app.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CompanyEntity)
    private CompanyRepo: Repository<CompanyEntity>,
  ) {}

  registerCompany(company: CompanyRegister): Promise<any> {
    return this.CompanyRepo.save({
      businessName: company.businessName,
      uin: company.uin,
      email: company.email,
      fullName: company.fullName,
      mobile: company.mobile,
      position: company.position,
      file: company.file,
    });
  }
  isValidUEN(uen: string): boolean {
    // Check if the input is a string
    if (typeof uen !== 'string') {
      return false;
    }

    // Remove whitespace and convert to uppercase
    uen = uen.replace(/\s/g, '').toUpperCase();

    // Check the length of the UEN
    if (uen.length !== 9 && uen.length !== 10) {
      return false;
    }

    // Validate the UEN format
    const regexOldFormat = /^[0-9]{4}[0-9]{4}[A-Z]$/;
    const regexNewFormat = /^[0-9]{4}[0-9]{5}[A-Z]$/;

    if (!(regexOldFormat.test(uen) || regexNewFormat.test(uen))) {
      return false;
    }

    // Extract the year from the UEN
    const year = parseInt(uen.substring(0, 4));

    // Check if the year is within a valid range (adjust as needed)
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      return false;
    }

    return true;
  }
}
