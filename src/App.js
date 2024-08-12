import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import './App.css';
import Seminars from './Components/Seminars';
import SeminarDetails from './Components/SeminarDetails';
import SeminarPerRegion from './Components/SeminarPerRegion';

function App() {

 
  return (
    <div className="container mt-3">
      <main className="row">
        <BrowserRouter>
            <Routes>
              <Route path="/seminar/:id" element={<SeminarDetails />} />

              <Route path="/region/:place" element={<SeminarPerRegion />} />

              <Route path="/" element={<Seminars />} />
              
            </Routes>
        </BrowserRouter>
      </main>
    </div >
  );
}


export default App;