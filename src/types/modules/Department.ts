import type { GeneralResponse } from '../response';

export interface Department {
  ID: number;
  Name: string;
  CreatedAt: string; // ISO date string
  UpdatedAt: string;
}

export type DepartmentResponse = GeneralResponse<Department[]>;
