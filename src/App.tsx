import React, { useState } from "react";

import './App.scss'
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
      <header className="app-header">
        <h1>Employee overlaps</h1>
      </header>

      <main className="app-content">
        <input type="file" accept=".csv" onChange={handleFileUpload} />

        {csvFile && <p>Selected file: {csvFile.name}</p>}

        {/*<EmployeeGrid data={}/>*/}
      </main>
    </div>
  )
}

export default App
