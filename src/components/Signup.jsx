import {React, useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "https://rablo-assignment.onrender.com";

const Signup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            navigate('/home');
        }
    },[navigate]);

    const handleSignup = async(e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            username: e.target.email.value,
            password: e.target.password.value
        }
        try{
            const signupData = await axios.post('/api/register', data);
            console.log(signupData);
            if(signupData.status === 201){
                alert('Signup successful');
                navigate('/login');
            }
        }
        catch(err){
            alert('Signup failed');
        }
    }
    return (
        <div className="add-container">
            <div className="login-form">
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required/>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required/>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                    <button type="submit" className="btn-submit">Submit</button>
                </form>
                <p>Already have an account <Link to="/login">Log in</Link></p>
            </div>
        </div>
    )
};

export default Signup;