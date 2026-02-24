import type {EmployeeOverlap} from "../../types/EmployeeOverlap.ts";
import './EmployeeGrid.scss';

interface EmployeeGridProps {
  data: EmployeeOverlap[];
}

export function EmployeeGrid({ data }: EmployeeGridProps) {
  return (
    <div className="employee-grid-container">
      {data.length === 0 ? (
        <h2 className="fallback-text">
          No overlapping employees found.
        </h2>
      ) : (
      <div className="employee-table-wrapper">
        <table className="employee-table">
          <thead>
          <tr>
            <th>Employee ID #1</th>
            <th>Employee ID #2</th>
            <th>Project ID</th>
            <th>Days worked</th>
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
      )}
    </div>
  );
}

export default EmployeeGrid;
