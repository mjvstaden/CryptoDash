import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoreInfo from './components/MoreInfo';
import Dashboard from './components/Dashboard';
export default function App(){
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="more-info/:id" element={<MoreInfo />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}