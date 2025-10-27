import type { GeneralResponse } from '../response';

export type CreateEmployeeRequest = {
  fullName: string;
  email: string;
  position: string;
  department: string;
};

export interface EmployeeDetail {
  id: number;
  fullName: string;
  email: string;
  departmentName: string;
  employmentType: string;
  hireDate: string; // gunakan string karena biasanya dari API berupa ISO date string
}

export type EmployeeResponse = GeneralResponse<EmployeeDetail>;
