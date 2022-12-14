import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Category(){
    const [category, setCategory] = useState('')
    const [isLoaded, setUpdate] = useState(false)
    const [categories, setCategories] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllCategories()
    }, [isLoaded])

    const fetchAllCategories = () => {
        axios.get('http://localhost:8080/category/all')
            .then(r => {
                setCategories(r.data)
                setUpdate(true)
            })
    }

    const addCategory = () => {
        if(category.length > 0){
            axios.post(`http://localhost:8080/category/add/${category}`)
                .then(r =>{
                    alert(r.data)
                    setUpdate(false)
                })
                .catch(r =>{
                    alert(r.response.data)
                })
        }
        else alert("Category can't be empty")
    }

    const deleteCategory = (category) => {
        axios.delete(`http://localhost:8080/category/delete/${category.id}/${category.categoryName}`)
            .then(r => {
                alert(r.data)
                setUpdate(false)
            })
            .catch(r =>{
                alert(r.response.data)
            })
    }

    const updateCategory = (category) => {
        navigate("/category/update/"+category.id+"/"+category.categoryName)
    }

    return (
        <div className="container">
            <h1 className="text-center">Add new Category</h1>
            <div className="mb-3">
                <label className="form-label">Category</label>
                <input className="form-control" type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
                <div className="form-text">Must be a unique category</div>
            </div>
            <div className="d-flex justify-content-center mb-3">
                <button onClick={addCategory} className="btn btn-primary">Submit</button>
            </div>
            <h1 className="text-center">Current Categories</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Category</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    {isLoaded &&
                    categories.map(category=>
                    <tr key={category.id}>
                        <td>{category.categoryName}</td>
                        <td>
                            <button type="button" className="btn btn-warning" onClick={() => updateCategory(category)}>Update</button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => deleteCategory(category)}>Delete</button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default Category