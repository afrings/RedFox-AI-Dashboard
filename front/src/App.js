import Main from './components/pages/main.js';
import Login from './components/pages/login.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DatePicker from './components/interactives/datePicker.js'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/main' element={<Main />} />
                <Route path='/calendar' element={<DatePicker/>} />
            </Routes>
        </Router>
    </LocalizationProvider>
  );
}

export default App;
