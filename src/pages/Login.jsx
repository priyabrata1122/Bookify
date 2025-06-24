import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage=()=>{

    const firebase=useFirebase();
    // console.log(firebase);
    const navigate=useNavigate();

    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log("Log in user ...")
        const res=await firebase.LoginWithEmailPass(email,pass);
        console.log("Successful",res);
    }

    useEffect(()=>{
        console.log("Login page");
        if(firebase.isLoggedin()){
            navigate("/");
        }
    },[firebase,navigate]); 

    return(
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    onChange={e=>setPass(e.target.value)}
                    value={pass}
                    type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <h3 className='mt-5 mb-5'>Or</h3>
            <Button variant='danger' onClick={()=>{
                firebase.LoginWithGoogle();
            }}>Sign In With Google</Button>
        </div>
    )
}

export default LoginPage;
