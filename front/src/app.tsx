import React from 'react';
import { Main } from './components/pages/main';
import { Login } from './components/pages/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/main' element={<Main />} />
            </Routes>
        </Router>
    )
}