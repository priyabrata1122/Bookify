import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const RegisterPage=()=>{

    const firebase=useFirebase();
    // console.log(firebase);

    const navigate=useNavigate();

    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log("Sign Up user ...")
        firebase.RegisterWithEmailPass(email,pass)
        .then(async (res)=>{
            console.log("Successful");
            if(firebase.isLoggedin()) console.log(true);
            else console.log(false);
            await firebase.signoutUser();
            if(firebase.isLoggedin()) console.log(true);
            else console.log(false);
            navigate('/login');
        })
    }

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
                    Create Account
                </Button>
            </Form>
        </div>
    )
}

export default RegisterPage;
