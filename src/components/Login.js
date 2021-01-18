import React, {useRef, useState} from 'react';
import {Form, Button,Card, Alert} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {Link, useHistory} from 'react-router-dom';
import style from './SingUp.module.css';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error,setError] = useState('')
    const [loading ,setLoading] = useState(false)
    const history = useHistory();
    

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/');
        }catch{
            setError('Failed to sing in')
        }
    }
    
    return (
        <>
            <Card className={style.Card}>
                <Card.Body>
                    <h2 className={style.Title}>Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            {/* <Form.Label>Email</Form.Label> */}
                            <Form.Control className={style.Input} type="email" ref={emailRef} required placeholder="E-mail"/>
                        </Form.Group>
                        <Form.Group id="password">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control className={style.Input} type="password" ref={passwordRef} required placeholder="Password"/>
                        </Form.Group>
                        <div className={style.Wrapper}>
                            <Button disabled={loading} className={style.Button} type="submit"> Log In </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/singup">Sing Up</Link>
            </div>
            <div className="w-100 text-center mt-2">
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </>
    )
}
