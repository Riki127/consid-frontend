import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

function UpdateCategory(){
    const { id }  = useParams()
    const { categoryName }  = useParams()
    const [newCategory, setCategory] = useState(categoryName)

    const updateCategory = () => {
        axios.put(`http://localhost:8080/category/update/${id}/${categoryName}/${newCategory}`)
            .then(r =>{
                alert(r.data)
            })
            .catch(r =>{
                alert(r.response.data)
            })
    }

    return(
        <div className="container">
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Category</label>
                <input className="form-control" type="text" value={newCategory} onChange={(e) => setCategory(e.target.value)}/>
                <div className="form-text">Must be a unique category</div>
                <button onClick={updateCategory} className="btn btn-primary">Update</button>
            </div>
        </div>
    )
}
export default UpdateCategory