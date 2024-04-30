import React from 'react'; 
import "../App.css";

const Formatable = ({handleSubmit, handleOnChange,handleClose,props}) => {
    return(
        <div className="add-container">
        <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleClose}>X</div>
            <label for="productID">Product ID:</label>
            <input type="text" id="productID" name="productID" required onChange={handleOnChange} value={props.productID}/>

            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required onChange={handleOnChange} value={props.name}/>

            <label for="price">Price:</label>
            <input type="number" id="price" name="price" required onChange={handleOnChange} value={props.price}/>

            <label for="featured">Featured:</label>
            <select id="featured" name="featured" onChange={handleOnChange} value={props.featured}>
                <option value={null} disabled>Select</option>
                <option value="false">No</option>
                <option value="true">Yes</option>
            </select>

            <label for="rating">Rating:</label>
            <input type="number" id="rating" name="rating" step="0.5" min="0.5" max="5" vslue="5" placeholder="rate between 0.5 to 5" onChange={handleOnChange} value={props.rating}/>

            <label for="company">Company:</label>
            <input type="text" id="company" name="company" required onChange={handleOnChange} value={props.company}/>

            <button type="submit" className="btn-submit">Submit</button>
        </form>
        </div>
    )
};

export default Formatable;