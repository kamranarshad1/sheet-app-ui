import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sheet from './Pages/Sheet'
import Dashboard from './Pages/Dashboard'
import './App.css'
import 'mocks'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/:sheetId' element={<Sheet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
