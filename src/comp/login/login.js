import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
    const navigate = useNavigate();

    function samplenav(){
        navigate('/header');
    }





    return (
        <div>
            <div className='main'>
                <div className='cntr'>
                    <div style={{ marginTop: '7em' }}>
                        <h2 style={{textAlign:'center'}}>👋 Welcome Back</h2>
                        <p style={{textAlign:'center'}}>Sign in to your account to continue</p>
                        <div className='logform'>
                            <h2><h2 style={{borderBottom:'2px solid rgb(100, 81, 223)',display:'inline', fontSize:'23px',paddingBottom:'4px'}}>Sig</h2>n In</h2>
                            <br /><br />
                            <form>
                                Email<br />
                                <input type='text' className='loginpt' required /><br/>
                                Password<br />
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