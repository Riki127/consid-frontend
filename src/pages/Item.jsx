import React, {useEffect, useState, useRef}  from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Item(){
    const [items, setItems] = useState()
    const [isLoaded, setUpdate] = useState()
    const [typeLoaded, setTypeLoaded] = useState(false)
    const [type, setType] = useState("Select type")
    const [categories, setCategories] = useState()
    const [disableAuthor, setAuthorDisable] = useState(false)
    const [disablePages, setPagesDisable] = useState(false)
    const [disableRunTime, setRunTimeDisable] = useState(false)
    const [checkoutItem, setCheckout] = useState()
    const borrowerInput = useRef(null)

    const navigate = useNavigate()
    const types = ["Book", "DVD", "Audio Book", "Reference Book"]

    const initialData = ({
        categoryId: {
            id: null,
            categoryName: ""
        },
        title: "",
        author: "",
        pages: null,
        runTimeMinutes: null,
        isBorrowable: true,
        borrower: null,
        borrowDate: null,
        type: ""
    })
    const [formData, setForm] = useState(initialData)

    useEffect(() => {
        fetchAllItems()
    }, [isLoaded])

    const handleOnChange = (change) => {
        setForm({
            ...formData,
            [change.target.name]: change.target.value
        })
    }

    const handleObjChange = (change) => {
        const id = change.target.value;
        const category = categories.find(category => category.id.toString() === id)
        setForm({
            ...formData,
            categoryId: category
        })
    }

    const fetchAllItems = () => {
        axios.get('http://localhost:8080/library/get')
            .then(r => {
                setItems(r.data)
                fetchAllCategories()
            })
    }

    const fetchAllCategories = () => {
        axios.get('http://localhost:8080/category/all')
            .then(r => {
                setCategories(r.data)
                setUpdate(true)
            })
    }

    const addItem = () => {
        if(formValidation()){
            axios.post('http://localhost:8080/library/add', formData)
                .then(r =>{
                    alert(r.data)
                    window.location.reload(false);
                })
                .catch(r =>{
                    alert(r.response.data)
                })
        }
        else alert("Please fill in the form correctly")
    }

    const deleteItem = (id) => {
        axios.delete(`http://localhost:8080/library/delete/${id}`)
            .then(r =>{
                alert(r.data)
                setUpdate(false)
            })
            .catch(r =>{
                alert(r.response.data)
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

    const updateItem = (item) => {
        navigate("/item/update", {state:{item}})
    }

    const sortTable = (column) => {
        const sortedData = [...items].sort((x,y)=>
            x[column].toLowerCase() > y[column].toLowerCase() ? 1 : -1
        )
        setItems(sortedData)
    }

    const handleCheckout = () => {
        if(borrowerInput.current.value.length > 3){
            axios.put(`http://localhost:8080/library/checkout/${borrowerInput.current.value}`,checkoutItem)
                .then(r =>{
                    alert(r.data)
                    setUpdate(false)
                })
                .catch(r =>{
                    alert(r.response.data)
                })
        }
        else alert("Borrower name needs atleast 4 characters")
    }

    const handleCheckin = (item) => {
        axios.put(`http://localhost:8080/library/checkin`, item)
            .then(r =>{
                alert(r.data)
                setUpdate(false)
            })
            .catch(r =>{
                alert(r.response.data)
            })
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
            <h1 className="text-center">Add new Item</h1>
            <div className="mb-3">
                <div className="dropdown d-flex justify-content-center">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        {type}
                    </button>
                    <ul className="dropdown-menu">
                        {types.map(type =>(
                            <li className="dropdown-item" onClick={() => typeSelect(type)}>{type}</li>
                        ))}
                    </ul>
                </div>
                { typeLoaded &&

                <div className="row g-3 align-items-center p-3">
                    <div className="col-auto">
                        <label className="col-form-label">Title</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" id="title" className="form-control" name="title" onChange={handleOnChange}/>
                    </div>
                    <div className="col-auto">
                        <label className="col-form-label">Author</label>
                    </div>
                    <div className="col-auto">
                        <input disabled={disableAuthor} type="text" id="author" className="form-control" name="author" onChange={handleOnChange}/>
                    </div>
                    <div className="col-auto">
                        <label className="col-form-label">Pages</label>
                    </div>
                    <div className="col-md-1">
                        <input disabled={disablePages} type="number" id="pages" className="form-control" name="pages" onChange={handleOnChange}/>
                    </div>
                    <div className="col-auto">
                        <label className="col-form-label">Run time</label>
                    </div>
                    <div className="col-md-1">
                        <input disabled={disableRunTime} type="number" id="pages" className="form-control" name="runTimeMinutes" onChange={handleOnChange}/>
                    </div>
                    <div className="col-auto">
                        <label className="col-form-label">Category</label>
                    </div >
                    <div className="col-md-2">
                        <select className="form-select" name="categoryId" onChange={handleObjChange}>
                            <option >Select Category</option>
                            {categories.map(category=> (
                                <option value={category.id}>{category.categoryName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                }
            </div>
            <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" onClick={addItem}>Submit</button>
            </div>
            <h1 className="text-center">Current Categories</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th onClick={() => sortTable("type")}>Type(Sortable)</th>
                    <th scope="col">Author</th>
                    <th scope="col">pages</th>
                    <th scope="col">Borrowable</th>
                    <th scope="col">Borrower</th>
                    <th scope="col">Borrow date</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {isLoaded &&
                items.map(item=>
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.categoryId.categoryName}</td>
                        <td>{item.type}</td>
                        <td>{item.author}</td>
                        <td>{item.pages}</td>
                        <td>{item.isBorrowable.toString()}</td>
                        <td>{item.borrower}</td>
                        <td>{item.borrowDate}</td>
                        <td>
                            <button type="button" className="btn btn-warning" onClick={() => updateItem(item)}>Update</button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
                        </td>
                        {   item.isBorrowable &&
                            <td>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setCheckout(item)}>
                                    Check-out
                                </button>
                            </td>
                        }
                        {   (!item.isBorrowable && item.type !== "Reference Book") &&
                            <td>
                                <button type="button" className="btn btn-primary"
                                        onClick={() => handleCheckin(item)}
                                >Check-in</button>
                            </td>
                        }

                    </tr>
                )}
                </tbody>
            </table>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Check-out</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                            <div className="modal-body">
                                <div className="col-auto">
                                    <label className="col-form-label">Borrower name</label>
                                </div>
                                <div className="col-auto">
                                    <input ref={borrowerInput} type="text" id="checkout" className="form-control" name="checkout" />
                                </div>
                            </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleCheckout}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Item