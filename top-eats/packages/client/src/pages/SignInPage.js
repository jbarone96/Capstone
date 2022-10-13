import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Header from '../components/Header/Header'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    email: '',
    password: '',
    error: ''
}

const SignInPage = ({setUser, lastPath, setLastPath}) => {
    const [data, setData] = useState(initialState);
    const navigate = useNavigate();
    const location = useLocation();


    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        // Send POST request to check for existing user in database with matching email/password combination
        // If a match is found, authenticate with token and navigate to homepage
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:3001/api/signin", data);
            if (result.data.message === "User doesn't exist") {
                setData({...data, error: "This user doesn't exist"});
            } else if (result.data.message === "Invalid credentials") {
                setData({...data, error: "Incorrect password"});
            } else {
                setUser(result.data);
                if (lastPath === "/signup") {
                    navigate("/");
                    setLastPath("");
                } else {
                    navigate(-1);
                }
            }
        } catch (error) {
            setData({...data, error: error});
        }
    }

    return ( 
      <>
        <Header />
        <Container style={{textAlign: 'center', width: '100%', maxWidth: '1024px', minWidth: '400px'}}>
            <h3>Sign In</h3>
            <Form style={{width: '300px', margin: '50px auto'}} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' name='email' value={data.email} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name='password' value={data.password} onChange={handleChange} required/>
                </Form.Group>
                <p style={{color: 'red'}}>{data.error}</p>
                <Button type='submit' variant='primary' style={{marginTop: '20px'}}>Sign In</Button>
            </Form>
        </Container>
      
      </>
    )
}

export default SignInPage;