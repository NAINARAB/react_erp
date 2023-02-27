import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import './login.css';
function Login() {
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');


      const client1 = axios.create({
        baseURL: "https://erp-dwe8a.ondigitalocean.app/api/login/" 
      });


      const  getLogin = (name,password) => {
        client1.post('', {
            name:name,
            password:password,
           })
           .then((res) => {
              console.log("after then",res)
              if(res.data.code = 200){
                let id = JSON.parse(res.data.data.id)
                console.log("before navigate",id)
                sessionStorage.setItem("id",id)
                console.log(id);
                navigate('/admin/mdm/product');
              }
              
              else if(res.data.status === 'failure'){
                  alert('Invalid User Id Or Password');
            }  
              
           }).catch((err)=>{
            console.log(err);
           })
      };


      const dologin=(e)=>{
        e.preventDefault();
        getLogin(name,password);
     }




  
    return (
        <div>
            <div className='main'>
                <div className='cntr'>
                    <div style={{ marginTop: '5%' }}>
                        <h2 style={{textAlign:'center'}}>👋 Welcome Back</h2>
                        <p style={{textAlign:'center'}}>Sign in to your account to continue</p>
                        <div className='logform'><br />
                            <div style={{fontSize:'23px'}}><h2 className='hedundr'>Sig</h2>n In</div>

                            <br /><br />
                            <form>
                                Email
                                <input type='text' className='loginpt' onChange={(e) => {setname(e.target.value)}} required autoFocus='ture' />
                                Password
                                <input type='password' className='loginpt' onChange={(e) => {setpassword(e.target.value)}} required /><br />
                                <button className='logsbmt' type='submit' onClick={() => {navigate('/admin/mdm/product')}}>Sign In</button>
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