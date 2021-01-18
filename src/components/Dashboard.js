import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {useHistory} from 'react-router-dom';

export default function Dashboard() {
    const {currentUser, logout} = useAuth();
    const history = useHistory();
    const [error,setError] = useState('');
    
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
        <div>
            <Button variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
    )
}
