import type {EmployeeRecord} from "../types/EmployeeRecord.ts";
import type {EmployeeOverlap} from "../types/EmployeeOverlap.ts";

import { parseDate, calculateOverlapDays } from "../utils/dateUtils";

export async function parseCsv(file: File): Promise<EmployeeRecord[]> {
  const text = await file.text();

  const lines = text.trim().split("\n");

  return lines.slice(1).map((line) => {
    const [EmpID, ProjectID, DateFrom, DateTo] = line.split(",");

    return {
      EmpID: Number(EmpID.trim()),
      ProjectID: Number(ProjectID.trim()),
      DateFrom: parseDate(DateFrom.trim()),
      DateTo: parseDate(DateTo.trim()),
    };
  });
}

export function calculateOverlaps(
  records: EmployeeRecord[]
): EmployeeOverlap[] {
  const result: EmployeeOverlap[] = [];

  // Group by ProjectID
  const projects = new Map<number, EmployeeRecord[]>();

  for (const record of records) {
    if (!projects.has(record.ProjectID)) {
      projects.set(record.ProjectID, []);
    }
    projects.get(record.ProjectID)!.push(record);
  }

  // For each project
  for (const [projectId, employees] of projects.entries()) {
    for (let i = 0; i < employees.length; i++) {
      for (let j = i + 1; j < employees.length; j++) {
        const emp1 = employees[i];
        const emp2 = employees[j];

        const overlapDays = calculateOverlapDays(
          emp1.DateFrom,
          emp1.DateTo,
          emp2.DateFrom,
          emp2.DateTo
        );

        if (overlapDays > 0) {
          result.push({
            empId1: emp1.EmpID,
            empId2: emp2.EmpID,
            projectId,
            daysWorked: overlapDays,
          });
        }
      }
    }
  }

  return result;
}