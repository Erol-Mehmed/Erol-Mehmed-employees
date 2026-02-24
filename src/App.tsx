import React, { useState } from "react";

import './App.scss'
import EmployeeGrid from "./components/EmployeeGrid/EmployeeGrid.tsx";
import {calculateOverlaps, parseCsv} from "./services/employeeService.ts";
import type {EmployeeOverlap} from "./types/EmployeeOverlap.ts";

function App() {
  const [data, setData] = useState<EmployeeOverlap[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const records = await parseCsv(file);
    const overlaps = calculateOverlaps(records);

    setData(overlaps);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee overlaps</h1>
      </header>

      <main className="app-content">
        <input type="file" accept=".csv" className="file-input" onChange={handleFileUpload} />

        <EmployeeGrid data={data}/>
      </main>
    </div>
  )
}

export default App
