// import { useState } from 'react';
import Main from './components/pages/main.js';
import Login from './components/pages/loginPage.js';
import ResetPassword from './components/pages/resetPassword.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs' // required for the date picker interactive
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/resetPassword' element={<ResetPassword />} />
                <Route path='/main' element={<Main />} />
            </Routes>
        </Router>
    </LocalizationProvider>
  );
}

export default App;
