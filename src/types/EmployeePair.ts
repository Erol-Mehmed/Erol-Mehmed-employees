import type {EmployeeOverlap} from "./EmployeeOverlap.ts";

export interface EmployeePair {
  empId1: string;
  empId2: string;
  totalDays: number;
  projects: EmployeeOverlap;
}
