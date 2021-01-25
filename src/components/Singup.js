import React, {useRef, useState} from 'react';
import {Form, Button,Card, Alert} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {Link, useHistory} from 'react-router-dom';
import style from './SingUp.module.css';

export default function Singup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {singup} = useAuth();
    const [error,setError] = useState('')
    const [loading ,setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Password do not match')
        }
        try{
            setError('');
            setLoading(true);
            await singup(emailRef.current.value, passwordRef.current.value)
        }catch{
            setError('Failed to create an account')
        }
    }
    return (
        <>
            <Card className={style.Card}>
                    <h2 className={style.Title}>Sing Up</h2>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Control className={style.Input} type="email" ref={emailRef} required placeholder="E-mail"/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Control className={style.Input} type="password" ref={passwordRef} required placeholder="Password"/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Control className={style.Input} type="password" ref={passwordConfirmRef} required placeholder="Confirm Password"/>
                        </Form.Group>
                        <div className={style.Wrapper}>
                            <Button disabled={loading} className={style.Button} type="submit"> Sing Up </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account?<Link to="/login"> Log In</Link> 
            </div>
        </>
    )
}
