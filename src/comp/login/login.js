import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import './login.css';

function Login() {
    const navigate = useNavigate();
    const [employee_id, setEmployeeid] = useState(150);
    const [password, setpassword] = useState(123);

    // const headers= { "Content-Type": "application/json", "X-CSRFToken" : csrftoken}

    const client1 = axios.create({
        baseURL: "https://erp-test-3wqc9.ondigitalocean.app/api/login/"
    });


    const getLogin = (employee_id, password) => {
        client1.post('', {
            employee_id: employee_id,
            password: password,
        })

            .then((data) => {
                if (data.data.code = 200) {
                    sessionStorage.setItem("token", data.data.data.token);
                    navigate('/home');
                }
                // if (data.data.code === 'failure') {
                //     alert('Invalid User Id Or Password');
                //     console.log('failure data', res)
                // }
            }).catch((err) => {
                console.log(err);
            })
    };


    const dologin = (e) => {
        e.preventDefault();
        getLogin(employee_id, password);
    }

    return (
        <div>
            <div className='main'>
                <div className='cntr'>
                    <div>
                        <h2 style={{ textAlign: 'center' }}>👋 Welcome Back</h2>
                        <p style={{ textAlign: 'center' }}>Sign in to your account to continue</p>
                        <div className='logform'><br />
                            <div style={{ fontSize: '23px' }}><h2 className='hedundr'>Sig</h2>n In</div>
                            
                            <p className='para' style={{padding: '1em 0', textAlign:'center'}}>( id : 1 password : 123 || id : 150 password : 123 )</p>
                            
                            <form onSubmit={dologin}>
                                Employee ID
                                <input 
                                    type='text' 
                                    className='loginpt' 
                                    onChange={(e) => { setEmployeeid(e.target.value) }} 
                                    required 
                                    autoFocus='ture'
                                    defaultValue={employee_id}
                                 />
                                Password
                                <input 
                                    type='password' 
                                    className='loginpt' 
                                    onChange={(e) => { setpassword(e.target.value) }} 
                                    required 
                                    defaultValue={password}
                                /><br />
                                <button className='logsbmt' type='submit'>Sign In</button>
                                <button className='logfrgt'>Forget Password?</button>
                            </form><br />
                            <p className='para'>By Signing in you agree to the Terms of Service and Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;