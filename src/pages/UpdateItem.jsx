import React, {useEffect, useState} from 'react';
import {useParams, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function UpdateItem(){
    const {state} = useLocation()
    const [formData, setForm] = useState(state.item)
    const [isLoaded, setUpdate] = useState()
    const [categories, setCategories] = useState()
    const [disableAuthor, setAuthorDisable] = useState(false)
    const [disablePages, setPagesDisable] = useState(false)
    const [disableRunTime, setRunTimeDisable] = useState(false)
    const [typeLoaded, setTypeLoaded] = useState(false)
    const [type, setType] = useState("Select type")
    const types = ["Book", "DVD", "Audio Book", "Reference Book"]
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllCategories()
        typeSelect(formData.type)
    }, [isLoaded])


    const handleObjChange = (change) => {
        const id = change.target.value;
        const category = categories.find(category => category.id.toString() === id)
        setForm({
            ...formData,
            categoryId: category
        })
    }

    const handleOnChange = (change) => {
        setForm({
            ...formData,
            [change.target.name]: change.target.value
        })
    }

    const fetchAllCategories = () => {
        axios.get('http://localhost:8080/category/all')
            .then(r => {
                setCategories(r.data)
                setUpdate(true)
            })
    }

    const typeSelect = (type) => {
        setTypeLoaded(true)
        setType(type)
        formData.type = type
        if(type === "Reference Book") {
            formData.isBorrowable = false
            setRunTimeDisable(true)
            setPagesDisable(false)
            setAuthorDisable(false)
        }
        if(type === "Book"){
            formData.isBorrowable = true
            setRunTimeDisable(true)
            setPagesDisable(false)
            setAuthorDisable(false)
        }
        if(type === "DVD" ||  type === "Audio Book" ){
            formData.isBorrowable = true
            setRunTimeDisable(false)
            setPagesDisable(true)
            setAuthorDisable(true)
        }
    }
    
    const updateItem = () => {
        if(formValidation()){
            axios.put('http://localhost:8080/library/update', formData)
                .then(r =>{
                    alert(r.data)
                    navigate('/item')
                })
                .catch(r =>{
                    alert(r.response.data)
                })  
        }
        else alert("Please fill in the form correctly")
    }

    const formValidation = () => {
        if(formData.type === "Reference Book" || formData.type === "Book" ) {
            if(formData.title.length > 0 && formData.pages > 0 && formData.author.length > 0 && formData.categoryId.id != null ) {
                return true
            }
        }
        else if(formData.type === "DVD" || formData.type === "Audio Book"){
            if(formData.title.length > 0 && formData.runTimeMinutes > 0 && formData.categoryId.id != null ) {
                return true
            }
        }
        return false
    }

    return(
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h1>Update {formData.type}</h1>
                </div>
                { isLoaded &&
                    <div className="row g-3 align-items-center p-3">
                        <div className="col-auto">
                            <label className="col-form-label">Title</label>
                        </div>
                        <div className="col-auto">
                            <input defaultValue={formData.title.replace(/\([^()]*\)/g, '')} type="text" id="title" className="form-control" name="title" onChange={handleOnChange}/>
                        </div>
                        <div className="col-auto">
                            <label className="col-form-label">Author</label>
                        </div>
                        <div className="col-auto">
                            <input disabled={disableAuthor} defaultValue={formData.author} type="text" id="author" className="form-control" name="author" onChange={handleOnChange}/>
                        </div>
                        <div className="col-auto">
                            <label className="col-form-label">Pages</label>
                        </div>
                        <div className="col-md-1">
                            <input disabled={disablePages} defaultValue={formData.pages} type="number" id="pages" className="form-control" name="pages" onChange={handleOnChange}/>
                        </div>
                        <div className="col-auto">
                            <label className="col-form-label">Run time</label>
                        </div>
                        <div className="col-md-1">
                            <input disabled={disableRunTime} defaultValue={formData.runTimeMinutes}  type="number" id="pages" className="form-control" name="runTimeMinutes" onChange={handleOnChange}/>
                        </div>
                        <div className="col-auto">
                            <label className="col-form-label">Category</label>
                        </div >
                        <div className="col-md-2">
                            <select defaultValue={formData.categoryId.id} className="form-select" name="categoryId" onChange={handleObjChange}>
                                <option >Select Category</option>
                                {categories.map(category=> (
                                    <option value={category.id}>{category.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-warning" onClick={updateItem}>Update</button>
                        </div>

                    </div>
                }
                <pre>{JSON.stringify(formData, undefined, 2)}</pre>
            </div>

    )
}
export default UpdateItem