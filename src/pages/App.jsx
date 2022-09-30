import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from "./Navbar";
import Front from "./Front";
import Item from "./Item";
import Category from "./Category";
import Checkin from "./Checkin";
import Checkout from "./Checkout";
import updateCategory from "./UpdateCategory";
import UpdateCategory from "./UpdateCategory";


function App(){
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route index element={<Front/>}></Route>
                <Route path="/item" element={<Item/>}></Route>
                <Route path="/category" element={<Category/>}></Route>
                <Route path="/checkin" element={<Checkin/>}></Route>
                <Route path="/checkout" element={<Checkout/>}></Route>
                <Route path="/category/update/:id/:categoryName" element={<UpdateCategory/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App