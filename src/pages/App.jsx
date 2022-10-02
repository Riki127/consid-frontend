import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from "./Navbar";
import Front from "./Front";
import Item from "./Item";
import Category from "./Category";
import updateCategory from "./UpdateCategory";
import UpdateCategory from "./UpdateCategory";
import UpdateItem from "./UpdateItem"

function App(){
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route index element={<Front/>}></Route>
                <Route path="/item" element={<Item/>}></Route>
                <Route path="/category" element={<Category/>}></Route>
                <Route path="/category/update/:id/:categoryName" element={<UpdateCategory/>}></Route>
                <Route path="/item/update" element={<UpdateItem/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App