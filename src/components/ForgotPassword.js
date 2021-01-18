import React, {useRef, useState} from 'react';
import {Form, Button,Card, Alert} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {Link} from 'react-router-dom';
import style from './SingUp.module.css';

export default function ForgotPassword() {
    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [message, setMessage] = useState('')
    const [error,setError] = useState('')
    const [loading ,setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setMessage('')
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        }catch{
            setError('Failed to reset password')
        }
    }
    return (
        <>
            <Card className={style.Card}>
                <Card.Body>
                    <h2 className={style.Title}>Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            {/* <Form.Label>Email</Form.Label> */}
                            <Form.Control className={style.Input} type="email" ref={emailRef} required placeholder="E-mail"/>
                        </Form.Group>
                        <div className={style.Wrapper}>
                            <Button disabled={loading} className={style.Button} type="submit"> Reset Password </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/singup">Sing Up</Link>
            </div>
            <div className="w-100 text-center mt-2">
                <Link to="/login">Login</Link>
            </div>
        </>
    )
}
