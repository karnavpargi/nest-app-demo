export interface UIN {
  uin: string;
  businessName: string;
}
export interface CompanyRegister extends UIN {
  id?: number;
  fullName: string;
  email: string;
  position: string;
  mobile: string;
  file: string;
}
