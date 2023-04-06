import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import './login.css';

// function getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {

//             var cookie = jQuery.trim(cookies[i]);
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
// var csrftoken = getCookie('csrftoken');

function Login() {
    const navigate = useNavigate();
    const [employee_id, setEmployeeid] = useState('');
    const [password, setpassword] = useState('');

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
                     let token = data.data.data.token;
                     sessionStorage.setItem("token", token)
                     console.log("Token Davv.."+token);
                    navigate('/admin/mdm/product');
                }

                // else{console.log('Invalid username or password')}


                // if (res.data.status === 'failure') {
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

                            <br /><br />
                            <form>
                                Employee ID
                                <input type='text' className='loginpt' onChange={(e) => { setEmployeeid(e.target.value) }} required autoFocus='ture' />
                                Password
                                <input type='password' className='loginpt' onChange={(e) => { setpassword(e.target.value) }} required /><br />
                                <button className='logsbmt' type='submit' onClick={dologin}>Sign In</button>
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