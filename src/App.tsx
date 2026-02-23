import React, { useState } from "react";

import './App.css'
import EmployeeGrid from "./components/EmployeeGrid.tsx";

function App() {
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file =event.target.files?.[0];

    if (file) {
      setCsvFile(file);
    }
  }

  return (
    <div className="app">
      <h1>Employee overlaps</h1>

      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {csvFile && <p>Selected file: {csvFile.name}</p>}

      {/*<EmployeeGrid data={}/>*/}
    </div>
  )
}

export default App
