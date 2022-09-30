import React from 'react';

function UpdateItem(){
    const borrowableSelect = (bool) => {
        console.log(bool)
        formData.isBorrowable = bool
    }
    return(
        <h1>this is update</h1>
        <div className="col-auto">
            <label className="col-form-label">Borrowable?</label>
        </div >
        <div className="col-auto">
            <select className="form-select" defaultValue={formData.isBorrowable} name="isBorrowable" onChange={handleOnChange}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
        </div>
    )
}
export default UpdateItem