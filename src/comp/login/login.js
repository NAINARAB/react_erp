import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
    const navigate = useNavigate();

    function samplenav(){
        navigate('/home');
    }





    return (
        <div>
            <div className='main'>
                <div className='cntr'>
                    <div style={{ marginTop: '5%' }}>
                        <h2 style={{textAlign:'center'}}>👋 Welcome Back</h2>
                        <p style={{textAlign:'center'}}>Sign in to your account to continue</p>
                        <div className='logform'><br />
                            <h2 style={{fontSize:'23px'}}><h2 className='hedundr'>Sig</h2>n In</h2>

                            <br /><br />
                            <form>
                                Email
                                <input type='text' className='loginpt' required autoFocus='ture' />
                                Password
                                <input type='password' className='loginpt' required /><br />
                                <button className='logsbmt' type='submit' onClick={samplenav}>Sign In</button>
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