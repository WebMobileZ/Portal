export interface Product {
  reportId?:number;
  name?:Fullname;
  consultatMobileNumber?:number;
  consultantEmail?:string;
  experience?:number;
}

export interface Fullname {
  consultatName?: string;
  consultantLastName?: string;
}
