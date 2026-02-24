import React, { useState } from "react";

import './App.scss'
import EmployeeGrid from "./components/EmployeeGrid.tsx";
import {calculateOverlaps, parseCsv} from "./services/employeeService.ts";
import type {EmployeeOverlap} from "./types/EmployeeOverlap.ts";

function App() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [data, setData] = useState<EmployeeOverlap[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setCsvFile(file);

    const records = await parseCsv(file);
    const overlaps = calculateOverlaps(records);

    console.log('test>>> ', overlaps);

    setData(overlaps);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee overlaps</h1>
      </header>

      <main className="app-content">
        <div className="add-file-container">
          <input type="file" accept=".csv" onChange={handleFileUpload} />
          {csvFile && <p>Selected file: {csvFile.name}</p>}
        </div>

        <EmployeeGrid data={data}/>
      </main>
    </div>
  )
}

export default App
