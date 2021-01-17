import React, {useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {Link,useHistory} from 'react-router-dom';

export default function Dashboard() {
    const {currentUser, logout} = useAuth();
    const history = useHistory();
    const [error,setError] = useState('')
    
    async function handleLogout(){
        setError('')
        try{
            await logout()
            history.push('/login')
        }catch{
            setError('Failed to logout')
        }
    }
    return (
        <>
            <Card>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>Log Out</Button>
                </div>
            </Card>
        </>
    )
}
