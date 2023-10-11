import React from 'react';
import { Main } from './components/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Main />} />
            </Routes>
        </Router>
    )
}