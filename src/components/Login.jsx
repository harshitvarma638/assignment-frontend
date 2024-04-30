import { React,useEffect } from 'react';
import '../App.css';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            navigate('/home');
        }
    },[navigate]);

    const handleLogin = async(e) => {
        e.preventDefault();
        const data = {
            username: e.target.email.value,
            password: e.target.password.value
        }
        try{
            const loginData = await axios.post('/api/login', data);
            if(loginData.status === 200){
                alert('Login successful');
                localStorage.setItem('token', loginData.data.token);
                navigate('/home');
                // console.log(loginData.data.token);
            }
        }
        catch(err){
            alert('Invalid credentials');
        }
        
    }
    return (
        <div className="add-container">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required/>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                    <button type="submit" className="btn-submit">Submit</button>
                </form>
                <p>Don't have an account? <Link to="/signup">Register</Link></p>
            </div>
        </div>
    )
};

export default Login;