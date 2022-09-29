import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from "./Navbar";
import Front from "./Front";

function App(){
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route index element={<Front/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App