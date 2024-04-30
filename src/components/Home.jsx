import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Formatable from './Formatable';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function Home() {
  const [addSection, setAddSection] = useState(false);
  const [data, setData] = useState({
    productID: '',
    name: '',
    price: '',
    featured: 'false',
    rating: '0',
    company: ''
  });
  const [formDataEdit, setFormDataEdit] = useState({
    _id: '',
    productID: '',
    name: '',
    price: '',
    featured: 'false',
    rating: '0',
    company: ''
  });
  const [dataList, setDataList] = useState([]);
  const [updateSection, setUpdateSection] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      navigate('/login');
    }
    console.log(process.env.REACT_APP_BACKEND_URL)
  },[navigate]);

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = await axios.post('/create', data);
    console.log(formData);
    if(formData.status === 200) {
      setAddSection(false);
      alert('Data added successfully');
    }
  }

  const getFetchData = async() => {
    const fetchData = await axios.get('/');
    if(fetchData.data.success){
      setDataList(fetchData.data.data);
      console.log(fetchData.data.data);
    }
  }

  useEffect(() => {
    getFetchData();
  },[]);

  const handleDelete = async(id) => {
    const deleteData = await axios.delete(`/delete/${id}`);
    if(deleteData.status === 200) {
      getFetchData();
      alert('Data deleted successfully');
    }
  }

  const handleUpdate = async(e) => {
    e.preventDefault();
    const updateData = await axios.put('/update', formDataEdit);
    if(updateData.status === 200) {
      setUpdateSection(false);
      getFetchData();
      alert('Data updated successfully');
    }
     
  }

  const handleEditOnChange = (e) => {
    const {name, value} = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }
    });
  }

  const handleEdit = (item) => {
    setFormDataEdit({
      _id: item._id,
      productID: item.productID,
      name: item.name,
      price: item.price,
      featured: item.featured,
      rating: item.rating,
      company: item.company
    });
    setUpdateSection(true);
  }

  const handlePriceFilter = async(e) => {
    e.preventDefault();
    const price = document.getElementById('price-filter').value;
    const priceFilter = await axios.get(`/price/${price}`);
    if(priceFilter.status === 200) {
      setDataList(priceFilter.data.data);
    }
  }

  const handleRatingFilter = async(e) => {
    e.preventDefault();
    const rating = document.getElementById('rating').value;
    const ratingFilter = await axios.get(`/rating/${rating}`);
    if(ratingFilter.status === 200) {
      setDataList(ratingFilter.data.data);
    }
  }

  const handleFeatureFilter = async(e) => {
    e.preventDefault();
    const featured = document.getElementById('featured').value;
    const featureFilter = await axios.get(`/featured/${featured}`);
    if(featureFilter.status === 200) {
      setDataList(featureFilter.data.data);
    }
  }

  const handleClearFilter = async() => {
    getFetchData();
    document.getElementById('featured').value = null;
    document.getElementById('rating').value = '';
    document.getElementById('price-filter').value = '';
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>
        <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        {
          addSection && (
            <Formatable
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
              handleClose={()=>setAddSection(false)}
              props={data}
            />
          )
        }
        {
          updateSection && (
            <Formatable
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleClose={()=>setUpdateSection(false)}
              props={formDataEdit}
            />
          )
        }
        
      </div>

      <div className="filter">
        <div className="price-filter">
          <form onSubmit={handlePriceFilter}>
            <label>Max Price:</label>
            <input type="number" id="price-filter" name="price"/>
            <button type="submit" className="btn-filter">Apply</button>
          </form>
        </div>
        <div className="rating-filter">
          <form onSubmit={handleRatingFilter}>
            <label>Min Rating:</label>
            <input type="number" id="rating" name="rating" min="0.5" max="5" step="0.5"/>
            <button type="submit" className="btn-filter">Apply</button>
          </form>
        </div>
        <div className="feature-filter">
          <form onSubmit={handleFeatureFilter}>
            <label>Featured:</label>
            <select id="featured" name="featured">
              <option value={null} disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <button type="submit" className="btn-filter">Apply</button>
          </form>
        </div>
        <button onClick={handleClearFilter} className="btn-filter-clear">Clear filter</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Featured</th>
              <th>Rating</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
            { dataList[0] ? (
              dataList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.productID}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.featured ? 'Yes' : 'No'}</td>
                    <td>{item.rating}</td>
                    <td>{item.company}</td>
                    <td>
                      <button className="btn-edit"
                        onClick={()=>handleEdit(item)}
                      >Edit</button>
                      <button className="btn-delete" onClick={()=>handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                )
              }))
              : (
                <tr>
                  <td colSpan="7">No data found</td>
                </tr>
              )
            }
          </thead>
        </table>
      </div>
    </>
  );
}

export default Home;
