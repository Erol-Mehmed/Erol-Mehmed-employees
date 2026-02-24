import type {EmployeeOverlap} from "../types/EmployeeOverlap";

interface EmployeeGridProps {
  data: EmployeeOverlap[];
}

export function EmployeeGrid({ data }: EmployeeGridProps) {
  if (data.length === 0) {
    return <p>No overlapping employees found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="employee-table">
        <thead>
        <tr>
          <th>Employee ID #1</th>
          <th>Employee ID #2</th>
          <th>Project ID</th>
          <th>Days Worked</th>
        </tr>
        </thead>

        <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.empId1}</td>
            <td>{row.empId2}</td>
            <td>{row.projectId}</td>
            <td>{row.daysWorked}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeGrid;
